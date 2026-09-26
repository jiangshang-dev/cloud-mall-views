<template>
  <div class="ingredients-editor">
    <div class="section-head">
      <div>
        <div class="section-title">食材准备</div>
        <div class="section-desc">填写食材名称和用量，可按需增减</div>
      </div>
      <a-button type="dashed" @click="addItem">
        <Icon icon="ant-design:plus-outlined" />
        添加食材
      </a-button>
    </div>

    <div class="ingredient-list">
      <div v-for="(item, index) in modelValue" :key="index" class="ingredient-item">
        <div class="item-index">{{ index + 1 }}</div>
        <a-input v-model:value="item.name" placeholder="食材名称，如：五花肉" />
        <a-input v-model:value="item.amount" placeholder="用量，如：500克" />
        <a-button type="text" danger :disabled="modelValue.length <= 1" @click="removeItem(index)">
          <Icon icon="ant-design:delete-outlined" />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '/@/components/Icon';
  import type { RecipeIngredientItem } from '../recipe.types';

  const props = defineProps<{
    modelValue: RecipeIngredientItem[];
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: RecipeIngredientItem[]): void;
  }>();

  function update(list: RecipeIngredientItem[]) {
    emit('update:modelValue', list);
  }

  function addItem() {
    update([...props.modelValue, { name: '', amount: '' }]);
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

  .ingredient-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ingredient-item {
    display: grid;
    grid-template-columns: 36px 1fr 180px 40px;
    gap: 10px;
    align-items: center;
  }

  .item-index {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff0e6;
    color: #ff7f32;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
  }
</style>
