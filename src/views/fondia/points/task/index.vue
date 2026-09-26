<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle><a-button type="primary" @click="() => openModal(true, { isUpdate: false })">新增</a-button></template>
      <template #action="{ record }"><TableAction :actions="getTableAction(record)" /></template>
    </BasicTable>
    <TaskModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-points-task">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './task.data';
  import { getTaskList, deleteTask, updateTaskStatus } from './task.api';
  import TaskModal from './components/TaskModal.vue';
  const { createMessage } = useMessage();
  const { tableContext } = useListPage({ designScope: 'fondia-points-task', tableProps: { title: '积分任务', api: getTaskList, columns, formConfig: { schemas: searchFormSchema }, actionColumn: { width: 220 } } });
  const [registerTable, { reload }] = tableContext;
  const [registerModal, { openModal }] = useModal();
  function getTableAction(record): ActionItem[] {
    return [
      { label: '编辑', onClick: () => openModal(true, { isUpdate: true, record }) },
      { label: record.status === 1 ? '禁用' : '启用', popConfirm: { title: '确认？', confirm: async () => { await updateTaskStatus({ id: record.id, status: record.status === 1 ? 0 : 1 }); createMessage.success('成功'); reload(); } } },
      { label: '删除', color: 'error', popConfirm: { title: '确认删除？', confirm: () => deleteTask({ id: record.id }, reload) } },
    ];
  }
</script>
