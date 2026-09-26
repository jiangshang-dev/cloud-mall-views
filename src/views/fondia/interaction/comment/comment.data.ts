import { BasicColumn, FormSchema } from '/@/components/Table';

const statusMap = {
  0: '已隐藏',
  1: '已发布',
  2: '审核中',
};

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '菜谱ID', dataIndex: 'recipeId', width: 120 },
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '内容', dataIndex: 'content', width: 260, ellipsis: true },
  { title: '点赞', dataIndex: 'likeCount', width: 70 },
  { title: '回复', dataIndex: 'replyCount', width: 70 },
  { title: 'IP', dataIndex: 'ip', width: 120 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    customRender: ({ text }) => statusMap[text] ?? text,
  },
  { title: '创建时间', dataIndex: 'createTime', width: 160 },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'recipeId', label: '菜谱ID', component: 'Input', colProps: { span: 6 } },
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
  { field: 'content', label: '内容', component: 'Input', colProps: { span: 6 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已隐藏', value: 0 },
        { label: '已发布', value: 1 },
        { label: '审核中', value: 2 },
      ],
    },
    colProps: { span: 6 },
  },
];
