import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/fd/banner/list',
  save = '/sys/fd/banner/add',
  edit = '/sys/fd/banner/edit',
  queryById = '/sys/fd/banner/queryById',
  delete = '/sys/fd/banner/delete',
  deleteBatch = '/sys/fd/banner/deleteBatch',
}

export const getBannerList = (params) => defHttp.get({ url: Api.list, params });
export const getBannerById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateBanner = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteBanner = (params, handleSuccess) =>
  defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
export const batchDeleteBanner = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中轮播图？',
    onOk: () => defHttp.delete({ url: Api.deleteBatch, params }, { joinParamsToUrl: true }).then(handleSuccess),
  });
};
