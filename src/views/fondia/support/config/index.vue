<template>
  <div class="p-4">
    <a-card title="在线客服全局配置">
      <BasicForm @register="registerForm" />
      <div class="mt-4">
        <a-button type="primary" :loading="loading" @click="handleSave">保存配置</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup name="fondia-cs-config">
  import { ref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formSchema } from './config.data';
  import { getCsConfig, saveCsConfig } from './config.api';

  const { createMessage } = useMessage();
  const loading = ref(false);

  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 140,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  onMounted(async () => {
    const data = await getCsConfig();
    setFieldsValue(data);
  });

  async function handleSave() {
    const values = await validate();
    loading.value = true;
    try {
      await saveCsConfig(values);
      createMessage.success('保存成功');
    } finally {
      loading.value = false;
    }
  }
</script>
