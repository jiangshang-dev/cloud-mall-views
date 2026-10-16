import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/book/author/list',
  save = '/book/author/add',
  edit = '/book/author/edit',
  queryById = '/book/author/queryById',
  delete = '/book/author/delete',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdate = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteOne = (params, handleSuccess) => defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => handleSuccess());
