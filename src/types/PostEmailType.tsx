import { POST_EMAIL_REQUEST, POST_EMAIL_RECEIVE, POST_EMAIL_ERROR } from '../actions/actionTypes';

export interface PostEmailResponse {
    ierror: number;
    cerror: string;
    url: string;
    estatus: boolean;
}

export interface PostEmailState {
    loading: boolean;
    postEmailRespuesta: PostEmailResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostEmailRequestPayload {
    message: string;
    params: string[];
}

export interface PostEmailReceivePayload {
    postEmailRespuesta: PostEmailResponse;
}

export interface PostEmailErrorPayload {
    error: string | null;
}

export interface PostEmailRequest {
    type: typeof POST_EMAIL_REQUEST;
    payload: PostEmailRequestPayload;
}

export interface PostEmailReceive {
    type: typeof POST_EMAIL_RECEIVE;
    payload: PostEmailReceivePayload;
}

export interface PostEmailError {
    type: typeof POST_EMAIL_ERROR;
    payload: PostEmailErrorPayload;
}

export type PostEmailActions = 
| PostEmailRequest
| PostEmailReceive
| PostEmailError;
