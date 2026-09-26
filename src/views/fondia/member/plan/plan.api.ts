import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/member/plan/list',
  save = '/sys/fd/member/plan/add',
  edit = '/sys/fd/member/plan/edit',
  queryById = '/sys/fd/member/plan/queryById',
  delete = '/sys/fd/member/plan/delete',
  deleteBatch = '/sys/fd/member/plan/deleteBatch',
  updateStatus = '/sys/fd/member/plan/updateStatus',
}

export const getPlanList = (params) => defHttp.get({ url: Api.list, params });
export const getPlanById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdatePlan = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deletePlan = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const updatePlanStatus = (params) => defHttp.put({ url: Api.updateStatus, params });
