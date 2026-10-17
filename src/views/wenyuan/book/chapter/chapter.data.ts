import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '作品ID', dataIndex: 'workId', width: 120 },
  { title: '卷次', dataIndex: 'volumeLabel', width: 100 },
  { title: '篇名', dataIndex: 'title', width: 160 },
  { title: '排序', dataIndex: 'sortNo', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80 },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'workId', label: '作品ID', component: 'Input', colProps: { span: 6 } },
  { field: 'title', label: '篇名', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'workId', label: '作品ID', component: 'Input', required: true },
  { field: 'volumeLabel', label: '卷次', component: 'Input' },
  { field: 'title', label: '篇名', component: 'Input', required: true },
  { field: 'contentOriginal', label: '原文', component: 'InputTextArea', required: true, componentProps: { rows: 8, placeholder: '一段一行。换行会显示成新段落；整篇不换行时，按一句一段排开。' } },
  { field: 'contentHans', label: '简体', component: 'InputTextArea', componentProps: { rows: 8, placeholder: '一段一行。换行会显示成新段落；整篇不换行时，按一句一段排开。' } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
