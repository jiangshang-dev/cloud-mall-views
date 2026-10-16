import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: '分类名称', dataIndex: 'name', width: 140 },
  { title: '副标题', dataIndex: 'subtitle', width: 140 },
  { title: '分类编码', dataIndex: 'code', width: 140 },
  { title: '图标编码', dataIndex: 'iconCode', width: 140 },
  { title: '首页展示', dataIndex: 'showOnHome', width: 140, customRender: ({ text }) => (text === 1 ? '是' : '否') },
  { title: '排序', dataIndex: 'sortNo', width: 140 },
  { title: '状态', dataIndex: 'status', width: 140, customRender: ({ text }) => (text === 1 ? '启用' : '停用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '分类名称', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'parentId', label: '父级ID', component: 'Input' },
  { field: 'name', label: '分类名称', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'code', label: '分类编码', component: 'Input', required: true },
  { field: 'iconCode', label: '图标编码', component: 'Select', componentProps: { options: [{ label: '书', value: 'book' }, { label: '书库', value: 'library' }, { label: '人物', value: 'person' }, { label: '科学', value: 'scope' }, { label: '医药', value: 'mortar' }, { label: '农学', value: 'sprout' }, { label: '法学', value: 'scale' }, { label: '政经', value: 'scroll' }, { label: '哲学', value: 'thought' }, { label: '书法', value: 'brush' }] } },
  { field: 'linkPath', label: '跳转路径', component: 'Input' },
  { field: 'showOnHome', label: '首页展示', component: 'Select', defaultValue: 0, componentProps: { options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
