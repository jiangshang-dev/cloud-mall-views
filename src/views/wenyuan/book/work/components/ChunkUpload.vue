<template>
  <div class="chunk-upload">
    <a-button :loading="uploading" @click="pick">{{ buttonText }}</a-button>
    <input ref="inputRef" type="file" :accept="accept" hidden @change="onPick" />
    <img v-if="preview" :src="preview" alt="" class="chunk-preview" />
    <span v-else-if="value" class="chunk-name">{{ fileLabel }}</span>
    <a-button v-if="value && !uploading" type="link" @click="clear">清除</a-button>
    <a-progress v-if="uploading" :percent="percent" size="small" />
    <p v-if="hint" class="chunk-hint">{{ hint }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getToken, getTenantId } from '/@/utils/auth';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';

  const props = defineProps({
    value: { type: String, default: '' },
    accept: { type: String, default: '' },
    biz: { type: String, default: 'book' },
    buttonText: { type: String, default: '上传' },
  });
  const emit = defineEmits(['update:value', 'change']);

  const inputRef = ref<HTMLInputElement>();
  const uploading = ref(false);
  const percent = ref(0);
  const hint = ref('');
  const glob = useGlobSetting();
  let ownChange = false;

  watch(
    () => props.value,
    () => {
      if (ownChange) {
        ownChange = false;
        return;
      }
      hint.value = '';
      percent.value = 0;
    },
  );

  const fileLabel = computed(() => {
    const raw = props.value || '';
    const name = raw.split('/').pop() || raw;
    return name.replace(/^oss:/, '');
  });
  const preview = computed(() => {
    if (!props.value) return '';
    if (props.value.startsWith('oss:')) {
      const key = props.value.slice(4);
      if (!/\.(png|jpe?g|gif|webp)$/i.test(key)) return '';
      return `${glob.apiUrl}/portal/file?path=${encodeURIComponent(key)}`;
    }
    if (/\.(png|jpe?g|gif|webp)$/i.test(props.value) || props.biz === 'cover') {
      return getFileAccessHttpUrl(props.value);
    }
    return '';
  });

  function pick() {
    inputRef.value?.click();
  }

  function clear() {
    ownChange = true;
    emit('update:value', '');
    emit('change', '');
    hint.value = '';
    percent.value = 0;
  }

  function sessionKey(file: File) {
    return `wenyuan-oss:${props.biz}:${file.name}:${file.size}:${file.lastModified}`;
  }

  function etagOf(part) {
    return part?.eTag || part?.ETag || part?.etag || '';
  }

  async function onPick(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    (event.target as HTMLInputElement).value = '';
    if (!file) return;
    uploading.value = true;
    percent.value = 0;
    hint.value = '正在准备分块';
    try {
      const url = await send(file);
      ownChange = true;
      emit('update:value', url);
      emit('change', url);
      hint.value = '上传完成';
      percent.value = 100;
    } catch (error) {
      hint.value = error?.message || '上传中断，再次选择同一文件可以续传';
    } finally {
      uploading.value = false;
    }
  }

  async function send(file: File) {
    const key = sessionKey(file);
    let task = readTask(key);
    let done = [];
    if (task) {
      try {
        done = await defHttp.get({ url: '/oss/multipart/parts', params: { objectKey: task.objectKey, uploadId: task.uploadId } }, { errorMessageMode: 'none' });
        hint.value = `已有 ${done.length} 块，继续上传`;
      } catch (error) {
        task = null;
        sessionStorage.removeItem(key);
      }
    }
    if (!task) {
      task = await defHttp.post(
        {
          url: '/oss/multipart/init',
          timeout: 60000,
          data: { fileName: file.name, fileSize: file.size, contentType: file.type, biz: props.biz },
        },
        { errorMessageMode: 'none' },
      );
      sessionStorage.setItem(key, JSON.stringify(task));
      done = [];
    }
    const finished = new Map((done || []).map((part) => [part.partNumber, etagOf(part)]));
    const parts = [];
    for (let number = 1; number <= task.partCount; number += 1) {
      const start = (number - 1) * task.partSize;
      const blob = file.slice(start, Math.min(file.size, start + task.partSize));
      let eTag = finished.get(number);
      if (!eTag) {
        hint.value = `正在上传 ${number} / ${task.partCount}`;
        eTag = await putPart(task, number, blob);
      }
      parts.push({ partNumber: number, eTag });
      percent.value = Math.round((number / task.partCount) * 100);
    }
    const info = await defHttp.post(
      { url: '/oss/multipart/complete', timeout: 120000, data: { objectKey: task.objectKey, uploadId: task.uploadId, parts } },
      { errorMessageMode: 'none' },
    );
    sessionStorage.removeItem(key);
    return info.url;
  }

  function readTask(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || '');
    } catch (error) {
      return null;
    }
  }

  function putPart(task, partNumber: number, blob: Blob) {
    const query = `objectKey=${encodeURIComponent(task.objectKey)}&uploadId=${encodeURIComponent(task.uploadId)}&partNumber=${partNumber}`;
    return fetch(`${glob.apiUrl}/oss/multipart/part?${query}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Access-Token': getToken() || '',
        'X-Tenant-Id': String(getTenantId() || 0),
      },
      body: blob,
    }).then(async (response) => {
      const json = await response.json();
      if (!json.success) throw new Error(json.message || '分块上传失败');
      return etagOf(json.result);
    });
  }
</script>

<style scoped>
  .chunk-upload { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .chunk-preview { width: 72px; height: 96px; object-fit: cover; border-radius: 4px; }
  .chunk-name, .chunk-hint { color: #666; }
  .chunk-hint { width: 100%; margin: 0; }
</style>
