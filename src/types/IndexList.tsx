import { LIST_INDEX_REQUEST, LIST_INDEX_RECEIVE, LIST_INDEX_ERROR } from '../actions/actionTypes';

export interface IEmisorasIndex {
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


export interface IListIndex {
    list_name: string;
    list_id: string;
    list_size: string;
    emisoras: IEmisorasIndex[];
}


export interface ListIndexState {
    loading: boolean;
    listIndex: IListIndex[];
    error: string | null;
    message: string;
}

export interface GetListIndexRequestPayload {
    message: string;
}

export interface GetListIndexReceivePayload {
    listIndex: IListIndex[];
}

export interface GetListIndexErrorPayload {
    error: string | null;
}

export interface GetListIndexRequest {
    type: typeof LIST_INDEX_REQUEST;
    payload: GetListIndexRequestPayload;
}

export interface GetListIndexReceive {
    type: typeof LIST_INDEX_RECEIVE;
    payload: GetListIndexReceivePayload;
}

export interface GetListIndexError {
    type: typeof LIST_INDEX_ERROR;
    payload: GetListIndexErrorPayload;
}

export type ListIndexActions = 
| GetListIndexRequest
| GetListIndexReceive
| GetListIndexError;