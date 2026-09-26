<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="560px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../banner.data';
  import { getBannerById, saveOrUpdateBanner } from '../banner.api';

  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const title = computed(() => (unref(isUpdate) ? '编辑轮播图' : '新增轮播图'));

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 90,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const record = await getBannerById({ id: data.record.id });
      await setFieldsValue({ ...record });
    }
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    try {
      await saveOrUpdateBanner(values, unref(isUpdate));
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
