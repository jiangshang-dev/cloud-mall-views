<template>
  <div class="category-layout">
    <a-card class="tree-pane" :bordered="false" title="分类">
      <div class="tree-tip">右键节点可新增、详情、修改、删除</div>
      <a-spin :spinning="loading">
        <div class="tree-body">
          <a-tree
            v-if="treeData.length"
            block-node
            show-line
            :tree-data="treeData"
            :selected-keys="selectedKeys"
            v-model:expanded-keys="expandedKeys"
            @select="onSelect"
          >
            <template #title="{ key: nodeKey, title }">
              <a-dropdown :trigger="['contextmenu']">
                <span class="tree-title">{{ title }}</span>
                <template #overlay>
                  <a-menu @click="({ key }) => onMenu(key, nodeKey)">
                    <a-menu-item key="add">新增</a-menu-item>
                    <a-menu-item v-if="nodeKey !== rootKey" key="detail">详情</a-menu-item>
                    <a-menu-item v-if="nodeKey !== rootKey" key="edit">修改</a-menu-item>
                    <a-menu-item v-if="nodeKey !== rootKey" key="delete">
                      <span class="danger">删除</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-tree>
          <a-empty v-else description="还没有分类" />
        </div>
      </a-spin>
    </a-card>

    <CategoryWorkspace :category="current" />
    <BookCategoryModal @register="registerModal" @success="loadTree" />
    <a-drawer v-model:open="detailOpen" title="分类详情" width="440" placement="right">
      <a-descriptions v-if="current" bordered :column="1" size="middle">
        <a-descriptions-item label="上级分类">{{ parentLabel(current) }}</a-descriptions-item>
        <a-descriptions-item label="分类名称">{{ showText(current.name) }}</a-descriptions-item>
        <a-descriptions-item label="副标题">{{ showText(current.subtitle) }}</a-descriptions-item>
        <a-descriptions-item label="分类编码">{{ showText(current.code) }}</a-descriptions-item>
        <a-descriptions-item label="图标编码">{{ iconText(current.iconCode) }}</a-descriptions-item>
        <a-descriptions-item label="跳转路径">{{ showText(current.linkPath) }}</a-descriptions-item>
        <a-descriptions-item label="首页展示">{{ current.showOnHome === 1 ? '是' : '否' }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{ current.sortNo ?? 0 }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ current.status === 1 ? '启用' : '停用' }}</a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup name="wenyuan-category">
  import { computed, onMounted, ref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { iconOptions } from './category.data';
  import { deleteOne, listAll } from './category.api';
  import BookCategoryModal from './components/BookCategoryModal.vue';
  import CategoryWorkspace from './components/CategoryWorkspace.vue';

  const rootKey = 'root';
  const detailOpen = ref(false);
  const loading = ref(false);
  const records = ref<any[]>([]);
  const treeData = ref<any[]>([]);
  const selectedKeys = ref<string[]>([rootKey]);
  const expandedKeys = ref<string[]>([rootKey]);
  const loadedOnce = ref(false);
  const { createConfirm, createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();

  const recordMap = computed(() => {
    const map: Record<string, any> = {};
    records.value.forEach((item) => {
      map[item.id] = item;
    });
    return map;
  });

  const current = computed(() => {
    const key = selectedKeys.value[0];
    if (!key || key === rootKey) return null;
    return recordMap.value[key] || null;
  });

  function showText(value) {
    return value === 0 || value ? value : '—';
  }

  function iconText(code) {
    if (!code) return '—';
    const found = iconOptions.find((item) => item.value === code);
    return found ? `${found.label}（${code}）` : code;
  }

  function parentLabel(record) {
    if (!record?.parentId || !recordMap.value[record.parentId]) return '顶级分类';
    return recordMap.value[record.parentId].name;
  }

  function buildNodes(list) {
    const map: Record<string, any> = {};
    list.forEach((item) => {
      map[item.id] = { key: item.id, title: item.name, children: [] };
    });
    const roots: any[] = [];
    list.forEach((item) => {
      const node = map[item.id];
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(node);
      } else {
        roots.push(node);
      }
    });
    return roots;
  }

  function applyTree(list) {
    records.value = list;
    treeData.value = [{ key: rootKey, title: '全部分类', children: buildNodes(list) }];
    if (!loadedOnce.value) {
      expandedKeys.value = [rootKey, ...list.map((item) => item.id)];
      selectedKeys.value = [rootKey];
      loadedOnce.value = true;
      return;
    }
    const selected = selectedKeys.value[0];
    if (selected !== rootKey && !recordMap.value[selected]) {
      selectedKeys.value = [rootKey];
    }
  }

  async function loadTree() {
    loading.value = true;
    try {
      const list = await listAll();
      applyTree(Array.isArray(list) ? list : []);
    } finally {
      loading.value = false;
    }
  }

  function onSelect(keys: string[]) {
    if (keys?.length) {
      selectedKeys.value = keys;
    }
  }

  function onMenu(action, nodeKey) {
    selectedKeys.value = [nodeKey];
    if (!expandedKeys.value.includes(nodeKey)) {
      expandedKeys.value = [...expandedKeys.value, nodeKey];
    }
    if (action === 'add') {
      const parent = nodeKey === rootKey ? null : recordMap.value[nodeKey];
      openModal(true, {
        isUpdate: false,
        parentId: parent?.id,
        parentName: parent?.name || '顶级分类',
      });
      return;
    }
    const record = recordMap.value[nodeKey];
    if (!record) return;
    if (action === 'detail') {
      detailOpen.value = true;
      return;
    }
    if (action === 'edit') {
      openModal(true, {
        isUpdate: true,
        record,
        parentId: record.parentId,
        parentName: parentLabel(record),
      });
      return;
    }
    if (records.value.some((item) => item.parentId === record.id)) {
      createMessage.warning(`「${record.name}」下还有下级分类，请先删除下级`);
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '删除分类',
      content: `确认删除「${record.name}」？`,
      onOk: () => deleteOne({ id: record.id }, loadTree),
    });
  }

  onMounted(loadTree);
</script>

<style scoped>
  .category-layout {
    display: flex;
    gap: 12px;
    padding: 12px;
    align-items: stretch;
    min-height: calc(100vh - 120px);
  }

  .tree-pane {
    width: 300px;
    flex: none;
  }

  .tree-tip {
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }

  .tree-body {
    max-height: calc(100vh - 230px);
    overflow: auto;
  }

  .tree-title {
    display: inline-block;
    min-width: 100%;
  }

  .danger {
    color: #ff4d4f;
  }
</style>
