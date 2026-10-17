<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" :width="960" :canFullscreen="true">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../chapter.data';
  import { getById, saveOrUpdate } from '../chapter.api';

  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const workTitle = ref('');
  const title = computed(() => {
    const base = unref(isUpdate) ? '编辑篇章正文' : '新增篇章正文';
    return unref(workTitle) ? `${base} · ${unref(workTitle)}` : base;
  });
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 110,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    workTitle.value = data?.workTitle || '';
    await updateSchema([{ field: 'workId', dynamicDisabled: !!data?.lockWork }]);
    if (unref(isUpdate)) {
      await setFieldsValue({ ...(await getById({ id: data.record.id })) });
    } else if (data?.workId) {
      await setFieldsValue({ workId: data.workId, sortNo: 0, status: 1 });
    }
    setModalProps({ confirmLoading: false });
  });
  async function handleSubmit() {
    const values = await validate();
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
