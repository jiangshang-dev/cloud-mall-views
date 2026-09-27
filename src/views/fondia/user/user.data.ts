import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'id', width: 180 },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    align: 'center',
    customRender: render.renderAvatar,
  },
  { title: '用户名', dataIndex: 'username', width: 140 },
  { title: '昵称', dataIndex: 'nickname', width: 140 },
  { title: '手机号', dataIndex: 'phone', width: 130 },
  { title: '邮箱', dataIndex: 'email', width: 180 },
  {
    title: '是否会员',
    dataIndex: 'memberStatus',
    width: 100,
    customRender: ({ text }) => {
      if (text === 1) return '是';
      if (text === 2) return '已过期';
      return '否';
    },
  },
  { title: '会员套餐', dataIndex: 'memberPlanCode', width: 120 },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 70,
    customRender: ({ text }) => {
      if (text === '1') return '男';
      if (text === '2') return '女';
      return '未知';
    },
  },
  {
    title: '所在地区',
    dataIndex: 'province',
    width: 220,
    ellipsis: true,
    customRender: ({ record }) => [record?.province, record?.city, record?.district].filter((item) => !!item).join(' '),
  },
  {
    title: '厨艺等级',
    dataIndex: 'cookingLevel',
    width: 110,
    customRender: ({ text }) => {
      const level = text == null || text === '' ? 1 : Number(text);
      if (level === 1) return '1 初学者';
      if (level === 2) return '2 家常';
      if (level === 3) return '3 熟练';
      if (level === 4) return '4 达人';
      return text;
    },
  },
  { title: '积分', dataIndex: 'points', width: 80 },
  { title: '成长值', dataIndex: 'growthValue', width: 90 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    customRender: ({ text }) => {
      if (text === 1) return '正常';
      if (text === 0) return '禁用';
      if (text === -1) return '已注销';
      return text;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'username', label: '用户名', component: 'Input', colProps: { span: 6 } },
  { field: 'nickname', label: '昵称', component: 'Input', colProps: { span: 6 } },
  { field: 'phone', label: '手机号', component: 'Input', colProps: { span: 6 } },
  {
    field: 'memberStatus',
    label: '是否会员',
    component: 'Select',
    componentProps: {
      options: [
        { label: '非会员', value: 0 },
        { label: '有效会员', value: 1 },
        { label: '已过期', value: 2 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 },
        { label: '已注销', value: -1 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  {
    field: 'avatar',
    label: '头像',
    component: 'JImageUpload',
    componentProps: { fileMax: 1 },
  },
  { field: 'nickname', label: '昵称', component: 'Input', required: true },
  { field: 'phone', label: '手机号', component: 'Input' },
  { field: 'email', label: '邮箱', component: 'Input' },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
    },
  },
  { field: 'sign', label: '个性签名', component: 'InputTextArea' },
  {
    field: 'birthday',
    label: '生日',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  { field: 'province', label: '省份', component: 'Input' },
  { field: 'city', label: '城市', component: 'Input' },
  { field: 'district', label: '区县', component: 'Input' },
  {
    field: 'cookingLevel',
    label: '厨艺等级',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '1 初学者', value: 1 },
        { label: '2 家常', value: 2 },
        { label: '3 熟练', value: 3 },
        { label: '4 达人', value: 4 },
      ],
    },
  },
  { field: 'points', label: '积分', component: 'InputNumber', componentProps: { min: 0 } },
  { field: 'growthValue', label: '成长值', component: 'InputNumber', componentProps: { min: 0 } },
  { field: 'checkInDays', label: '连续签到', component: 'InputNumber', componentProps: { min: 0 } },
  {
    field: 'memberStatus',
    label: '是否会员',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: [
        { label: '非会员', value: 0 },
        { label: '有效会员', value: 1 },
        { label: '已过期', value: 2 },
      ],
    },
  },
  { field: 'memberPlanCode', label: '会员套餐', component: 'Input', componentProps: { disabled: true } },
  { field: 'tastePreference', label: '口味偏好', component: 'Input' },
  { field: 'dietaryPreference', label: '饮食偏好', component: 'Input' },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 },
        { label: '已注销', value: -1 },
      ],
    },
  },
];
