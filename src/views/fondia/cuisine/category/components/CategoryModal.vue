<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="640px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../category.data';
  import { getCategoryById, getCategoryTree, saveOrUpdateCategory } from '../category.api';

  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const title = computed(() => {
    if (unref(isUpdate)) return '编辑分类';
    return unref(isSubAdd) ? '添加子分类' : '新增菜系';
  });
  const isSubAdd = ref(false);

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 100,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isSubAdd.value = !!data?.parentRecord;

    const treeData = await getCategoryTree({});
    await updateSchema({
      field: 'parentId',
      componentProps: {
        treeData,
        fieldNames: { label: 'name', value: 'id', children: 'children' },
        allowClear: true,
        placeholder: '不选则为顶级菜系',
      },
    });

    if (unref(isUpdate)) {
      const record = await getCategoryById({ id: data.record.id });
      await setFieldsValue({ ...record });
      return;
    }

    if (data?.parentRecord) {
      await setFieldsValue({
        parentId: data.parentRecord.id,
        categoryLevel: 2,
        status: 1,
        sortNo: 0,
      });
      return;
    }

    await setFieldsValue({
      parentId: 0,
      categoryLevel: 1,
      status: 1,
      sortNo: 0,
      isHot: 0,
    });
  });

  async function handleSubmit() {
    const values = await validate();
    if (!values.parentId) {
      values.parentId = 0;
    }
    if (values.categoryLevel === 1) {
      values.parentId = 0;
    }
    setModalProps({ confirmLoading: true });
    try {
      await saveOrUpdateCategory(values, unref(isUpdate));
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
