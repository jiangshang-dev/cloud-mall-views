import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/recipeCategory/list',
  tree = '/sys/fd/recipeCategory/tree',
  save = '/sys/fd/recipeCategory/add',
  edit = '/sys/fd/recipeCategory/edit',
  queryById = '/sys/fd/recipeCategory/queryById',
  delete = '/sys/fd/recipeCategory/delete',
  deleteBatch = '/sys/fd/recipeCategory/deleteBatch',
}

export const getCategoryTree = (params) => defHttp.get({ url: Api.tree, params });
export const getCategoryById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateCategory = (params, isUpdate) =>
  defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteCategory = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteCategory = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中分类？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
