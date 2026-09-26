<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="反馈详情" :showOkBtn="false" cancelText="关闭" width="640px">
    <a-spin :spinning="loading">
      <a-descriptions bordered :column="1" size="small" v-if="detail">
        <a-descriptions-item label="反馈ID">{{ detail.id }}</a-descriptions-item>
        <a-descriptions-item label="用户">{{ detail.userNickname || '-' }}（ID: {{ detail.userId }}）</a-descriptions-item>
        <a-descriptions-item label="手机号">{{ detail.userPhone || '-' }}</a-descriptions-item>
        <a-descriptions-item label="反馈类型">{{ detail.feedbackType }}</a-descriptions-item>
        <a-descriptions-item label="状态">
          <a-tag :color="detail.status === 1 ? 'success' : 'warning'">{{ detail.status === 1 ? '已处理' : '待处理' }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="联系方式">{{ detail.contact || '-' }}</a-descriptions-item>
        <a-descriptions-item label="提交时间">{{ formatTime(detail.createTime) }}</a-descriptions-item>
        <a-descriptions-item label="反馈内容">
          <div style="white-space: pre-wrap; line-height: 1.6">{{ detail.content }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="截图" v-if="detail.images?.length">
          <a-space wrap>
            <a-image
              v-for="(img, idx) in detail.images"
              :key="idx"
              :src="resolveImage(img)"
              :width="96"
              :height="96"
              style="object-fit: cover; border-radius: 6px"
            />
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getFeedbackById } from '../feedback.api';
  import { formatTime } from '../feedback.data';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';

  const detail = ref<any>(null);
  const loading = ref(false);

  function resolveImage(url: string) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return getFileAccessHttpUrl(url);
  }

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    detail.value = null;
    loading.value = true;
    setModalProps({ confirmLoading: false });
    try {
      detail.value = await getFeedbackById({ id: data.record.id });
    } finally {
      loading.value = false;
    }
  });
</script>
