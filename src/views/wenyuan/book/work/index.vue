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
    <BookWorkModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="wenyuan-work">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './work.data';
  import { getList, deleteOne } from './work.api';
  import BookWorkModal from './components/BookWorkModal.vue';

  const { tableContext } = useListPage({
    designScope: 'wenyuan-work',
    tableProps: {
      title: '典籍作品',
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
