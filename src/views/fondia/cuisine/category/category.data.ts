import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 220,
    align: 'left',
  },
  { title: 'ID', dataIndex: 'id', width: 180 },
  {
    title: '层级',
    dataIndex: 'categoryLevel',
    width: 90,
    customRender: ({ text }) => (text === 1 ? '菜系' : text === 2 ? '子分类' : text),
  },
  {
    title: '子类类型',
    dataIndex: 'subType',
    width: 90,
    customRender: ({ text }) => (text === 1 ? '主食' : text === 2 ? '菜' : '-'),
  },
  { title: '热门', dataIndex: 'isHot', width: 70, customRender: ({ text }) => (text === 1 ? '是' : '否') },
  { title: '排序', dataIndex: 'sortNo', width: 70 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'name', label: '名称', component: 'Input', colProps: { span: 6 } },
  {
    field: 'categoryLevel',
    label: '层级',
    component: 'Select',
    componentProps: {
      options: [
        { label: '菜系', value: 1 },
        { label: '子分类', value: 2 },
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
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'name', label: '名称', component: 'Input', required: true },
  {
    field: 'parentId',
    label: '父级分类',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: { label: 'name', value: 'id', children: 'children' },
      allowClear: true,
      placeholder: '不选则为顶级菜系',
    },
    helpMessage: '顶级菜系留空或选 0',
  },
  {
    field: 'categoryLevel',
    label: '层级',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        { label: '菜系(L1)', value: 1 },
        { label: '子分类(L2)', value: 2 },
      ],
    },
  },
  {
    field: 'subType',
    label: '子类类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '主食', value: 1 },
        { label: '菜', value: 2 },
      ],
    },
    ifShow: ({ values }) => values.categoryLevel === 2,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'JUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
      text: '上传图标',
    },
  },
  {
    field: 'coverImage',
    label: '封面图',
    component: 'JUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
      text: '上传封面图',
    },
  },
  { field: 'description', label: '描述', component: 'InputTextArea' },
  { field: 'featureTags', label: '特色标签', component: 'Input', helpMessage: 'JSON 或逗号分隔' },
  {
    field: 'isHot',
    label: '热门',
    component: 'Select',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => values.categoryLevel === 1,
  },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];
