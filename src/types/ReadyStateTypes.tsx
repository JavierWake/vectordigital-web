import { GET_READYSTATE_REQUEST, GET_READYSTATE_RECEIVE, GET_READYSTATE_ERROR } from '../actions/actionTypes';

export interface ReadyState {
    loading: boolean;
    readyStateWs: number;
    error: string | null;
}

export interface GetReadyStateReceivePayload {
    readyStateWs: number;
}

export interface GetReadyStateErrorPayload {
    error: string;
}

export interface GetReadyStateRequest {
    type: typeof GET_READYSTATE_REQUEST;
}

export type GetReadyStateReceive = {
    type: typeof GET_READYSTATE_RECEIVE;
    payload: GetReadyStateReceivePayload;
};

export type GetReadyStateError = {
    type: typeof GET_READYSTATE_ERROR;
    payload: GetReadyStateErrorPayload;
};

export type ReadyStateActions = 
| GetReadyStateRequest
| GetReadyStateReceive
| GetReadyStateError;