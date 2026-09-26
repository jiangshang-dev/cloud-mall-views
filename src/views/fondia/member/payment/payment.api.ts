import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/member/payment/list',
  queryById = '/sys/fd/member/payment/queryById',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
