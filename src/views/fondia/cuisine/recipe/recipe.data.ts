import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '标题', dataIndex: 'title', width: 180 },
  { title: '菜系ID', dataIndex: 'cuisineId', width: 100, ifShow: false },
  { title: '分类ID', dataIndex: 'categoryId', width: 100, ifShow: false },
  { title: '难度', dataIndex: 'difficulty', width: 80, customRender: ({ text }) => ({ 1: '简单', 2: '中等', 3: '困难' }[text] || '--') },
  { title: '时长(分)', dataIndex: 'cookMinutes', width: 90 },
  { title: '热量', dataIndex: 'calories', width: 90 },
  { title: '点赞', dataIndex: 'likeCount', width: 70 },
  { title: '收藏', dataIndex: 'collectCount', width: 70 },
  { title: '浏览', dataIndex: 'viewCount', width: 70 },
  { title: '推荐', dataIndex: 'isRecommend', width: 70, customRender: ({ text }) => (text === 1 ? '是' : '否') },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '上架' : '下架') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '标题', component: 'Input', colProps: { span: 6 } },
  { field: 'cuisineId', label: '菜系ID', component: 'Input', colProps: { span: 6 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'title', label: '标题', component: 'Input', required: true },
  { field: 'subtitle', label: '副标题', component: 'Input' },
  { field: 'cuisineId', label: '菜系ID', component: 'InputNumber', required: true },
  { field: 'categoryId', label: '分类ID', component: 'InputNumber', required: true },
  { field: 'coverImage', label: '封面图', component: 'Input' },
  { field: 'videoUrl', label: '视频地址', component: 'Input' },
  { field: 'description', label: '描述', component: 'InputTextArea' },
  {
    field: 'difficulty',
    label: '难度',
    component: 'Select',
    componentProps: {
      options: [
        { label: '简单', value: 1 },
        { label: '中等', value: 2 },
        { label: '困难', value: 3 },
      ],
    },
  },
  { field: 'cookMinutes', label: '烹饪时长', component: 'InputNumber' },
  { field: 'calories', label: '热量', component: 'InputNumber' },
  { field: 'servingSize', label: '份量', component: 'Input' },
  { field: 'sortNo', label: '排序', component: 'InputNumber', defaultValue: 0 },
  {
    field: 'isRecommend',
    label: '推荐',
    component: 'Select',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 },
      ],
    },
  },
];
