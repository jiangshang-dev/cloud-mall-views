import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts) {
  if (!ts) return '-';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: '订单号', dataIndex: 'orderNo', width: 180 },
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '套餐', dataIndex: 'planName', width: 140 },
  { title: '金额', dataIndex: 'amount', width: 80 },
  { title: '支付渠道', dataIndex: 'payChannel', width: 100 },
  { title: '支付状态', dataIndex: 'payStatus', width: 90, customRender: ({ text }) => ['待支付','已支付','失败','已关闭','已退款'][text] ?? text },
  { title: '创建时间', dataIndex: 'createTime', width: 170, customRender: ({ text }) => formatTime(text) }
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime };
