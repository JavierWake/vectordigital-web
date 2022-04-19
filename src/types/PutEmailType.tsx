import { PUT_EMAIL_REQUEST, PUT_EMAIL_RECEIVE, PUT_EMAIL_ERROR } from '../actions/actionTypes';

export interface PutEmailResponse {
    ierror: number;
    cerror: string;
}

export interface PutEmailState {
    loading: boolean;
    putEmailRespuesta: PutEmailResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutEmailRequestPayload {
    message: string;
    params: string[];
}

export interface PutEmailReceivePayload {
    putEmailRespuesta: PutEmailResponse;
}

export interface PutEmailErrorPayload {
    error: string | null;
}

export interface PutEmailRequest {
    type: typeof PUT_EMAIL_REQUEST;
    payload: PutEmailRequestPayload;
}

export interface PutEmailReceive {
    type: typeof PUT_EMAIL_RECEIVE;
    payload: PutEmailReceivePayload;
}

export interface PutEmailError {
    type: typeof PUT_EMAIL_ERROR;
    payload: PutEmailErrorPayload;
}

export type PutEmailActions = 
| PutEmailRequest
| PutEmailReceive
| PutEmailError;
