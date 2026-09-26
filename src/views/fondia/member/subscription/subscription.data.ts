import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts) {
  if (!ts) return '-';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '套餐编码', dataIndex: 'planCode', width: 120 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '到期时间', dataIndex: 'expireTime', width: 170, customRender: ({ text }) => formatTime(text) },
  { title: '渠道', dataIndex: 'sourceChannel', width: 100 }
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime };
