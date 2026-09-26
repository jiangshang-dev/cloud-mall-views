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
  </div>
</template>
<script lang="ts" setup name="fondia-comment">
  import { ref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './comment.data';
  import { getCommentList, publishComment, hideComment, deleteComment, batchDeleteComment } from './comment.api';

  const { createMessage } = useMessage();
  const selectedRowKeys = ref<Array<string | number>>([]);

  const { tableContext } = useListPage({
    designScope: 'fondia-comment',
    tableProps: {
      title: '评论审核管理',
      api: getCommentList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 220, fixed: 'right' },
    },
  });

  const [registerTable, { reload }, { rowSelection }] = tableContext;

  function getTableAction(record): ActionItem[] {
    const actions: ActionItem[] = [];
    if (record.status !== 1) {
      actions.push({
        label: '通过',
        onClick: async () => {
          await publishComment({ id: record.id });
          createMessage.success('已通过');
          reload();
        },
      });
    }
    if (record.status !== 0) {
      actions.push({
        label: '隐藏',
        color: 'warning',
        onClick: async () => {
          await hideComment({ id: record.id });
          createMessage.success('已隐藏');
          reload();
        },
      });
    }
    actions.push({
      label: '删除',
      color: 'error',
      popConfirm: {
        title: '确认删除？',
        confirm: () => deleteComment({ id: record.id }, reload),
      },
    });
    return actions;
  }

  function batchHandleDelete() {
    batchDeleteComment({ ids: selectedRowKeys.value.join(',') }, reload);
  }
</script>
