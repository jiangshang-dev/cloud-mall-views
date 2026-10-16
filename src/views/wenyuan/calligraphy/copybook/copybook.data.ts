import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '字帖名称', dataIndex: 'title', width: 140 },
  { title: '书体', dataIndex: 'styleName', width: 140 },
  { title: '书法家', dataIndex: 'authorName', width: 140 },
  { title: '封面色调', dataIndex: 'coverTone', width: 140 },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '字帖名称', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'title', label: '字帖名称', component: 'Input', required: true },
  { field: 'styleName', label: '书体', component: 'Input' },
  { field: 'authorName', label: '书法家', component: 'Input' },
  { field: 'summary', label: '简介', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'coverTone', label: '封面色调', component: 'Input' },
  { field: 'coverUrl', label: '封面图', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
