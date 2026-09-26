<template>
  <div class="workbench-page">
    <a-card
      title="待接入/进行中会话"
      class="session-panel"
      :body-style="{ padding: 0, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }"
    >
      <div class="session-list">
        <a-list :data-source="sessions" :loading="loading">
          <template #renderItem="{ item }">
            <a-list-item
              class="cursor-pointer px-4"
              :class="{ 'session-active': current?.id === item.id }"
              @click="selectSession(item)"
            >
              <a-list-item-meta>
                <template #title>
                  用户 {{ item.userId }}
                  <a-tag class="ml-2" :color="statusColor(item.status)">{{ item.status }}</a-tag>
                </template>
                <template #description>{{ item.lastMessage || '暂无消息' }}</template>
              </a-list-item-meta>
              <template #actions>
                <a v-if="item.status === 'WAITING'" @click.stop="handleAccept(item)">接入</a>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-card>

    <a-card
      title="聊天窗口"
      class="chat-panel"
      :body-style="{ padding: '12px 16px', flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }"
    >
      <div v-if="!current" class="chat-empty">请选择左侧会话</div>
      <template v-else>
        <div class="chat-status">
          <span :class="wsReady ? 'status-online' : 'status-pending'">
            {{ wsReady ? '实时连接已就绪' : '实时连接建立中，消息将通过接口发送' }}
          </span>
        </div>

        <div ref="chatBox" class="chat-messages">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="chat-item"
            :class="msg.senderType === 'USER' ? 'chat-item-agent' : 'chat-item-user'"
          >
            <a-tag class="chat-tag" :color="msg.senderType === 'USER' ? 'blue' : 'green'">
              {{ msg.senderType }}
            </a-tag>
            <div class="chat-bubble">{{ msg.content }}</div>
          </div>
        </div>

        <div class="chat-input-bar">
          <a-input
            v-model:value="inputText"
            placeholder="输入回复..."
            @press-enter="sendMessage"
          />
          <a-button type="primary" :loading="sending" @click="sendMessage">发送</a-button>
          <a-button danger @click="handleClose">结束会话</a-button>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup name="fondia-cs-workbench">
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getSessionList, acceptSession, closeSession, getSessionMessages, sendSessionMessage } from './workbench.api';

  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const globSetting = useGlobSetting();
  const sessions = ref<any[]>([]);
  const messages = ref<any[]>([]);
  const current = ref<any>(null);
  const inputText = ref('');
  const loading = ref(false);
  const sending = ref(false);
  const wsReady = ref(false);
  const chatBox = ref<HTMLElement>();
  let ws: WebSocket | null = null;
  let pollTimer: number | null = null;
  let msgPollTimer: number | null = null;

  function statusColor(status: string) {
    const map = { WAITING: 'orange', CHATTING: 'green', AI: 'blue', CLOSED: 'default' };
    return map[status] || 'default';
  }

  function buildWsUrl(agentId: string) {
    const token = userStore.getToken;
    const base = (globSetting.domainUrl || 'http://localhost:9999')
      .replace('https://', 'wss://')
      .replace('http://', 'ws://');
    return `${base}/ws/cs/agent/${agentId}?token=${token}`;
  }

  async function loadSessions() {
    loading.value = true;
    try {
      const res = await getSessionList({ pageNo: 1, pageSize: 50 });
      sessions.value = (res?.records || []).filter((s) => s.status !== 'CLOSED' && s.status !== 'AI');
    } finally {
      loading.value = false;
    }
  }

  async function selectSession(item) {
    current.value = item;
    await loadMessages();
    startMessagePoll();
  }

  async function loadMessages() {
    if (!current.value) return;
    messages.value = await getSessionMessages({
      sessionId: String(current.value.id),
      pageNo: 1,
      pageSize: 200,
    });
    await nextTick();
    scrollToBottom();
  }

  function scrollToBottom() {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  }

  function startMessagePoll() {
    if (msgPollTimer) clearInterval(msgPollTimer);
    msgPollTimer = window.setInterval(() => {
      if (current.value) loadMessages();
    }, 3000);
  }

  async function handleAccept(item) {
    const agentId = String(userStore.getUserInfo?.id ?? '');
    await acceptSession({ id: String(item.id), agentId });
    createMessage.success('已接入');
    await loadSessions();
    current.value = { ...item, status: 'CHATTING', agentId };
    connectWs(agentId);
    await loadMessages();
    startMessagePoll();
  }

  function connectWs(agentId: string) {
    if (!agentId) return;
    ws?.close();
    wsReady.value = false;
    try {
      ws = new WebSocket(buildWsUrl(agentId));
      ws.onopen = () => {
        wsReady.value = true;
      };
      ws.onclose = () => {
        wsReady.value = false;
      };
      ws.onerror = () => {
        wsReady.value = false;
      };
      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data.cmd === 'CHAT_PUSH' || data.cmd === 'SESSION_NOTIFY') {
            if (current.value && String(data.sessionId) === String(current.value.id)) {
              loadMessages();
            }
            loadSessions();
          }
        } catch (_) {}
      };
    } catch (_) {
      wsReady.value = false;
    }
  }

  async function sendMessage() {
    const text = inputText.value.trim();
    if (!text || !current.value || sending.value) return;
    sending.value = true;
    try {
      await sendSessionMessage(String(current.value.id), text);
      inputText.value = '';
      await loadMessages();
      await loadSessions();
    } catch (e: any) {
      createMessage.error(e?.message || '发送失败');
    } finally {
      sending.value = false;
    }
  }

  async function handleClose() {
    if (!current.value) return;
    await closeSession({ id: String(current.value.id) });
    createMessage.success('会话已关闭');
    current.value = null;
    messages.value = [];
    if (msgPollTimer) clearInterval(msgPollTimer);
    await loadSessions();
  }

  onMounted(() => {
    loadSessions();
    pollTimer = window.setInterval(loadSessions, 10000);
    const agentId = String(userStore.getUserInfo?.id ?? '');
    if (agentId) connectWs(agentId);
  });

  onUnmounted(() => {
    ws?.close();
    if (pollTimer) clearInterval(pollTimer);
    if (msgPollTimer) clearInterval(msgPollTimer);
  });
</script>

<style scoped lang="less">
  .workbench-page {
    display: flex;
    gap: 16px;
    height: calc(100vh - 120px);
    min-height: 520px;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .session-panel,
  .chat-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;

    :deep(.ant-card-head) {
      flex-shrink: 0;
    }

    :deep(.ant-card-body) {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
  }

  .session-panel {
    width: 33.333%;
    min-width: 280px;
    max-width: 420px;
  }

  .chat-panel {
    flex: 1;
    min-width: 0;
  }

  .session-list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  .session-active {
    background: #e6f4ff;
  }

  .chat-empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  .chat-status {
    flex-shrink: 0;
    margin-bottom: 8px;
    font-size: 12px;

    .status-online {
      color: #52c41a;
    }

    .status-pending {
      color: #fa8c16;
    }
  }

  .chat-messages {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 8px;
  }

  .chat-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    max-width: 75%;
  }

  .chat-item-user {
    margin-left: auto;
    align-items: flex-end;
  }

  .chat-item-agent {
    margin-right: auto;
    align-items: flex-start;
  }

  .chat-tag {
    margin-bottom: 4px;
  }

  .chat-bubble {
    padding: 8px 12px;
    background: #fff;
    border-radius: 8px;
    line-height: 1.6;
    word-break: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  /* chat-item-agent=左，chat-item-user=右（USER 左 / AGENT 右） */
  .chat-item-user .chat-bubble {
    background: #e6f4ff;
  }

  .chat-item-agent .chat-bubble {
    background: #fff;
  }

  .chat-input-bar {
    flex-shrink: 0;
    display: flex;
    gap: 8px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
  }
</style>
