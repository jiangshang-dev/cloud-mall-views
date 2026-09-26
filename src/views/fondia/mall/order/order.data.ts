import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts){if(!ts)return '-';const d=new Date(typeof ts==='number'?ts:ts);const pad=(n)=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;}
export const columns: BasicColumn[] = [
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '商品', dataIndex: 'productName', width: 160 },
  { title: '消耗积分', dataIndex: 'pointsCost', width: 90 },
  { title: '状态', dataIndex: 'orderStatus', width: 90, customRender: ({ text }) => ['待处理','已发货','已完成','已取消'][text] ?? text },
  { title: '创建时间', dataIndex: 'createTime', width: 170, customRender: ({ text }) => formatTime(text) },
];
export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
  { field: 'orderStatus', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{label:'待处理',value:0},{label:'已发货',value:1},{label:'已完成',value:2},{label:'已取消',value:3}] } },
];
export { formatTime };
