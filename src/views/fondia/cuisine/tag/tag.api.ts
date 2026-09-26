import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/recipeTag/list',
  save = '/sys/fd/recipeTag/add',
  edit = '/sys/fd/recipeTag/edit',
  queryById = '/sys/fd/recipeTag/queryById',
  delete = '/sys/fd/recipeTag/delete',
  deleteBatch = '/sys/fd/recipeTag/deleteBatch',
}

export const getTagList = (params) => defHttp.get({ url: Api.list, params });
export const getTagById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateTag = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteTag = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteTag = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中标签？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
