import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts) {
  if (!ts) return '-';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: '流水号', dataIndex: 'paymentNo', width: 180 },
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '渠道', dataIndex: 'payChannel', width: 100 },
  { title: '金额', dataIndex: 'amount', width: 80 },
  { title: '状态', dataIndex: 'payStatus', width: 90 }
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime };
