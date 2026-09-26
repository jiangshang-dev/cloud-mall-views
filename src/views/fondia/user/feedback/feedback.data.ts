import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

const typeOptions = [
  { label: '功能建议', value: '功能建议' },
  { label: '性能问题', value: '性能问题' },
  { label: '内容报错', value: '内容报错' },
  { label: '积分/签到', value: '积分/签到' },
  { label: '其他问题', value: '其他问题' },
];

function formatTime(ts?: number) {
  if (!ts) return '-';
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '用户昵称', dataIndex: 'userNickname', width: 120 },
  { title: '手机号', dataIndex: 'userPhone', width: 130 },
  { title: '反馈类型', dataIndex: 'feedbackType', width: 100 },
  { title: '反馈内容', dataIndex: 'content', width: 260, ellipsis: true },
  { title: '联系方式', dataIndex: 'contact', width: 140, ellipsis: true },
  {
    title: '图片数',
    dataIndex: 'images',
    width: 80,
    customRender: ({ record }) => (record.images?.length ? record.images.length : 0),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    customRender: ({ text }) =>
      h(Tag, { color: text === 1 ? 'success' : 'warning' }, () => (text === 1 ? '已处理' : '待处理')),
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 170,
    customRender: ({ text }) => formatTime(text),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'feedbackType',
    label: '反馈类型',
    component: 'Select',
    componentProps: { options: typeOptions, allowClear: true },
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        { label: '待处理', value: 0 },
        { label: '已处理', value: 1 },
      ],
    },
    colProps: { span: 6 },
  },
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime, typeOptions };
