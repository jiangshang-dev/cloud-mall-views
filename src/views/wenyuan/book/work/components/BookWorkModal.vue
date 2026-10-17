<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="760px">
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <ChunkUpload :key="formKey + '-cover'" v-model:value="model[field]" accept="image/png,image/jpeg,image/webp" biz="cover" button-text="上传封面" />
      </template>
      <template #pdfUrl="{ model, field }">
        <ChunkUpload :key="formKey + '-pdf'" v-model:value="model[field]" accept="application/pdf,.pdf" biz="book" button-text="上传 PDF" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../work.data';
  import { getById, saveOrUpdate } from '../work.api';
  import { listAll } from '../../category/category.api';
  import ChunkUpload from './ChunkUpload.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const emit = defineEmits(['register', 'success']);
  const { createMessage } = useMessage();
  const isUpdate = ref(false);
  const formKey = ref(0);
  const title = computed(() => (unref(isUpdate) ? '编辑典籍作品' : '新增典籍作品'));
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    labelWidth: 110,
  });
  let flatCategories: any[] = [];

  function flatten(list, acc: any[] = [], seen = new Set<string>()) {
    (list || []).forEach((item) => {
      if (!item?.id || seen.has(item.id)) return;
      seen.add(item.id);
      acc.push(item);
      if (item.children?.length) flatten(item.children, acc, seen);
    });
    return acc;
  }

  function buildTree(list) {
    const map: Record<string, any> = {};
    list.forEach((item) => {
      if (!item.code) return;
      map[item.id] = { title: item.name, value: item.code, key: item.id, sortNo: item.sortNo || 0, children: [] };
    });
    const roots: any[] = [];
    list.forEach((item) => {
      const node = map[item.id];
      if (!node) return;
      const parent = item.parentId && item.parentId !== '0' ? map[item.parentId] : null;
      if (parent) parent.children.push(node);
      else roots.push(node);
    });
    const sortNodes = (nodes) => {
      nodes.sort((left, right) => left.sortNo - right.sortNo);
      nodes.forEach((node) => sortNodes(node.children));
    };
    sortNodes(roots);
    return roots;
  }

  function pathCodes(code) {
    const byCode = new Map(flatCategories.map((item) => [item.code, item]));
    const byId = new Map(flatCategories.map((item) => [item.id, item]));
    const codes: string[] = [];
    let current = byCode.get(code);
    const seen = new Set<string>();
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      if (current.code) codes.push(current.code);
      current = current.parentId && current.parentId !== '0' ? byId.get(current.parentId) : null;
    }
    return codes.join(',');
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    formKey.value += 1;
    isUpdate.value = !!data?.isUpdate;
    flatCategories = flatten(await listAll());
    await updateSchema({
      field: 'categoryCode',
      componentProps: {
        treeData: buildTree(flatCategories),
        onChange(value) {
          setFieldsValue({ categoryCodes: value ? pathCodes(value) : '' });
        },
      },
    });
    if (unref(isUpdate)) {
      const record = await getById({ id: data.record.id });
      if (!record.textDirection) record.textDirection = 'horizontal';
      await setFieldsValue({ ...record });
    } else if (data?.categoryCode) {
      await setFieldsValue({
        categoryCode: data.categoryCode,
        categoryCodes: pathCodes(data.categoryCode) || data.categoryCode,
        accessType: 'FREE',
        recommend: 0,
        sortNo: 0,
        status: 1,
        textDirection: 'horizontal',
      });
    }
    setModalProps({ confirmLoading: false });
  });
  async function handleSubmit() {
    const values = await validate();
    if (values.pdfUrl && !values.coverUrl) {
      createMessage.warning('上传 PDF 时请同时上传封面');
      return;
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
