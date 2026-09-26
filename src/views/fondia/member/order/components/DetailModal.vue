<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="会员订单详情" :showOkBtn="false" cancelText="关闭" width="680px">
    <a-spin :spinning="loading">
      <a-descriptions bordered :column="1" size="small" v-if="detail">
        <a-descriptions-item label="订单号">{{ formatField(detail, 'orderNo') }}</a-descriptions-item>
        <a-descriptions-item label="用户ID">{{ formatField(detail, 'userId') }}</a-descriptions-item>
        <a-descriptions-item label="套餐">{{ formatField(detail, 'planName') }}</a-descriptions-item>
        <a-descriptions-item label="金额">{{ formatField(detail, 'amount') }}</a-descriptions-item>
        <a-descriptions-item label="支付渠道">{{ formatField(detail, 'payChannel') }}</a-descriptions-item>
        <a-descriptions-item label="支付状态">{{ formatField(detail, 'payStatus') }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ formatField(detail, 'createTime') }}</a-descriptions-item>
        <a-descriptions-item label="支付时间">{{ formatField(detail, 'paidTime') }}</a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getById } from '../order.api';
  import { formatTime } from '../order.data';

  const detail = ref<any>(null);
  const loading = ref(false);

  function formatField(record, key) {
    const val = record?.[key];
    if (key.endsWith('Time') && val) return formatTime(val);
    if (key === 'payStatus') return ['待支付','已支付','失败','已关闭','已退款'][val] ?? val;
    if (key === 'orderStatus') return ['待处理','已发货','已完成','已取消'][val] ?? val;
    if (key === 'status') return val === 1 ? '生效中' : val;
    return val ?? '-';
  }

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    detail.value = null;
    loading.value = true;
    try { detail.value = await getById({ id: data.record.id }); } finally { loading.value = false; }
  });
</script>
