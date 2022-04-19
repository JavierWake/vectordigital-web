import { POST_RECUPERA_VALIDA_SEND, POST_RECUPERA_VALIDA_RECEIVE, POST_RECUPERA_VALIDA_ERROR } from '../actions/actionTypes';

export interface respuestaApiAuth{
    ierror: number;
    cerror: string;
}

export interface Recupera_ValidaState {
    loading: boolean;
    error: string | null; 
    respuesta: respuestaApiAuth;           
    message: string;
    params: string;
}

export interface Recupera_ValidaSendPayload {
    message: string;
    params: string[];
}

export interface Recupera_ValidaRecievePayload{
    respuesta: respuestaApiAuth;
}

export interface Recupera_ValidaErrorPayload {
    error: string;
}

export interface Recupera_ValidaSend {
    type: typeof POST_RECUPERA_VALIDA_SEND;
    payload: Recupera_ValidaSendPayload;
}

export type Recupera_ValidaReceive = {
    type: typeof POST_RECUPERA_VALIDA_RECEIVE;
    payload: Recupera_ValidaRecievePayload;
};

export type Recupera_ValidaError = {
    type: typeof POST_RECUPERA_VALIDA_ERROR;
    payload: Recupera_ValidaErrorPayload;
};

export type Recupera_ValidaActions = 
| Recupera_ValidaSend
| Recupera_ValidaReceive
| Recupera_ValidaError;



