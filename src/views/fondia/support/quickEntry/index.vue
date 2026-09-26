<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <QuickEntryModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-cs-quickEntry">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './quickEntry.data';
  import { getQuickEntryList, deleteQuickEntry } from './quickEntry.api';
  import QuickEntryModal from './components/QuickEntryModal.vue';

  const { tableContext } = useListPage({
    designScope: 'fondia-cs-quickEntry',
    tableProps: {
      title: '快捷入口管理',
      api: getQuickEntryList,
      columns,
      actionColumn: { width: 160 },
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
      {
        label: '删除',
        color: 'error',
        popConfirm: { title: '确认删除？', confirm: () => deleteQuickEntry({ id: record.id }, reload) },
      },
    ];
  }
</script>
