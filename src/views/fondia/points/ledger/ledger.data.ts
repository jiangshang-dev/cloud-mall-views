import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts) {
  if (!ts) return '-';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '变动', dataIndex: 'changeAmount', width: 80 },
  { title: '余额', dataIndex: 'balanceAfter', width: 80 },
  { title: '类型', dataIndex: 'bizType', width: 120 },
  { title: '标题', dataIndex: 'title', width: 160, ellipsis: true },
  { title: '时间', dataIndex: 'createTime', width: 170, customRender: ({ text }) => formatTime(text) }
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime };
