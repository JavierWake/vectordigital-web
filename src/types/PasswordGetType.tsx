import { GET_PASSWORDGET_REQUEST, GET_PASSWORDGET_RECEIVE, GET_PASSWORDGET_ERROR, RESET_STATE_PASSWORD } from '../actions/actionTypes';

export interface PasswordGetResponse {
    ierror: number;
    cerror: string;
}

export interface PasswordGetState {
    loading: boolean;
    respuesta: PasswordGetResponse;
    error: string | null;
    message: string;
    params: string[];

}
export interface PasswordGetRequestPayload {
    message: string;
    params: string[];
}

export interface PasswordGetReceivePayload {
    respuesta: PasswordGetResponse;
}

export interface PasswordGetErrorPayload {
    error: string | null;
}

export interface PasswordGetRequest {
    type: typeof GET_PASSWORDGET_REQUEST;
    payload: PasswordGetRequestPayload;
}

export interface PasswordGetReceive {
    type: typeof GET_PASSWORDGET_RECEIVE;
    payload: PasswordGetReceivePayload;
}

export interface PasswordGetError {
    type: typeof GET_PASSWORDGET_ERROR;
    payload: PasswordGetErrorPayload;
}

export interface PasswordResetPayload {
    hacerResetDelEstado: boolean;
}

export interface PasswordReset {
    type: typeof RESET_STATE_PASSWORD;
    payload: PasswordResetPayload;
}

export type PasswordGetActions = 
| PasswordGetRequest
| PasswordGetReceive
| PasswordGetError
| PasswordReset

