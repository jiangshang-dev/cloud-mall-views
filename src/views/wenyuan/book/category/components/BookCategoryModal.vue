<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="760px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../category.data';
  import { getById, saveOrUpdate } from '../category.api';

  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const parentId = ref('');
  const title = computed(() => {
    if (unref(isUpdate)) return '修改分类';
    return unref(parentId) ? '新增下级分类' : '新增分类';
  });
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 110,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    parentId.value = data?.parentId || '';
    const parentName = data?.parentName || '顶级分类';
    if (unref(isUpdate)) {
      const detail = await getById({ id: data.record.id });
      parentId.value = detail?.parentId || '';
      await setFieldsValue({ ...detail, parentName });
    } else {
      await setFieldsValue({
        parentId: parentId.value || undefined,
        parentName,
        showOnHome: 0,
        sortNo: 0,
        status: 1,
      });
    }
    setModalProps({ confirmLoading: false });
  });
  async function handleSubmit() {
    const values = await validate();
    delete values.parentName;
    if (!values.parentId) {
      values.parentId = null;
    }
    setModalProps({ confirmLoading: true });
    try {
      await saveOrUpdate(values, unref(isUpdate));
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
