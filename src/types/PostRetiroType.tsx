import { RESET_STATE, POST_RETIRO_REQUEST, POST_RETIRO_RECEIVE, POST_RETIRO_ERROR } from '../actions/actionTypes';

export interface TdsTrade {
    Folio: number;
    Monto: number;
    Nombre: string;
    Banco: string;
    Chequera: string;
}

export interface DsTrade {
    tdsTrade: TdsTrade[];
}

export interface PostRetiroResponse {
    ierror: number;
    cerror: string;
    dsTrade: DsTrade;
}

export interface PostRetiroState {
    loading: boolean;
    postRetiroRespuesta: PostRetiroResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostRetiroRequestPayload {
    message: string;
    params: string[];
}

export interface PostRetiroReceivePayload {
    postRetiroRespuesta: PostRetiroResponse;
}

export interface PostRetiroErrorPayload {
    error: string | null;
}

export interface PostRetiroResetPayload {
    hacerResetAInitialState: boolean;
}

export interface PostRetiroRequest {
    type: typeof POST_RETIRO_REQUEST;
    payload: PostRetiroRequestPayload;
}

export interface PostRetiroReceive {
    type: typeof POST_RETIRO_RECEIVE;
    payload: PostRetiroReceivePayload;
}

export interface PostRetiroError {
    type: typeof POST_RETIRO_ERROR;
    payload: PostRetiroErrorPayload;
}

export interface PostRetiroReset {
    type: typeof RESET_STATE;
    payload: PostRetiroResetPayload;
}

export type PostRetiroActions = 
| PostRetiroRequest
| PostRetiroReceive
| PostRetiroError
| PostRetiroReset;
