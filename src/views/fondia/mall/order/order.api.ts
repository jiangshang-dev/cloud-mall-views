import { defHttp } from '/@/utils/http/axios';
enum Api { list='/sys/fd/mall/order/list', queryById='/sys/fd/mall/order/queryById', ship='/sys/fd/mall/order/ship' }
export const getOrderList=(p)=>defHttp.get({url:Api.list,params:p});
export const getOrderById=(p)=>defHttp.get({url:Api.queryById,params:p});
export const shipOrder=(p)=>defHttp.put({url:Api.ship,params:p});
