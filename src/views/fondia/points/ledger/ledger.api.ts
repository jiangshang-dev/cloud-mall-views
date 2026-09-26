import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/points/ledger/list',
  queryById = '/sys/fd/points/ledger/queryById',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
