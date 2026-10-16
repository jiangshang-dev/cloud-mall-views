import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '姓名', dataIndex: 'name', width: 140 },
  { title: '朝代', dataIndex: 'dynasty', width: 140 },
  { title: '头衔', dataIndex: 'title', width: 140 },
  { title: '头像字', dataIndex: 'avatarText', width: 140 },
  { title: '头像色调', dataIndex: 'avatarTone', width: 140 },
  { title: '首页推荐', dataIndex: 'recommend', width: 140, customRender: ({ text }) => (text === 1 ? '是' : '否') },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '姓名', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'name', label: '姓名', component: 'Input', required: true },
  { field: 'dynasty', label: '朝代', component: 'Input' },
  { field: 'title', label: '头衔', component: 'Input', required: true },
  { field: 'avatar', label: '头像', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'avatarText', label: '头像字', component: 'Input' },
  { field: 'avatarTone', label: '头像色调', component: 'Input' },
  { field: 'intro', label: '简介', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'recommend', label: '首页推荐', component: 'Select', defaultValue: 0, componentProps: { options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
