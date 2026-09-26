<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="520px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../tag.data';
  import { getTagById, saveOrUpdateTag } from '../tag.api';

  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const title = computed(() => (unref(isUpdate) ? '编辑标签' : '新增标签'));

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 80,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const record = await getTagById({ id: data.record.id });
      await setFieldsValue({ ...record });
    }
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    try {
      await saveOrUpdateTag(values, unref(isUpdate));
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
