import { POST_CELULAR_REQUEST, POST_CELULAR_RECEIVE, POST_CELULAR_ERROR } from '../actions/actionTypes';

export interface PostCelularResponse {
    ierror: number;
    cerror: string;
    url: string;
    estatus: boolean;
}

export interface PostCelularState {
    loading: boolean;
    postCelularRespuesta: PostCelularResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostCelularRequestPayload {
    message: string;
    params: string[];
}

export interface PostCelularReceivePayload {
    postCelularRespuesta: PostCelularResponse;
}

export interface PostCelularErrorPayload {
    error: string | null;
}

export interface PostCelularRequest {
    type: typeof POST_CELULAR_REQUEST;
    payload: PostCelularRequestPayload;
}

export interface PostCelularReceive {
    type: typeof POST_CELULAR_RECEIVE;
    payload: PostCelularReceivePayload;
}

export interface PostCelularError {
    type: typeof POST_CELULAR_ERROR;
    payload: PostCelularErrorPayload;
}

export type PostCelularActions = 
| PostCelularRequest
| PostCelularReceive
| PostCelularError;
