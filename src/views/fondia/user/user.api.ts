import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/user/list',
  edit = '/sys/fd/user/edit',
  queryById = '/sys/fd/user/queryById',
  delete = '/sys/fd/user/delete',
  deleteBatch = '/sys/fd/user/deleteBatch',
  updateStatus = '/sys/fd/user/updateStatus',
}

export const getUserList = (params) => defHttp.get({ url: Api.list, params });

export const getUserById = (params) => defHttp.get({ url: Api.queryById, params });

export const saveOrUpdateUser = (params) => defHttp.post({ url: Api.edit, params });

export const updateUserStatus = (params) => defHttp.put({ url: Api.updateStatus, params });

export const deleteUser = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);

export const batchDeleteUser = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中用户？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
