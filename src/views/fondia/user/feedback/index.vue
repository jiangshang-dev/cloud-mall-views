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
    <FeedbackDetailModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup name="fondia-feedback">
  import { ref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './feedback.data';
  import { getFeedbackList, deleteFeedback, batchDeleteFeedback, updateFeedbackStatus } from './feedback.api';
  import FeedbackDetailModal from './components/FeedbackDetailModal.vue';

  const { createMessage } = useMessage();
  const selectedRowKeys = ref<Array<string | number>>([]);

  const { tableContext } = useListPage({
    designScope: 'fondia-feedback',
    tableProps: {
      title: '意见反馈管理',
      api: getFeedbackList,
      columns,
      formConfig: { schemas: searchFormSchema },
      actionColumn: { width: 220 },
    },
  });

  const [registerTable, { reload }, { rowSelection }] = tableContext;
  const [registerModal, { openModal }] = useModal();

  function getTableAction(record): ActionItem[] {
    const actions: ActionItem[] = [
      { label: '详情', onClick: () => openModal(true, { record }) },
    ];
    if (record.status !== 1) {
      actions.push({
        label: '标记已处理',
        color: 'success',
        popConfirm: {
          title: '确认标记为已处理？',
          confirm: async () => {
            await updateFeedbackStatus({ id: record.id, status: 1 });
            createMessage.success('已标记为已处理');
            reload();
          },
        },
      });
    } else {
      actions.push({
        label: '设为待处理',
        color: 'warning',
        popConfirm: {
          title: '确认设为待处理？',
          confirm: async () => {
            await updateFeedbackStatus({ id: record.id, status: 0 });
            createMessage.success('已设为待处理');
            reload();
          },
        },
      });
    }
    actions.push({
      label: '删除',
      color: 'error',
      popConfirm: {
        title: '确认删除？',
        confirm: () => deleteFeedback({ id: record.id }, reload),
      },
    });
    return actions;
  }

  function batchHandleDelete() {
    batchDeleteFeedback({ ids: selectedRowKeys.value.join(',') }, reload);
  }
</script>
