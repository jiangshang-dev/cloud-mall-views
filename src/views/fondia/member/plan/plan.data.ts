import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '套餐编码', dataIndex: 'planCode', width: 120 },
  { title: '名称', dataIndex: 'name', width: 140 },
  { title: '天数', dataIndex: 'durationDays', width: 70 },
  { title: '售价', dataIndex: 'price', width: 80 },
  { title: '原价', dataIndex: 'originalPrice', width: 80 },
  { title: '平台', dataIndex: 'platformScope', width: 90 },
  { title: '赠送积分', dataIndex: 'bonusPoints', width: 90 },
  { title: 'AI方案/日', dataIndex: 'aiNutritionDailyLimit', width: 100, customRender: ({ text }) => (text === 0 ? '不限' : text ?? '免费额度') },
  { title: '排序', dataIndex: 'sortNo', width: 70 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '上架' : '下架') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'planCode', label: '套餐编码', component: 'Input', colProps: { span: 6 } },
  { field: 'name', label: '名称', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }] } },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'planCode', label: '套餐编码', component: 'Input', required: true },
  { field: 'name', label: '名称', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'durationDays', label: '有效天数', component: 'InputNumber', required: true, defaultValue: 30 },
  { field: 'price', label: '售价', component: 'InputNumber', required: true },
  { field: 'originalPrice', label: '原价', component: 'InputNumber' },
  { field: 'currency', label: '币种', component: 'Input', defaultValue: 'CNY' },
  { field: 'platformScope', label: '适用平台', component: 'Select', defaultValue: 'ALL', componentProps: { options: [{ label: '全部', value: 'ALL' }, { label: 'iOS', value: 'IOS' }, { label: 'Android', value: 'ANDROID' }, { label: 'Web', value: 'WEB' }] } },
  { field: 'bonusPoints', label: '赠送积分', component: 'InputNumber', defaultValue: 0 },
  { field: 'bonusGrowth', label: '赠送成长值', component: 'InputNumber', defaultValue: 0 },
  { field: 'aiNutritionDailyLimit', label: 'AI专属方案/日', component: 'InputNumber', helpMessage: '0=不限，留空=沿用非会员免费次数' },
  { field: 'benefitsJson', label: '权益JSON', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }] } },
];
