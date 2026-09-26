import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/points/checkinRecord/list',
  queryById = '/sys/fd/points/checkinRecord/queryById',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
