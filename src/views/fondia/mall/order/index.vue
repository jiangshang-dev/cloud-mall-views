<template><div><BasicTable @register="registerTable"><template #action="{record}"><TableAction :actions="getTableAction(record)"/></template></BasicTable><OrderDetailModal @register="registerDetailModal"/></div></template>
<script lang="ts" setup name="fondia-mall-order">
import {BasicTable,TableAction,ActionItem} from '/@/components/Table';import {useModal} from '/@/components/Modal';import {useListPage} from '/@/hooks/system/useListPage';import {useMessage} from '/@/hooks/web/useMessage';
import {columns,searchFormSchema} from './order.data';import {getOrderList,shipOrder} from './order.api';import OrderDetailModal from './components/OrderDetailModal.vue';
const {createMessage}=useMessage();const {tableContext}=useListPage({designScope:'fondia-mall-order',tableProps:{title:'兑换订单',api:getOrderList,columns,formConfig:{schemas:searchFormSchema},actionColumn:{width:200}}});
const [registerTable,{reload}]=tableContext;const [registerDetailModal,{openModal}]=useModal();
function getTableAction(record):ActionItem[]{const a:ActionItem[]=[{label:'详情',onClick:()=>openModal(true,{record})}];if(record.orderStatus===0){a.push({label:'发货',popConfirm:{title:'确认发货？',confirm:async()=>{await shipOrder({id:record.id,orderStatus:1});createMessage.success('已发货');reload();}}});}return a;}
</script>
