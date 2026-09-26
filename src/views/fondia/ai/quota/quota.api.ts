import { defHttp } from '/@/utils/http/axios';

enum Api {
  summary = '/sys/fd/ai/quota/summary',
  saveFree = '/sys/fd/ai/quota/saveFree',
  savePlans = '/sys/fd/ai/quota/savePlans',
}

export const getQuotaSummary = (params?) => defHttp.get({ url: Api.summary, params });
export const saveFreeQuota = (params) => defHttp.post({ url: Api.saveFree, params });
export const savePlanQuotas = (params) => defHttp.post({ url: Api.savePlans, params });
