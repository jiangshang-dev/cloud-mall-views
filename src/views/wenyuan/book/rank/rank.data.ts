import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '榜单', dataIndex: 'rankType', width: 140 },
  { title: '标题', dataIndex: 'title', width: 140 },
  { title: '作者', dataIndex: 'authorName', width: 140 },
  { title: '热度', dataIndex: 'score', width: 140 },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '标题', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'rankType', label: '榜单', component: 'Select', componentProps: { options: [{ label: '图书榜', value: 'BOOK' }, { label: '课程榜', value: 'COURSE' }, { label: '书法榜', value: 'CALLIGRAPHY' }] } },
  { field: 'refId', label: '关联ID', component: 'Input' },
  { field: 'title', label: '标题', component: 'Input', required: true },
  { field: 'authorName', label: '作者', component: 'Input' },
  { field: 'score', label: '热度', component: 'InputNumber' },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
