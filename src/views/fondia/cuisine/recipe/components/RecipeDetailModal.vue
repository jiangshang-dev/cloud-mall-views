<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="菜谱详情"
    defaultFullscreen
    :canFullscreen="false"
    :showOkBtn="false"
    cancelText="关闭"
    wrapClassName="recipe-detail-modal"
  >
    <a-spin :spinning="loading">
      <div v-if="detail" class="recipe-detail">
        <div class="detail-left">
          <VideoPlayer
            v-if="playUrl"
            :video-src="playUrl"
            :poster="detail.coverImage"
            :video-title="detail.title"
            :video-description="detail.description"
            :view-count="detail.viewCount"
          />
          <div v-else class="cover-fallback">
            <img v-if="detail.coverImage" :src="getFileAccessHttpUrl(detail.coverImage)" alt="封面" />
            <div v-else class="cover-empty">暂无视频</div>
          </div>
        </div>

        <div class="detail-right">
          <div class="detail-header">
            <h2>{{ detail.title }}</h2>
            <p v-if="detail.subtitle" class="subtitle">{{ detail.subtitle }}</p>
            <div class="tag-row">
              <a-tag v-if="detail.cuisineName" color="orange">{{ detail.cuisineName }}</a-tag>
              <a-tag v-if="detail.categoryName">{{ detail.categoryName }}</a-tag>
              <a-tag v-for="tag in detail.tags || []" :key="tag">{{ tag }}</a-tag>
            </div>
          </div>

          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-value">{{ detail.cookMinutes || '--' }} 分钟</div>
              <div class="stat-label">烹饪时间</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ difficultyText(detail.difficulty) }}</div>
              <div class="stat-label">难度</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ detail.calories || '--' }} 大卡</div>
              <div class="stat-label">每100克</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ detail.servingSize || '--' }}</div>
              <div class="stat-label">份量</div>
            </div>
          </div>

          <div v-if="detail.description" class="detail-block">
            <div class="block-title">描述</div>
            <div class="block-content">{{ detail.description }}</div>
          </div>

          <div class="detail-block">
            <div class="block-title">食材准备</div>
            <div class="ingredient-grid">
              <div v-for="(item, index) in detail.ingredients || []" :key="index" class="ingredient-card">
                <div class="ingredient-name">{{ item.name }}</div>
                <div class="ingredient-amount">{{ item.amount }}</div>
              </div>
            </div>
          </div>

          <div class="detail-block">
            <div class="block-title">图文步骤</div>
            <div class="step-list">
              <div v-for="(item, index) in detail.steps || []" :key="index" class="step-card">
                <div class="step-no">{{ index + 1 }}</div>
                <div class="step-content">
                  <img
                    v-if="item.image"
                    class="step-image"
                    :src="getFileAccessHttpUrl(item.image)"
                    alt="步骤图"
                  />
                  <div class="step-text">{{ item.content }}</div>
                  <div v-if="item.tip" class="step-tip">{{ item.tip }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { VideoPlayer } from '/@/components/Vod';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import { getPlayInfo } from '/@/views/system/vod/vod.api';
  import { getRecipeById } from '../recipe.api';
  import { difficultyText, isHttpUrl } from '../recipe.types';

  const loading = ref(false);
  const detail = ref<any>(null);
  const playUrl = ref('');

  async function resolvePlayUrl(videoUrl?: string) {
    if (!videoUrl) {
      playUrl.value = '';
      return;
    }
    if (isHttpUrl(videoUrl)) {
      playUrl.value = videoUrl;
      return;
    }
    try {
      const res = await getPlayInfo(videoUrl);
      if (res?.success !== false) {
        playUrl.value = res?.result?.playUrl || res?.playUrl || '';
      }
    } catch {
      playUrl.value = '';
    }
  }

  const [registerModal] = useModalInner(async (data) => {
    loading.value = true;
    detail.value = null;
    playUrl.value = '';
    try {
      if (data?.record?.id) {
        detail.value = await getRecipeById({ id: data.record.id });
        await resolvePlayUrl(detail.value?.videoUrl);
      }
    } finally {
      loading.value = false;
    }
  });
</script>

<style lang="less">
  .recipe-detail-modal {
    .ant-modal-body {
      padding: 16px 20px 24px;
      background: #f5f6f8;
    }
  }
</style>

<style scoped lang="less">
  .recipe-detail {
    display: grid;
    grid-template-columns: minmax(420px, 520px) 1fr;
    gap: 16px;
    min-height: calc(100vh - 180px);
  }

  .detail-left,
  .detail-right {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #f0f0f0;
    padding: 16px;
  }

  .detail-left {
    position: sticky;
    top: 0;
    align-self: start;
  }

  .cover-fallback img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  .cover-empty {
    height: 280px;
    border-radius: 12px;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  .detail-header h2 {
    margin: 0;
    font-size: 28px;
    color: #222;
  }

  .subtitle {
    margin: 8px 0 0;
    color: #666;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 20px 0;
  }

  .stat-card {
    padding: 14px;
    border-radius: 12px;
    background: #fff7f0;
    text-align: center;
  }

  .stat-value {
    font-size: 18px;
    font-weight: 600;
    color: #ff7f32;
  }

  .stat-label {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
  }

  .detail-block + .detail-block {
    margin-top: 24px;
  }

  .block-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .block-content {
    color: #666;
    line-height: 1.7;
  }

  .ingredient-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .ingredient-card {
    padding: 12px 14px;
    border-radius: 10px;
    background: #fafafa;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .ingredient-name {
    font-weight: 600;
  }

  .ingredient-amount {
    color: #888;
  }

  .step-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-card {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 12px;
  }

  .step-no {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffb347, #ff7f32);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  .step-image {
    width: 100%;
    max-width: 360px;
    border-radius: 10px;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .step-text {
    color: #333;
    line-height: 1.7;
  }

  .step-tip {
    margin-top: 6px;
    font-size: 13px;
    color: #999;
  }
</style>
