import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '关键词', dataIndex: 'keyword', width: 140 },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'keyword', label: '关键词', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'keyword', label: '关键词', component: 'Input', required: true },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
