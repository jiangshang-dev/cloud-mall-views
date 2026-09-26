<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    defaultFullscreen
    :canFullscreen="false"
    :destroyOnClose="true"
    @ok="handleSubmit"
    okText="保存菜谱"
    cancelText="取消"
    wrapClassName="recipe-fullscreen-modal"
  >
    <a-spin :spinning="loading">
      <div class="recipe-form-layout">
        <section class="panel panel-left">
          <div class="panel-title">视频与封面</div>
          <RecipeVideoSection v-model:video-url="form.videoUrl" :title="form.title" />

          <a-form layout="vertical" class="cover-form">
            <a-form-item label="封面图">
              <JUpload v-model:value="form.coverImage" file-type="image" :max-count="1" text="上传封面" />
            </a-form-item>
          </a-form>
        </section>

        <section class="panel panel-right">
          <div class="panel-title">基本信息</div>
          <a-form layout="vertical">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="标题" required>
                  <a-input v-model:value="form.title" placeholder="如：红烧肉" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="副标题">
                  <a-input v-model:value="form.subtitle" placeholder="一句话介绍" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="菜系" required>
                  <a-select
                    v-model:value="form.cuisineId"
                    placeholder="请选择菜系"
                    :options="cuisineOptions"
                    @change="handleCuisineChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="分类" required>
                  <a-select
                    v-model:value="form.categoryId"
                    placeholder="请先选择菜系"
                    :options="categoryOptions"
                    :disabled="!form.cuisineId"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="标签">
                  <a-select
                    v-model:value="form.tagIds"
                    mode="multiple"
                    placeholder="选择标签"
                    :options="tagOptions"
                    option-filter-prop="label"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="描述">
                  <a-textarea v-model:value="form.description" :rows="3" placeholder="菜谱描述" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="烹饪时长（分钟）">
                  <a-input-number v-model:value="form.cookMinutes" :min="1" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="难度">
                  <a-select v-model:value="form.difficulty" :options="difficultyOptions" placeholder="选择难度" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="热量（大卡/100克）">
                  <a-input-number v-model:value="form.calories" :min="0" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="份量">
                  <a-input v-model:value="form.servingSize" placeholder="如：2-3人份" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="排序">
                  <a-input-number v-model:value="form.sortNo" :min="0" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="推荐">
                  <a-select
                    v-model:value="form.isRecommend"
                    :options="[
                      { label: '否', value: 0 },
                      { label: '是', value: 1 },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态">
                  <a-select
                    v-model:value="form.status"
                    :options="[
                      { label: '上架', value: 1 },
                      { label: '下架', value: 0 },
                    ]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>

          <RecipeIngredientsEditor v-model="form.ingredients" />
          <div class="section-gap"></div>
          <RecipeStepsEditor v-model="form.steps" />
        </section>
      </div>
    </a-spin>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getCategoryTree } from '../../category/category.api';
  import { getTagList } from '../../tag/tag.api';
  import { getRecipeById, saveOrUpdateRecipe } from '../recipe.api';
  import {
    createEmptyRecipe,
    difficultyOptions,
    flattenCategoryTree,
    type CategoryTreeNode,
    type RecipeFormModel,
  } from '../recipe.types';
  import RecipeVideoSection from './RecipeVideoSection.vue';
  import RecipeIngredientsEditor from './RecipeIngredientsEditor.vue';
  import RecipeStepsEditor from './RecipeStepsEditor.vue';

  const emit = defineEmits(['register', 'success']);
  const { createMessage } = useMessage();

  const isUpdate = ref(false);
  const loading = ref(false);
  const form = reactive<RecipeFormModel>(createEmptyRecipe());
  const cuisineOptions = ref<{ label: string; value: number }[]>([]);
  const categoryMap = ref(new Map<number, { label: string; value: number }[]>());
  const tagOptions = ref<{ label: string; value: number }[]>([]);

  const title = computed(() => (unref(isUpdate) ? '编辑菜谱' : '新增菜谱'));
  const categoryOptions = computed(() => {
    if (!form.cuisineId) return [];
    return categoryMap.value.get(form.cuisineId) || [];
  });

  async function loadOptions() {
    const [treeRes, tagRes] = await Promise.all([
      getCategoryTree({ status: 1 }),
      getTagList({ pageNo: 1, pageSize: 500, status: 1 }),
    ]);
    const tree = (Array.isArray(treeRes) ? treeRes : treeRes?.records || []) as CategoryTreeNode[];
    const { cuisines, categoryMap: map } = flattenCategoryTree(tree);
    cuisineOptions.value = cuisines;
    categoryMap.value = map;
    const tagRecords = tagRes?.records || (Array.isArray(tagRes) ? tagRes : []);
    tagOptions.value = tagRecords.map((item) => ({ label: item.name, value: item.id }));
  }

  function resetForm() {
    Object.assign(form, createEmptyRecipe());
  }

  function handleCuisineChange() {
    form.categoryId = undefined;
  }

  function fillForm(record: any) {
    resetForm();
    Object.assign(form, {
      id: record.id,
      title: record.title || '',
      subtitle: record.subtitle || '',
      description: record.description || '',
      cuisineId: record.cuisineId,
      categoryId: record.categoryId,
      coverImage: record.coverImage || '',
      videoUrl: record.videoUrl || '',
      videoDuration: record.videoDuration,
      difficulty: record.difficulty,
      cookMinutes: record.cookMinutes,
      calories: record.calories,
      servingSize: record.servingSize || '2-3人份',
      tagIds: record.tagIds || [],
      sortNo: record.sortNo ?? 0,
      isRecommend: record.isRecommend ?? 0,
      status: record.status ?? 1,
      ingredients: record.ingredients?.length
        ? record.ingredients.map((item) => ({
            name: item.name || '',
            amount: item.amount || '',
            image: item.image || '',
          }))
        : [{ name: '', amount: '' }],
      steps: record.steps?.length
        ? record.steps.map((item) => ({
            content: item.content || '',
            tip: item.tip || '',
            image: item.image || '',
            stepNo: item.stepNo,
          }))
        : [{ content: '', tip: '' }],
    });
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    loading.value = true;
    try {
      resetForm();
      await loadOptions();
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate) && data?.record?.id) {
        const record = await getRecipeById({ id: data.record.id });
        fillForm(record);
      }
    } finally {
      loading.value = false;
      setModalProps({ confirmLoading: false });
    }
  });

  function validateForm() {
    if (!form.title?.trim()) {
      createMessage.warning('请输入菜谱标题');
      return false;
    }
    if (!form.cuisineId) {
      createMessage.warning('请选择菜系');
      return false;
    }
    if (!form.categoryId) {
      createMessage.warning('请选择分类');
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    setModalProps({ confirmLoading: true });
    try {
      const payload = {
        ...form,
        ingredients: form.ingredients.filter((item) => item.name?.trim()),
        steps: form.steps
          .filter((item) => item.content?.trim())
          .map((item, index) => ({ ...item, stepNo: index + 1 })),
      };
      await saveOrUpdateRecipe(payload, unref(isUpdate));
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less">
  .recipe-fullscreen-modal {
    .ant-modal-body {
      padding: 16px 20px 24px;
      background: #f5f6f8;
    }
  }
</style>

<style scoped lang="less">
  .recipe-form-layout {
    display: grid;
    grid-template-columns: minmax(360px, 420px) 1fr;
    gap: 16px;
    min-height: calc(100vh - 180px);
  }

  .panel {
    background: #fff;
    border-radius: 14px;
    padding: 18px;
    border: 1px solid #f0f0f0;
  }

  .panel-title {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin-bottom: 16px;
  }

  .panel-left {
    position: sticky;
    top: 0;
    align-self: start;
  }

  .cover-form {
    margin-top: 16px;
  }

  .section-gap {
    height: 24px;
  }
</style>
