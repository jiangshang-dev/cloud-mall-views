<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    :width="1080"
    :canFullscreen="true"
    :footer="null"
    destroyOnClose
  >
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="addChapter">新增正文</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="chapterActions(record)" />
      </template>
    </BasicTable>
    <BookChapterModal @register="registerChapterModal" @success="reload" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { getList, deleteOne } from '../../chapter/chapter.api';
  import BookChapterModal from '../../chapter/components/BookChapterModal.vue';

  const work = ref<any>(null);
  const title = computed(() => (work.value?.title ? `${work.value.title} · 正文` : '正文'));

  const { tableContext } = useListPage({
    designScope: 'wenyuan-category-chapter-modal',
    tableProps: {
      title: '篇章正文',
      api: getList,
      columns: [
        { title: '篇名', dataIndex: 'title' },
        { title: '卷次', dataIndex: 'volumeLabel', width: 100 },
        { title: '排序', dataIndex: 'sortNo', width: 80 },
        {
          title: '状态',
          dataIndex: 'status',
          width: 80,
          customRender: ({ text }) => (text === 1 ? '启用' : '停用'),
        },
      ],
      useSearchForm: false,
      showTableSetting: false,
      showIndexColumn: false,
      canResize: false,
      immediate: false,
      pagination: { pageSize: 10 },
      actionColumn: { width: 140, fixed: 'right' },
      defSort: { column: 'sortNo', order: 'asc' },
      beforeFetch(params) {
        params.workId = work.value?.id || '';
      },
    },
  });
  const [registerTable, { reload }] = tableContext;
  const [registerChapterModal, { openModal: openChapterModal }] = useModal();

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    work.value = data?.record || null;
    setModalProps({ confirmLoading: false });
    await reload();
  });

  function addChapter() {
    if (!work.value) return;
    openChapterModal(true, {
      isUpdate: false,
      workId: work.value.id,
      workTitle: work.value.title,
      lockWork: true,
    });
  }

  function chapterActions(record): ActionItem[] {
    return [
      {
        label: '编辑',
        onClick: () =>
          openChapterModal(true, {
            isUpdate: true,
            record,
            workTitle: work.value?.title,
            lockWork: true,
          }),
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: { title: '确认删除这篇正文？', confirm: () => deleteOne({ id: record.id }, reload) },
      },
    ];
  }
</script>
