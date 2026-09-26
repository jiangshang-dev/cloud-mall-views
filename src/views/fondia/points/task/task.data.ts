import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '任务编码', dataIndex: 'taskCode', width: 140 },
  { title: '标题', dataIndex: 'title', width: 160 },
  { title: '奖励积分', dataIndex: 'rewardPoints', width: 90 },
  { title: '触发类型', dataIndex: 'actionType', width: 100 },
  { title: '日限', dataIndex: 'dailyLimit', width: 70 },
  { title: '排序', dataIndex: 'sortNo', width: 70 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '标题', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'taskCode', label: '任务编码', component: 'Input', required: true },
  { field: 'title', label: '标题', component: 'Input', required: true },
  { field: 'description', label: '描述', component: 'InputTextArea' },
  { field: 'rewardPoints', label: '奖励积分', component: 'InputNumber', required: true, defaultValue: 0 },
  { field: 'actionType', label: '触发类型', component: 'Select', defaultValue: 'MANUAL', componentProps: { options: [{ label: '手动', value: 'MANUAL' }, { label: '浏览', value: 'BROWSE' }, { label: '评论', value: 'COMMENT' }, { label: '分享', value: 'SHARE' }] } },
  { field: 'dailyLimit', label: '每日上限', component: 'InputNumber', defaultValue: 1 },
  { field: 'totalLimit', label: '总上限', component: 'InputNumber', defaultValue: 0 },
  { field: 'jumpUrl', label: '跳转链接', component: 'Input' },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] } },
];
