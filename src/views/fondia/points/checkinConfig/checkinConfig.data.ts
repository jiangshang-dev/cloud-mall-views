import { BasicColumn, FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  { title: '第几天', dataIndex: 'dayIndex', width: 80 },
  { title: '奖励积分', dataIndex: 'rewardPoints', width: 100 },
  { title: '奖励成长', dataIndex: 'rewardGrowth', width: 100 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];
export const searchFormSchema: FormSchema[] = [];
export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'dayIndex', label: '第几天(1-7)', component: 'InputNumber', required: true, componentProps: { min: 1, max: 7 } },
  { field: 'rewardPoints', label: '奖励积分', component: 'InputNumber', required: true, defaultValue: 0 },
  { field: 'rewardGrowth', label: '奖励成长', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } },
];
