<template><div><BasicTable @register="registerTable"><template #tableTitle><a-button type="primary" @click="()=>openModal(true,{isUpdate:false})">新增</a-button></template><template #action="{record}"><TableAction :actions="getTableAction(record)"/></template></BasicTable><ConfigModal @register="registerModal" @success="reload"/></div></template>
<script lang="ts" setup name="fondia-checkin-config">
import {BasicTable,TableAction,ActionItem} from '/@/components/Table';import {useModal} from '/@/components/Modal';import {useListPage} from '/@/hooks/system/useListPage';
import {columns,searchFormSchema} from './checkinConfig.data';import {getConfigList,deleteConfig} from './checkinConfig.api';import ConfigModal from './components/ConfigModal.vue';
const {tableContext}=useListPage({designScope:'fondia-checkin-config',tableProps:{title:'签到规则',api:getConfigList,columns,formConfig:{schemas:searchFormSchema},actionColumn:{width:160}}});
const [registerTable,{reload}]=tableContext;const [registerModal,{openModal}]=useModal();
function getTableAction(record):ActionItem[]{return [{label:'编辑',onClick:()=>openModal(true,{isUpdate:true,record})},{label:'删除',color:'error',popConfirm:{title:'确认删除？',confirm:()=>deleteConfig({id:record.id},reload)}}];}
</script>
