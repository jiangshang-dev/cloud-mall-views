import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/book/category/list',
  tree = '/book/category/tree',
  save = '/book/category/add',
  edit = '/book/category/edit',
  queryById = '/book/category/queryById',
  delete = '/book/category/delete',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });

export const listAll = async () => {
  try {
    const data = await defHttp.get({ url: Api.tree }, { errorMessageMode: 'none' });
    if (Array.isArray(data)) {
      return data;
    }
  } catch (error) {
    // 后端未重启时退回分页接口
  }
  const page = await defHttp.get({
    url: Api.list,
    params: { pageNo: 1, pageSize: 1000, column: 'sortNo', order: 'asc' },
  });
  return page?.records || [];
};
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdate = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteOne = (params, handleSuccess) => defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => handleSuccess());
