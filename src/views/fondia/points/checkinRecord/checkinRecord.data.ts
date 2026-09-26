import { BasicColumn, FormSchema } from '/@/components/Table';
function formatTime(ts) {
  if (!ts) return '-';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'userId', width: 120 },
  { title: '签到日期', dataIndex: 'checkinDate', width: 120 },
  { title: '连续天数', dataIndex: 'streakDays', width: 90 },
  { title: '奖励积分', dataIndex: 'rewardPoints', width: 90 },
  { title: '奖励成长', dataIndex: 'rewardGrowth', width: 90 }
];

export const searchFormSchema: FormSchema[] = [
  { field: 'userId', label: '用户ID', component: 'Input', colProps: { span: 6 } },
];

export { formatTime };
