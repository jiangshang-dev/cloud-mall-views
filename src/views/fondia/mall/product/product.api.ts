import { defHttp } from '/@/utils/http/axios';
enum Api { list='/sys/fd/mall/product/list', save='/sys/fd/mall/product/add', edit='/sys/fd/mall/product/edit', queryById='/sys/fd/mall/product/queryById', delete='/sys/fd/mall/product/delete', updateStatus='/sys/fd/mall/product/updateStatus' }
export const getProductList=(p)=>defHttp.get({url:Api.list,params:p});
export const getProductById=(p)=>defHttp.get({url:Api.queryById,params:p});
export const saveOrUpdateProduct=(p,u)=>defHttp.post({url:u?Api.edit:Api.save,params:p});
export const deleteProduct=(p,h)=>defHttp.delete({url:Api.delete,params:p},{joinParamsToUrl:true}).then(h);
export const updateProductStatus=(p)=>defHttp.put({url:Api.updateStatus,params:p});
