import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '标题', dataIndex: 'title', width: 120 },
  { title: '图标Key', dataIndex: 'icon', width: 120 },
  { title: '颜色', dataIndex: 'iconColor', width: 100 },
  { title: '预设消息', dataIndex: 'presetMessage', ellipsis: true },
  { title: '排序', dataIndex: 'sortNo', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'title', label: '标题', component: 'Input', required: true },
  {
    field: 'icon',
    label: '图标Key',
    component: 'Input',
    helpMessage: 'App端映射：wallet/lock_reset/gift/gavel 等',
  },
  { field: 'iconColor', label: '图标颜色', component: 'Input', helpMessage: '如 #FF8A4C' },
  {
    field: 'presetMessage',
    label: '预设消息',
    component: 'InputTextArea',
    required: true,
    componentProps: { rows: 3 },
    helpMessage: '用户点击后自动发送到AI聊天',
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
