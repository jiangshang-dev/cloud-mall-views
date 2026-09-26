<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @fetch-success="onFetchSuccess">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAddRoot">新增菜系</a-button>
        <a-button style="margin-left: 8px" @click="expandAll">展开全部</a-button>
        <a-button style="margin-left: 8px" @click="collapseAll">折叠全部</a-button>
        <a-dropdown v-if="selectedRowKeys.length" style="margin-left: 8px">
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
    <CategoryModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" setup name="fondia-category">
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, searchFormSchema } from './category.data';
  import { getCategoryTree, deleteCategory, batchDeleteCategory } from './category.api';
  import CategoryModal from './components/CategoryModal.vue';

  const { tableContext } = useListPage({
    designScope: 'fondia-category',
    tableProps: {
      title: '菜系/分类管理',
      api: getCategoryTree,
      columns,
      isTreeTable: true,
      pagination: false,
      striped: false,
      showIndexColumn: false,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 220 },
    },
  });

  const [registerTable, { reload, expandAll, collapseAll }, { rowSelection, selectedRowKeys }] = tableContext;
  const [registerModal, { openModal }] = useModal();

  function onFetchSuccess() {
    expandAll();
  }

  function handleAddRoot() {
    openModal(true, { isUpdate: false, isRoot: true });
  }

  function handleAddSub(record) {
    openModal(true, {
      isUpdate: false,
      parentRecord: record,
    });
  }

  function getTableAction(record): ActionItem[] {
    const actions: ActionItem[] = [
      { label: '编辑', onClick: () => openModal(true, { isUpdate: true, record }) },
    ];
    if (record.categoryLevel === 1) {
      actions.push({ label: '添加下级', onClick: () => handleAddSub(record) });
    }
    actions.push({
      label: '删除',
      color: 'error',
      popConfirm: {
        title: '确认删除？',
        confirm: () => deleteCategory({ id: record.id }, reload),
      },
    });
    return actions;
  }

  function batchHandleDelete() {
    batchDeleteCategory({ ids: selectedRowKeys.value.join(',') }, reload);
  }
</script>
