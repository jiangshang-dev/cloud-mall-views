<template><BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="640px"><BasicForm @register="registerForm"/></BasicModal></template>
<script lang="ts" setup>
import {ref,computed,unref} from 'vue';import {BasicModal,useModalInner} from '/@/components/Modal';import {BasicForm,useForm} from '/@/components/Form';
import {formSchema} from '../product.data';import {getProductById,saveOrUpdateProduct} from '../product.api';
const emit=defineEmits(['register','success']);const isUpdate=ref(false);const title=computed(()=>unref(isUpdate)?'编辑商品':'新增商品');
const [registerForm,{resetFields,setFieldsValue,validate}]=useForm({schemas:formSchema,showActionButtonGroup:false,labelWidth:100});
const [registerModal,{setModalProps,closeModal}]=useModalInner(async(data)=>{await resetFields();isUpdate.value=!!data?.isUpdate;if(unref(isUpdate))await setFieldsValue({...(await getProductById({id:data.record.id}))});setModalProps({confirmLoading:false});});
async function handleSubmit(){const v=await validate();setModalProps({confirmLoading:true});try{await saveOrUpdateProduct(v,unref(isUpdate));closeModal();emit('success');}finally{setModalProps({confirmLoading:false});}}
</script>
