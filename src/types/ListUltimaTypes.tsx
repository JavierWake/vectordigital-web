import { PUT_LIST_ULTIMA_REQUEST, PUT_LIST_ULTIMA_RECEIVE, PUT_LIST_ULTIMA_ERROR } from '../actions/actionTypes';

export interface ListUltimaState {
    loading: boolean;
    error: string | null;
    message: string;
    response: {
        id: number;
        message: string;
    }
    id: any;
}

export interface PutListUltimaRequestPayload {
    message: string;
    id: any;
}

export interface PutListUltimaReceivePayload {
    response: {
        id: number;
        message: string;
    }
}

export interface PutListUltimaErrorPayload {
    error: string;
}

export interface PutListUltimaRequest {
    type: typeof PUT_LIST_ULTIMA_REQUEST;
    payload: PutListUltimaRequestPayload;
}

export type PutListUltimaReceive = {
    type: typeof PUT_LIST_ULTIMA_RECEIVE;
    payload: PutListUltimaReceivePayload;
};

export type PutListUltimaError = {
    type: typeof PUT_LIST_ULTIMA_ERROR;
    payload: PutListUltimaErrorPayload;
};

export type ListUltimaActions = 
| PutListUltimaRequest
| PutListUltimaReceive
| PutListUltimaError;