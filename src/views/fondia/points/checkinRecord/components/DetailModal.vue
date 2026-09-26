<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="签到记录详情" :showOkBtn="false" cancelText="关闭" width="680px">
    <a-spin :spinning="loading">
      <a-descriptions bordered :column="1" size="small" v-if="detail">
        <a-descriptions-item label="用户ID">{{ formatField(detail, 'userId') }}</a-descriptions-item>
        <a-descriptions-item label="签到日期">{{ formatField(detail, 'checkinDate') }}</a-descriptions-item>
        <a-descriptions-item label="连续天数">{{ formatField(detail, 'streakDays') }}</a-descriptions-item>
        <a-descriptions-item label="周期第几天">{{ formatField(detail, 'cycleDayIndex') }}</a-descriptions-item>
        <a-descriptions-item label="奖励积分">{{ formatField(detail, 'rewardPoints') }}</a-descriptions-item>
        <a-descriptions-item label="奖励成长">{{ formatField(detail, 'rewardGrowth') }}</a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getById } from '../checkinRecord.api';
  import { formatTime } from '../checkinRecord.data';

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
