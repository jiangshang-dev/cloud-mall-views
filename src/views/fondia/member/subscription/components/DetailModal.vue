<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="会员订阅详情" :showOkBtn="false" cancelText="关闭" width="680px">
    <a-spin :spinning="loading">
      <a-descriptions bordered :column="1" size="small" v-if="detail">
        <a-descriptions-item label="用户ID">{{ formatField(detail, 'userId') }}</a-descriptions-item>
        <a-descriptions-item label="套餐编码">{{ formatField(detail, 'planCode') }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ formatField(detail, 'status') }}</a-descriptions-item>
        <a-descriptions-item label="开始时间">{{ formatField(detail, 'startTime') }}</a-descriptions-item>
        <a-descriptions-item label="到期时间">{{ formatField(detail, 'expireTime') }}</a-descriptions-item>
        <a-descriptions-item label="开通渠道">{{ formatField(detail, 'sourceChannel') }}</a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getById } from '../subscription.api';
  import { formatTime } from '../subscription.data';

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
