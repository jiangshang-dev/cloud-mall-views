import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/cs/quickEntry/list',
  save = '/sys/fd/cs/quickEntry/add',
  edit = '/sys/fd/cs/quickEntry/edit',
  delete = '/sys/fd/cs/quickEntry/delete',
}

export const getQuickEntryList = (params) => defHttp.get({ url: Api.list, params });
export const saveOrUpdateQuickEntry = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteQuickEntry = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
