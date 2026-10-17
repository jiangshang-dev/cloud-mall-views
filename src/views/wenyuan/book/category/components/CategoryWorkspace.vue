<template>
  <a-card class="workspace" :bordered="false" :title="panelTitle">
    <BasicTable @register="registerWork">
      <template #tableTitle>
        <a-button type="primary" @click="addWork">新增作品</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="workActions(record)" />
      </template>
    </BasicTable>
    <BookWorkModal @register="registerWorkModal" @success="reloadWork" />
    <ChapterListModal @register="registerChapterListModal" />
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getList as getWorkList, deleteOne as deleteWork } from '../../work/work.api';
  import BookWorkModal from '../../work/components/BookWorkModal.vue';
  import ChapterListModal from './ChapterListModal.vue';

  const props = defineProps({
    category: { type: Object, default: null },
  });

  const { createMessage } = useMessage();
  const [registerWorkModal, { openModal: openWorkModal }] = useModal();
  const [registerChapterListModal, { openModal: openChapterListModal }] = useModal();

  const panelTitle = computed(() => (props.category?.name ? `${props.category.name}的作品` : '全部作品'));

  const statusText = ({ text }) => (text === 1 ? '启用' : '停用');

  const { tableContext: workContext } = useListPage({
    designScope: 'wenyuan-category-work',
    tableProps: {
      title: '',
      api: getWorkList,
      columns: [
        { title: '书名', dataIndex: 'title' },
        { title: '作者', dataIndex: 'authorName', width: 100 },
        { title: '朝代', dataIndex: 'dynasty', width: 80 },
        { title: '状态', dataIndex: 'status', width: 70, customRender: statusText },
      ],
      useSearchForm: false,
      showTableSetting: false,
      showIndexColumn: false,
      canResize: false,
      pagination: { pageSize: 8 },
      actionColumn: { width: 150, fixed: 'right' },
      defSort: { column: 'sortNo', order: 'asc' },
      beforeFetch(params) {
        if (props.category?.code) {
          params.categoryCode = props.category.code;
        } else {
          delete params.categoryCode;
        }
      },
    },
  });
  const [registerWork, { reload: reloadWork }] = workContext;

  watch(
    () => props.category?.code || '',
    () => {
      reloadWork();
    },
  );

  function addWork() {
    if (props.category && !props.category.code) {
      createMessage.warning('这个分类还没有编码，请先修改分类并补上分类编码');
      return;
    }
    openWorkModal(true, {
      isUpdate: false,
      categoryCode: props.category?.code,
      lockCategory: !!props.category?.code,
    });
  }

  function workActions(record): ActionItem[] {
    return [
      { label: '正文', onClick: () => openChapterListModal(true, { record }) },
      { label: '编辑', onClick: () => openWorkModal(true, { isUpdate: true, record, lockCategory: false }) },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '确认删除这部作品？',
          confirm: () => deleteWork({ id: record.id }, reloadWork),
        },
      },
    ];
  }
</script>

<style scoped>
  .workspace {
    flex: 1;
    min-width: 0;
  }


</style>
