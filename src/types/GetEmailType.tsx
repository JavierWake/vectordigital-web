import { GET_EMAIL_REQUEST, GET_EMAIL_RECEIVE, GET_EMAIL_ERROR } from '../actions/actionTypes';

export interface GetEmailResponse {
    ierror: number;
    cerror: string;
    estatus: string;
    email: string;
}

export interface GetEmailState {
    loading: boolean;
    getEmailRespuesta: GetEmailResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetEmailRequestPayload {
    message: string;
    params: string[];
}

export interface GetEmailReceivePayload {
    getEmailRespuesta: GetEmailResponse;
}

export interface GetEmailErrorPayload {
    error: string | null;
}

export interface GetEmailRequest {
    type: typeof GET_EMAIL_REQUEST;
    payload: GetEmailRequestPayload;
}

export interface GetEmailReceive {
    type: typeof GET_EMAIL_RECEIVE;
    payload: GetEmailReceivePayload;
}

export interface GetEmailError {
    type: typeof GET_EMAIL_ERROR;
    payload: GetEmailErrorPayload;
}

export type GetEmailActions = 
| GetEmailRequest
| GetEmailReceive
| GetEmailError;
