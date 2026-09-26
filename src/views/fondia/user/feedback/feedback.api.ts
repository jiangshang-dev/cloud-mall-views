import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/feedback/list',
  queryById = '/sys/fd/feedback/queryById',
  updateStatus = '/sys/fd/feedback/updateStatus',
  delete = '/sys/fd/feedback/delete',
  deleteBatch = '/sys/fd/feedback/deleteBatch',
}

export const getFeedbackList = (params) => defHttp.get({ url: Api.list, params });
export const getFeedbackById = (params) => defHttp.get({ url: Api.queryById, params });
export const updateFeedbackStatus = (params) => defHttp.put({ url: Api.updateStatus, params });
export const deleteFeedback = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteFeedback = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中反馈？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
