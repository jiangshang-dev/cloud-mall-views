<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <BookHotKeywordModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="wenyuan-keyword">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './keyword.data';
  import { getList, deleteOne } from './keyword.api';
  import BookHotKeywordModal from './components/BookHotKeywordModal.vue';

  const { tableContext } = useListPage({
    designScope: 'wenyuan-keyword',
    tableProps: {
      title: '热门搜索',
      api: getList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 160, fixed: 'right' },
      defSort: { column: 'createTime', order: 'desc' },
    },
  });
  const [registerTable, { reload }] = tableContext;
  const [registerModal, { openModal }] = useModal();
  function handleAdd() {
    openModal(true, { isUpdate: false });
  }

  function getTableAction(record): ActionItem[] {
    return [
      { label: '编辑', onClick: () => openModal(true, { isUpdate: true, record }) },
      { label: '删除', color: 'error', popConfirm: { title: '确认删除？', confirm: () => deleteOne({ id: record.id }, reload) } },
    ];
  }
</script>
