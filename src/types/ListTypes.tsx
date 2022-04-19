import { LIST_API_REQUEST, LIST_API_RECEIVE, LIST_API_ERROR, LIST_API_RESET } from '../actions/actionTypes';

export interface IEmisoras {
    techRules: string;
    consolidadoP: string;
    name: string;
    serie: string;
    bivap: string;
    bmv: string;
    bmvP: string;
    biva: string;
    ric: string;
    consolidado: string;
    emisora: string;
}

export interface IList {
    list_name: string;
    list_id: string;
    list_size: string;
    vector: boolean;
    ultima: boolean;
    emisoras?: IEmisoras[];
}

export interface ListState {
    loading: boolean;
    list: IList[];
    error: string | null;
    message: string;
    id: any;
}

export interface GetListRequestPayload {
    message: string;
    id: any;
}

export interface GetListReceivePayload {
    list: IList[];
}

export interface GetListErrorPayload {
    error: string;
}

export interface GetListResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetListRequest {
    type: typeof LIST_API_REQUEST;
    payload: GetListRequestPayload;
}

export type GetReceiveList = {
    type: typeof LIST_API_RECEIVE;
    payload: GetListReceivePayload;
};

export type GetListError = {
    type: typeof LIST_API_ERROR;
    payload: GetListErrorPayload;
};

export interface GetListReset {
    type: typeof LIST_API_RESET;
    payload: GetListResetPayload;
}

export type ListActions = 
| GetListRequest
| GetReceiveList
| GetListReset
| GetListError;