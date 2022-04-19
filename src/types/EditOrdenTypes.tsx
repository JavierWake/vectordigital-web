import { RESET_STATE_MODIF_CANCEL_ORDENES, POST_ORDEN_REQUEST, POST_ORDEN_RECEIVE, POST_ORDEN_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: any;
    cerror: string;
    dsmodificacion: {
        tdsmodificacion: any;
    }
}

export interface EditOrdenState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse
}

export interface EditOrdenReceivePayload {
    response: IResponse;
}

export interface EditOrdenErrorPayload {
    error: any | null;
}

export interface EditOrdenRequestPayload {
    message: string;
    params: string[];
}

export interface EditOrdenResetPayload {
    hacerResetAInitialState: boolean;
}

export interface EditOrdenRequest {
    type: typeof POST_ORDEN_REQUEST;
    payload: EditOrdenRequestPayload;
}

export type EditOrdenReceive = {
    type: typeof POST_ORDEN_RECEIVE;
    payload: EditOrdenReceivePayload;
};

export type EditOrdenError = {
    type: typeof POST_ORDEN_ERROR;
    payload: EditOrdenErrorPayload;
};

export interface EditOrdenReset {
    type: typeof RESET_STATE_MODIF_CANCEL_ORDENES;
    payload: EditOrdenResetPayload;
};

export type EditOrdenActions = 
| EditOrdenRequest
| EditOrdenReceive
| EditOrdenError
| EditOrdenReset;
