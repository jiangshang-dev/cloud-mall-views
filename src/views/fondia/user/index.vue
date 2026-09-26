<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-dropdown v-if="selectedRowKeys.length">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">批量删除</a-menu-item>
            </a-menu>
          </template>
          <a-button>批量操作 <Icon icon="ant-design:down-outlined" /></a-button>
        </a-dropdown>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-user">
  import { ref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './user.data';
  import { getUserList, deleteUser, batchDeleteUser, updateUserStatus } from './user.api';
  import UserModal from './components/UserModal.vue';

  const { createMessage } = useMessage();
  const selectedRowKeys = ref<Array<string | number>>([]);

  const { tableContext } = useListPage({
    designScope: 'fondia-user',
    tableProps: {
      title: 'App用户列表',
      api: getUserList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 200, fixed: 'right' },
    },
  });

  const [registerTable, { reload }, { rowSelection }] = tableContext;
  const [registerModal, { openModal }] = useModal();

  function getTableAction(record): ActionItem[] {
    return [
      { label: '编辑', onClick: () => openModal(true, { record }) },
      {
        label: record.status === 1 ? '禁用' : '启用',
        popConfirm: {
          title: `确认${record.status === 1 ? '禁用' : '启用'}该用户？`,
          confirm: async () => {
            await updateUserStatus({ id: record.id, status: record.status === 1 ? 0 : 1 });
            createMessage.success('操作成功');
            reload();
          },
        },
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '确认删除？',
          confirm: () => deleteUser({ id: record.id }, reload),
        },
      },
    ];
  }

  function batchHandleDelete() {
    batchDeleteUser({ ids: selectedRowKeys.value.join(',') }, reload);
  }
</script>
