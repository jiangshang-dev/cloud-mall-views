import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '书名', dataIndex: 'title', width: 140 },
  { title: '封面题签', dataIndex: 'coverLabel', width: 140 },
  { title: '封面色调', dataIndex: 'coverTone', width: 140 },
  { title: '分类标签', dataIndex: 'classicTag', width: 140 },
  { title: '作者', dataIndex: 'authorName', width: 140 },
  { title: '主分类编码', dataIndex: 'categoryCode', width: 140 },
  { title: '朝代', dataIndex: 'dynasty', width: 140 },
  { title: '阅读权限', dataIndex: 'accessType', width: 140 },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '书名', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'title', label: '书名', component: 'Input', required: true },
  { field: 'coverLabel', label: '封面题签', component: 'Input' },
  { field: 'coverTone', label: '封面色调', component: 'Input' },
  { field: 'coverUrl', label: '封面图', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'classicTag', label: '分类标签', component: 'Input' },
  { field: 'authorId', label: '作者ID', component: 'Input' },
  { field: 'authorName', label: '作者', component: 'Input' },
  { field: 'categoryCode', label: '主分类编码', component: 'Input' },
  { field: 'categoryCodes', label: '分类编码', component: 'Input' },
  { field: 'dynasty', label: '朝代', component: 'Input' },
  { field: 'summary', label: '简介', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'excerpt', label: '原文节选', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'accessType', label: '阅读权限', component: 'Select', defaultValue: 'FREE', componentProps: { options: [{ label: '免费', value: 'FREE' }, { label: '会员', value: 'MEMBER' }] } },
  { field: 'score', label: '评分', component: 'InputNumber' },
  { field: 'recommend', label: '首页精选', component: 'Select', defaultValue: 0, componentProps: { options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
