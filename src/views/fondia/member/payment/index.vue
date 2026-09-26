<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup name="fondia-payment">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './payment.data';
  import { getList } from './payment.api';
  import DetailModal from './components/DetailModal.vue';

  const { tableContext } = useListPage({
    designScope: 'fondia-payment',
    tableProps: { title: '支付流水', api: getList, columns, formConfig: { schemas: searchFormSchema }, actionColumn: { width: 100 } },
  });
  const [registerTable] = tableContext;
  const [registerModal, { openModal }] = useModal();
  function getTableAction(record): ActionItem[] {
    return [{ label: '详情', onClick: () => openModal(true, { record }) }];
  }
</script>
