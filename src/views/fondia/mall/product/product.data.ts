import { BasicColumn, FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  { title: '编码', dataIndex: 'productCode', width: 120 },
  { title: '名称', dataIndex: 'name', width: 160 },
  { title: '类型', dataIndex: 'productType', width: 90 },
  { title: '积分价', dataIndex: 'pointsPrice', width: 80 },
  { title: '库存', dataIndex: 'stock', width: 70 },
  { title: '已兑', dataIndex: 'soldCount', width: 70 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '上架' : '下架') },
];
export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '名称', component: 'Input', colProps: { span: 6 } },
  { field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: { options: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }] } },
];
export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'productCode', label: '商品编码', component: 'Input', required: true },
  { field: 'name', label: '名称', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'coverImage', label: '封面图', component: 'JUpload', componentProps: { fileType: 'image', maxCount: 1 } },
  { field: 'productType', label: '类型', component: 'Select', defaultValue: 'VIRTUAL', componentProps: { options: [{ label: '虚拟', value: 'VIRTUAL' }, { label: '实物', value: 'PHYSICAL' }] } },
  { field: 'virtualConfigJson', label: '虚拟履约配置', component: 'InputTextArea', componentProps: { rows: 3, placeholder: '虚拟/优惠券商品必填。示例：{"fulfillType":"MEMBER_DAYS","memberDays":3,"planCode":"VIP_TRIAL"} 或 {"fulfillType":"COUPON","couponAmount":5}' }, helpMessage: '实物商品留空；虚拟商品兑换后自动履约' },
  { field: 'pointsPrice', label: '兑换积分', component: 'InputNumber', required: true },
  { field: 'stock', label: '库存(-1不限)', component: 'InputNumber', defaultValue: 0 },
  { field: 'limitPerUser', label: '每用户限兑', component: 'InputNumber', defaultValue: 0 },
  { field: 'detailHtml', label: '详情', component: 'InputTextArea', componentProps: { rows: 4 } },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  { field: 'status', label: '状态', component: 'Select', defaultValue: 1, componentProps: { options: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }] } },
];
