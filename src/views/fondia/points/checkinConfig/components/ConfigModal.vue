<template><BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="480px"><BasicForm @register="registerForm" /></BasicModal></template>
<script lang="ts" setup>
import { ref, computed, unref } from 'vue'; import { BasicModal, useModalInner } from '/@/components/Modal'; import { BasicForm, useForm } from '/@/components/Form';
import { formSchema } from '../checkinConfig.data'; import { getConfigById, saveOrUpdateConfig } from '../checkinConfig.api';
const emit = defineEmits(['register','success']); const isUpdate = ref(false); const title = computed(() => unref(isUpdate) ? '编辑规则' : '新增规则');
const [registerForm,{resetFields,setFieldsValue,validate}] = useForm({schemas:formSchema,showActionButtonGroup:false,labelWidth:110});
const [registerModal,{setModalProps,closeModal}] = useModalInner(async(data)=>{await resetFields();isUpdate.value=!!data?.isUpdate;if(unref(isUpdate))await setFieldsValue({...(await getConfigById({id:data.record.id}))});setModalProps({confirmLoading:false});});
async function handleSubmit(){const v=await validate();setModalProps({confirmLoading:true});try{await saveOrUpdateConfig(v,unref(isUpdate));closeModal();emit('success');}finally{setModalProps({confirmLoading:false});}}
</script>
