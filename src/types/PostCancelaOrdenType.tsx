import { RESET_STATE_MODIF_CANCEL_ORDENES, POST_CANCELA_ORDEN_REQUEST, POST_CANCELA_ORDEN_RECEIVE, POST_CANCELA_ORDEN_ERROR } from '../actions/actionTypes';

export interface DsCancelacion {
    tdscancelacion: any[];
}

export interface IResponse {
    ierror: any;
    cerror: string;
    dscancelacion: DsCancelacion;
}

export interface PostCancelaOrdenState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
    data: any;
}

export interface PostCancelaOrdenReceivePayload {
    response: IResponse;
}

export interface PostCancelaOrdenErrorPayload {
    error: any | null;
}

export interface PostCancelaOrdenRequestPayload {
    message: string;
    params: string[];
    data: any;
}

export interface PostCancelaOrdenResetPayload {
    hacerResetAInitialState: boolean;
}

export interface PostCancelaOrdenRequest {
    type: typeof POST_CANCELA_ORDEN_REQUEST;
    payload: PostCancelaOrdenRequestPayload;
};

export type PostCancelaOrdenReceive = {
    type: typeof POST_CANCELA_ORDEN_RECEIVE;
    payload: PostCancelaOrdenReceivePayload;
};

export type PostCancelaOrdenError = {
    type: typeof POST_CANCELA_ORDEN_ERROR;
    payload: PostCancelaOrdenErrorPayload;
};

export interface PostCancelaOrdenReset {
    type: typeof RESET_STATE_MODIF_CANCEL_ORDENES;
    payload: PostCancelaOrdenResetPayload;
};

export type PostCancelaOrdenActions = 
| PostCancelaOrdenRequest
| PostCancelaOrdenReceive
| PostCancelaOrdenError
| PostCancelaOrdenReset;
