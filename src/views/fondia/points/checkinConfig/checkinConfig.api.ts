import { defHttp } from '/@/utils/http/axios';
enum Api { list = '/sys/fd/points/checkinConfig/list', save = '/sys/fd/points/checkinConfig/add', edit = '/sys/fd/points/checkinConfig/edit', queryById = '/sys/fd/points/checkinConfig/queryById', delete = '/sys/fd/points/checkinConfig/delete', updateStatus = '/sys/fd/points/checkinConfig/updateStatus' }
export const getConfigList = (params) => defHttp.get({ url: Api.list, params });
export const getConfigById = (params) => defHttp.get({ url: Api.queryById, params });
export const saveOrUpdateConfig = (params, isUpdate) => defHttp.post({ url: isUpdate ? Api.edit : Api.save, params });
export const deleteConfig = (params, handleSuccess) => defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(handleSuccess);
