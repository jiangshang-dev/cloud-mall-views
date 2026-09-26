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
    <PlanModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-member-plan">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './plan.data';
  import { getPlanList, deletePlan, updatePlanStatus } from './plan.api';
  import PlanModal from './components/PlanModal.vue';

  const { createMessage } = useMessage();
  const { tableContext } = useListPage({
    designScope: 'fondia-member-plan',
    tableProps: { title: '会员套餐', api: getPlanList, columns, formConfig: { schemas: searchFormSchema }, actionColumn: { width: 220 } },
  });
  const [registerTable, { reload }] = tableContext;
  const [registerModal, { openModal }] = useModal();
  function handleAdd() { openModal(true, { isUpdate: false }); }
  function getTableAction(record): ActionItem[] {
    return [
      { label: '编辑', onClick: () => openModal(true, { isUpdate: true, record }) },
      { label: record.status === 1 ? '下架' : '上架', popConfirm: { title: '确认操作？', confirm: async () => { await updatePlanStatus({ id: record.id, status: record.status === 1 ? 0 : 1 }); createMessage.success('操作成功'); reload(); } } },
      { label: '删除', color: 'error', popConfirm: { title: '确认删除？', confirm: () => deletePlan({ id: record.id }, reload) } },
    ];
  }
</script>
