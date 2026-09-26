import { FormSchema } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  { field: 'welcomeTitle', label: '欢迎标题', component: 'Input', required: true },
  { field: 'welcomeTag', label: '欢迎标签', component: 'Input' },
  { field: 'welcomeDesc', label: '欢迎描述', component: 'InputTextArea', componentProps: { rows: 3 } },
  { field: 'humanGreeting', label: '人工开始语', component: 'InputTextArea', required: true, componentProps: { rows: 3 } },
  { field: 'privacyTip', label: '隐私提示', component: 'Input' },
  {
    field: 'aiAppId',
    label: 'AI应用ID',
    component: 'Input',
    required: true,
    helpMessage: 'Jeecg AI应用管理中已绑定知识库的应用ID',
  },
  {
    field: 'transferKeywords',
    label: '转人工关键词',
    component: 'Input',
    helpMessage: '逗号分隔，如：人工,转人工,人工客服',
  },
];
