import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '问题', dataIndex: 'question', width: 240 },
  { title: '分类', dataIndex: 'category', width: 120 },
  { title: '排序', dataIndex: 'sortNo', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'question', label: '问题', component: 'Input', colProps: { span: 6 } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'question', label: '问题', component: 'Input', required: true },
  { field: 'answer', label: '答案', component: 'InputTextArea', required: true, componentProps: { rows: 4 } },
  { field: 'category', label: '分类', component: 'Input' },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];
