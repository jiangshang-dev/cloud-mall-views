import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/book/rank/list',
  save = '/book/rank/add',
  edit = '/book/rank/edit',
  queryById = '/book/rank/queryById',
  delete = '/book/rank/delete',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdate = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteOne = (params, handleSuccess) => defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => handleSuccess());
