import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '标签名', dataIndex: 'name', width: 140 },
  { title: '类型', dataIndex: 'tagType', width: 120 },
  { title: '排序', dataIndex: 'sortNo', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '标签名', component: 'Input', colProps: { span: 6 } },
  { field: 'tagType', label: '类型', component: 'Input', colProps: { span: 6 } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'name', label: '标签名', component: 'Input', required: true },
  {
    field: 'tagType',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '菜系', value: 'CUISINE' },
        { label: '风格', value: 'STYLE' },
        { label: '口味', value: 'TASTE' },
      ],
    },
  },
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
