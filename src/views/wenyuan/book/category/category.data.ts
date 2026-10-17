import { FormSchema } from '/@/components/Table';

export const iconOptions = [
  { label: '书', value: 'book' },
  { label: '书库', value: 'library' },
  { label: '人物', value: 'person' },
  { label: '科学', value: 'scope' },
  { label: '医药', value: 'mortar' },
  { label: '农学', value: 'sprout' },
  { label: '法学', value: 'scale' },
  { label: '政经', value: 'scroll' },
  { label: '哲学', value: 'thought' },
  { label: '书法', value: 'brush' },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'parentId', label: '父级ID', component: 'Input', show: false },
  { field: 'parentName', label: '上级分类', component: 'Input', componentProps: { disabled: true } },
  { field: 'name', label: '分类名称', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'code', label: '分类编码', component: 'Input', required: true },
  { field: 'iconCode', label: '图标编码', component: 'Select', componentProps: { options: iconOptions } },
  { field: 'linkPath', label: '跳转路径', component: 'Input' },
  { field: 'showOnHome', label: '首页展示', component: 'Select', defaultValue: 0, componentProps: { options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] } },
];
