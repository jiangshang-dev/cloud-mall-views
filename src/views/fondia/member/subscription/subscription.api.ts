import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/sys/fd/member/subscription/list',
  queryById = '/sys/fd/member/subscription/queryById',
}

export const getList = (params) => defHttp.get({ url: Api.list, params });
export const getById = (params) => defHttp.get({ url: Api.queryById, params });
