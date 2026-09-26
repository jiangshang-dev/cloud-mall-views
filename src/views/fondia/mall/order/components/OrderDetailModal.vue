<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="兑换订单详情" :showOkBtn="false" cancelText="关闭" width="680px">
    <a-spin :spinning="loading"><a-descriptions bordered :column="1" size="small" v-if="detail">
      <a-descriptions-item label="订单号">{{ detail.orderNo }}</a-descriptions-item>
      <a-descriptions-item label="用户ID">{{ detail.userId }}</a-descriptions-item>
      <a-descriptions-item label="商品">{{ detail.productName }}</a-descriptions-item>
      <a-descriptions-item label="消耗积分">{{ detail.pointsCost }}</a-descriptions-item>
      <a-descriptions-item label="收货人">{{ detail.receiverName || '-' }}</a-descriptions-item>
      <a-descriptions-item label="电话">{{ detail.receiverPhone || '-' }}</a-descriptions-item>
      <a-descriptions-item label="地址">{{ detail.receiverAddress || '-' }}</a-descriptions-item>
      <a-descriptions-item label="物流单号">{{ detail.logisticsNo || '-' }}</a-descriptions-item>
    </a-descriptions></a-spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'; import { BasicModal, useModalInner } from '/@/components/Modal'; import { getOrderById } from '../order.api';
  const detail = ref<any>(null); const loading = ref(false);
  const [registerModal] = useModalInner(async (data) => { detail.value = null; loading.value = true; try { detail.value = await getOrderById({ id: data.record.id }); } finally { loading.value = false; } });
</script>
