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
    <RecipeModal @register="registerModal" @success="reload" />
    <RecipeDetailModal @register="registerDetailModal" />
  </div>
</template>
<script lang="ts" setup name="fondia-recipe">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './recipe.data';
  import { getRecipeList, deleteRecipe, updateRecipeStatus } from './recipe.api';
  import RecipeModal from './components/RecipeModal.vue';
  import RecipeDetailModal from './components/RecipeDetailModal.vue';

  const { createMessage } = useMessage();

  const { tableContext } = useListPage({
    designScope: 'fondia-recipe',
    tableProps: {
      title: '菜谱管理',
      api: getRecipeList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 260, fixed: 'right' },
    },
  });

  const [registerTable, { reload }, { rowSelection }] = tableContext;
  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

  function handleAdd() {
    openModal(true, { isUpdate: false });
  }

  function getTableAction(record): ActionItem[] {
    return [
      { label: '详情', onClick: () => openDetailModal(true, { record }) },
      { label: '编辑', onClick: () => openModal(true, { isUpdate: true, record }) },
      {
        label: record.status === 1 ? '下架' : '上架',
        popConfirm: {
          title: `确认${record.status === 1 ? '下架' : '上架'}？`,
          confirm: async () => {
            await updateRecipeStatus({ id: record.id, status: record.status === 1 ? 0 : 1 });
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
          confirm: () => deleteRecipe({ id: record.id }, reload),
        },
      },
    ];
  }
</script>
