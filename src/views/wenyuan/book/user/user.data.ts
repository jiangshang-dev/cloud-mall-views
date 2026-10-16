import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '账号', dataIndex: 'username', width: 140 },
  { title: '昵称', dataIndex: 'nickname', width: 140 },
  { title: '邮箱', dataIndex: 'email', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'username', label: '账号', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'username', label: '账号', component: 'Input', dynamicDisabled: true },
  { field: 'nickname', label: '昵称', component: 'Input' },
  { field: 'avatar', label: '头像', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'email', label: '邮箱', component: 'Input' },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
