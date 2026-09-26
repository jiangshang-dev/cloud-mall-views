import { defHttp } from '/@/utils/http/axios';

enum Api {
  getConfig = '/sys/fd/cs/config',
  saveConfig = '/sys/fd/cs/config/save',
}

export const getCsConfig = () => defHttp.get({ url: Api.getConfig });
export const saveCsConfig = (params) => defHttp.post({ url: Api.saveConfig, params });
