import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/recipe/list',
  save = '/sys/fd/recipe/add',
  edit = '/sys/fd/recipe/edit',
  queryById = '/sys/fd/recipe/queryById',
  delete = '/sys/fd/recipe/delete',
  deleteBatch = '/sys/fd/recipe/deleteBatch',
  updateStatus = '/sys/fd/recipe/updateStatus',
}

export const getRecipeList = (params) => defHttp.get({ url: Api.list, params });
export const getRecipeById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateRecipe = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const updateRecipeStatus = (params) => defHttp.put({ url: Api.updateStatus, params });
export const deleteRecipe = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteRecipe = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中菜谱？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
