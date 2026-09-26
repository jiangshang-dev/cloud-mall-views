<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="600px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../task.data';
  import { getTaskById, saveOrUpdateTask } from '../task.api';
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const title = computed(() => (unref(isUpdate) ? '编辑任务' : '新增任务'));
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({ schemas: formSchema, showActionButtonGroup: false, labelWidth: 100 });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields(); isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) await setFieldsValue({ ...(await getTaskById({ id: data.record.id })) });
    setModalProps({ confirmLoading: false });
  });
  async function handleSubmit() {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    try { await saveOrUpdateTask(values, unref(isUpdate)); closeModal(); emit('success'); } finally { setModalProps({ confirmLoading: false }); }
  }
</script>
