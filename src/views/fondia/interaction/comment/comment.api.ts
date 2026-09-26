import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/comment/list',
  queryById = '/sys/fd/comment/queryById',
  audit = '/sys/fd/comment/audit',
  publish = '/sys/fd/comment/publish',
  hide = '/sys/fd/comment/hide',
  delete = '/sys/fd/comment/delete',
  deleteBatch = '/sys/fd/comment/deleteBatch',
}

export const getCommentList = (params) => defHttp.get({ url: Api.list, params });
export const getCommentById = (params) => defHttp.get({ url: Api.queryById, params });
export const auditComment = (params) => defHttp.put({ url: Api.audit, params });
export const publishComment = (params) => defHttp.put({ url: Api.publish, params });
export const hideComment = (params) => defHttp.put({ url: Api.hide, params });
export const deleteComment = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteComment = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中评论？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
