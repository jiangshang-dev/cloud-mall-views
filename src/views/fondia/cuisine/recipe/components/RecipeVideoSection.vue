<template>
  <div class="recipe-video-section">
    <div v-if="playUrl" class="video-preview">
      <VideoPlayer :video-src="playUrl" :video-title="title || '菜谱视频'" compact :show-meta="false" />
      <div class="video-meta">
        <a-tag color="orange">已上传</a-tag>
        <span class="video-id">视频 ID：{{ videoId }}</span>
        <a-button type="link" danger @click="handleRemove">移除视频</a-button>
      </div>
      <a-alert
        v-if="videoId && !playUrl"
        type="info"
        show-icon
        message="视频已上传，转码完成后可预览播放"
        class="video-alert"
      />
    </div>

    <div v-else class="video-upload-wrap">
      <VodUploadPanel :default-title="title" @success="handleUploaded" />
      <p class="video-tip">上传完成后将自动预览，视频 ID 会保存到菜谱中</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { VodUploadPanel, VideoPlayer } from '/@/components/Vod';
  import { getPlayInfo } from '/@/views/system/vod/vod.api';
  import { isHttpUrl } from '../recipe.types';

  const props = defineProps<{
    videoUrl?: string;
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:videoUrl', value: string): void;
  }>();

  const playUrl = ref('');
  const videoId = ref('');

  async function resolvePlayUrl(value?: string) {
    if (!value) {
      playUrl.value = '';
      videoId.value = '';
      return;
    }
    if (isHttpUrl(value)) {
      playUrl.value = value;
      videoId.value = '';
      return;
    }
    videoId.value = value;
    try {
      const res = await getPlayInfo(value);
      if (res?.success !== false) {
        playUrl.value = res?.result?.playUrl || res?.playUrl || '';
      }
    } catch {
      playUrl.value = '';
    }
  }

  async function handleUploaded(payload: { videoId: string }) {
    emit('update:videoUrl', payload.videoId);
    await resolvePlayUrl(payload.videoId);
  }

  function handleRemove() {
    emit('update:videoUrl', '');
    playUrl.value = '';
    videoId.value = '';
  }

  watch(
    () => props.videoUrl,
    (value) => resolvePlayUrl(value),
    { immediate: true },
  );
</script>

<style scoped lang="less">
  .recipe-video-section {
    width: 100%;
  }

  .video-preview {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
  }

  .video-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
  }

  .video-id {
    flex: 1;
    font-size: 12px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .video-upload-wrap {
    border: 1px dashed #e8e8e8;
    border-radius: 12px;
    padding: 12px;
    background: #fcfcfc;
  }

  .video-tip {
    margin: 8px 0 0;
    font-size: 12px;
    color: #999;
  }

  .video-alert {
    margin-top: 10px;
  }
</style>
