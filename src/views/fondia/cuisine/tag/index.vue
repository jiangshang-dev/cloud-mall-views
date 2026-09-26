<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <TagModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-tag">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './tag.data';
  import { getTagList, deleteTag } from './tag.api';
  import TagModal from './components/TagModal.vue';

  const { tableContext } = useListPage({
    designScope: 'fondia-tag',
    tableProps: {
      title: '菜谱标签管理',
      api: getTagList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 160 },
    },
  });

  const [registerTable, { reload }, { rowSelection }] = tableContext;
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
        popConfirm: {
          title: '确认删除？',
          confirm: () => deleteTag({ id: record.id }, reload),
        },
      },
    ];
  }
</script>
