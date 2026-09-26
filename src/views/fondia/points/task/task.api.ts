import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/points/task/list',
  save = '/sys/fd/points/task/add',
  edit = '/sys/fd/points/task/edit',
  queryById = '/sys/fd/points/task/queryById',
  delete = '/sys/fd/points/task/delete',
  updateStatus = '/sys/fd/points/task/updateStatus',
}

export const getTaskList = (params) => defHttp.get({ url: Api.list, params });
export const getTaskById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateTask = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteTask = (params, handleSuccess) => defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const updateTaskStatus = (params) => defHttp.put({ url: Api.updateStatus, params });
