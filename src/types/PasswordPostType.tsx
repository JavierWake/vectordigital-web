import { POST_PASSWORDPOST_SEND, POST_PASSWORDPOST_RECEIVE, POST_PASSWORDPOST_ERROR } from '../actions/actionTypes';

export interface respuestaApiPasswPost{
    ierror: number;
    cerror: string;
}

export interface PasswordPostState {
    loading: boolean;
    error: string | null; 
    respuesta: respuestaApiPasswPost;           
    message: string;
    params: string;
}

export interface PasswordPostSendPayload {
    message: string;
    params: string[];
}

export interface PasswordPostRecievePayload{
    respuesta: respuestaApiPasswPost;
}

export interface PasswordPostErrorPayload {
    error: string;
}

export interface PasswordPostSend {
    type: typeof POST_PASSWORDPOST_SEND;
    payload: PasswordPostSendPayload;
}

export type PasswordPostReceive = {
    type: typeof POST_PASSWORDPOST_RECEIVE;
    payload: PasswordPostRecievePayload;
};

export type PasswordPostError = {
    type: typeof POST_PASSWORDPOST_ERROR;
    payload: PasswordPostErrorPayload;
};

export type PasswordPostActions = 
| PasswordPostSend
| PasswordPostReceive
| PasswordPostError;



