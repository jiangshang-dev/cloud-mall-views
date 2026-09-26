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
    <BannerModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-banner">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './banner.data';
  import { getBannerList, deleteBanner } from './banner.api';
  import BannerModal from './components/BannerModal.vue';

  const { tableContext } = useListPage({
    designScope: 'fondia-banner',
    tableProps: {
      title: '首页轮播图管理',
      api: getBannerList,
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
          confirm: () => deleteBanner({ id: record.id }, reload),
        },
      },
    ];
  }
</script>
