import { BasicColumn, FormSchema } from '/@/components/Table';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
import { h } from 'vue';
import { Image } from 'ant-design-vue';
import { getRecipeList } from '../recipe/recipe.api';

export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: 180 },
  { title: '关联菜谱', dataIndex: 'recipeTitle', width: 160 },
  { title: '标题', dataIndex: 'title', width: 160 },
  { title: '副标题', dataIndex: 'subtitle', width: 200, ellipsis: true },
  {
    title: '轮播图',
    dataIndex: 'imageUrl',
    width: 100,
    customRender: ({ text }) => {
      if (!text) return '-';
      return h(Image, {
        src: getFileAccessHttpUrl(text),
        width: 64,
        height: 40,
        style: { objectFit: 'cover', borderRadius: '4px' },
      });
    },
  },
  { title: '排序', dataIndex: 'sortNo', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80, customRender: ({ text }) => (text === 1 ? '启用' : '禁用') },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'title', label: '标题', component: 'Input', colProps: { span: 6 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  { field: 'id', label: 'ID', component: 'Input', show: false },
  {
    field: 'recipeId',
    label: '关联菜谱',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getRecipeList,
      params: { pageNo: 1, pageSize: 500, status: 1 },
      resultField: 'records',
      labelField: 'title',
      valueField: 'id',
      showSearch: true,
      optionFilterProp: 'label',
      placeholder: '请选择菜谱',
    },
  },
  { field: 'title', label: '标题', component: 'Input', helpMessage: '留空则使用菜谱标题' },
  { field: 'subtitle', label: '副标题', component: 'Input', helpMessage: '留空则使用菜谱副标题' },
  {
    field: 'imageUrl',
    label: '轮播图片',
    component: 'JUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
      text: '上传轮播图',
    },
    helpMessage: '建议尺寸 16:9，留空则使用菜谱封面',
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
