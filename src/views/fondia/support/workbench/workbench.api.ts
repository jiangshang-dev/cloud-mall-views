import { defHttp } from '/@/utils/http/axios';

enum Api {
  sessionList = '/sys/fd/cs/session/list',
  accept = '/sys/fd/cs/session/accept',
  close = '/sys/fd/cs/session/close',
  messages = '/sys/fd/cs/session/messages',
  sendMessage = '/sys/fd/cs/session/sendMessage',
}

export const getSessionList = (params) => defHttp.get({ url: Api.sessionList, params });
export const acceptSession = (params) => defHttp.post({ url: Api.accept, params }, { joinParamsToUrl: true });
export const closeSession = (params) => defHttp.post({ url: Api.close, params }, { joinParamsToUrl: true });
export const getSessionMessages = (params) => defHttp.get({ url: Api.messages, params });
export const sendSessionMessage = (sessionId: string, content: string) =>
  defHttp.post({ url: `${Api.sendMessage}?sessionId=${encodeURIComponent(sessionId)}`, data: { content } });
