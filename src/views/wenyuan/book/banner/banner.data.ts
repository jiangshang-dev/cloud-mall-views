import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '位置', dataIndex: 'slotCode', width: 140 },
  { title: '标题', dataIndex: 'title', width: 140 },
  { title: '副标题', dataIndex: 'subtitle', width: 140 },
  { title: '按钮文字', dataIndex: 'buttonText', width: 140 },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '标题', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'slotCode', label: '位置', component: 'Select', componentProps: { options: [{ label: '书法卡片', value: 'calligraphy' }, { label: '课程卡片', value: 'course' }, { label: '四库全书', value: 'promo_siku' }, { label: '名人著作', value: 'promo_celebrity' }, { label: '学科文库', value: 'promo_science' }] } },
  { field: 'title', label: '标题', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'description', label: '描述', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'buttonText', label: '按钮文字', component: 'Input' },
  { field: 'linkPath', label: '跳转路径', component: 'Input' },
  { field: 'coverUrl', label: '配图', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
