import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/cs/faq/list',
  save = '/sys/fd/cs/faq/add',
  edit = '/sys/fd/cs/faq/edit',
  delete = '/sys/fd/cs/faq/delete',
}

export const getFaqList = (params) => defHttp.get({ url: Api.list, params });
export const saveOrUpdateFaq = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteFaq = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
