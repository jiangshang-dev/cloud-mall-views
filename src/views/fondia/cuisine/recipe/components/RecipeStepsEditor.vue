<template>
  <div class="steps-editor">
    <div class="section-head">
      <div>
        <div class="section-title">图文步骤</div>
        <div class="section-desc">每个步骤支持上图下文，图片可选</div>
      </div>
      <a-button type="dashed" @click="addItem">
        <Icon icon="ant-design:plus-outlined" />
        添加步骤
      </a-button>
    </div>

    <div class="step-list">
      <div v-for="(item, index) in modelValue" :key="index" class="step-item">
        <div class="step-badge">{{ index + 1 }}</div>
        <div class="step-body">
          <div class="step-image-row">
            <div v-if="item.image" class="step-image-preview">
              <img :src="getFileAccessHttpUrl(item.image)" alt="步骤图" />
              <a-button type="text" danger class="remove-image" @click="item.image = ''">移除</a-button>
            </div>
            <JUpload
              v-else
              v-model:value="item.image"
              file-type="image"
              :max-count="1"
              text="上传步骤图（可选）"
            />
          </div>
          <a-textarea v-model:value="item.content" :rows="3" placeholder="步骤说明" />
          <a-input v-model:value="item.tip" placeholder="小贴士（可选）" />
        </div>
        <a-button type="text" danger :disabled="modelValue.length <= 1" @click="removeItem(index)">
          <Icon icon="ant-design:delete-outlined" />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '/@/components/Icon';
  import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import type { RecipeStepItem } from '../recipe.types';

  const props = defineProps<{
    modelValue: RecipeStepItem[];
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: RecipeStepItem[]): void;
  }>();

  function update(list: RecipeStepItem[]) {
    emit('update:modelValue', list);
  }

  function addItem() {
    update([...props.modelValue, { content: '', tip: '' }]);
  }

  function removeItem(index: number) {
    update(props.modelValue.filter((_, i) => i !== index));
  }
</script>

<style scoped lang="less">
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .section-desc {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
  }

  .step-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-item {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    gap: 12px;
    align-items: start;
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    background: #fff;
  }

  .step-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffb347, #ff7f32);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  .step-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .step-image-preview {
    position: relative;
    width: 220px;

    img {
      width: 100%;
      border-radius: 10px;
      object-fit: cover;
      aspect-ratio: 16 / 10;
    }
  }

  .remove-image {
    position: absolute;
    right: 4px;
    top: 4px;
    background: rgba(255, 255, 255, 0.85);
  }
</style>
