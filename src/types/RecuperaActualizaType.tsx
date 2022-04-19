import { POST_RECUPERA_ACTUALIZA_SEND, POST_RECUPERA_ACTUALIZA_RECEIVE, POST_RECUPERA_ACTUALIZA_ERROR } from '../actions/actionTypes';

export interface respuestaApiAuth{
    ierror: number;
    cerror: string;
}

export interface Recupera_ActualizaState {
    loading: boolean;
    error: string | null; 
    respuesta: respuestaApiAuth;           
    message: string;
    params: string;
}

export interface Recupera_ActualizaSendPayload {
    message: string;
    params: string[];
}

export interface Recupera_ActualizaRecievePayload{
    respuesta: respuestaApiAuth;
}

export interface Recupera_ActualizaErrorPayload {
    error: string;
}

export interface Recupera_ActualizaSend {
    type: typeof POST_RECUPERA_ACTUALIZA_SEND;
    payload: Recupera_ActualizaSendPayload;
}

export type Recupera_ActualizaReceive = {
    type: typeof POST_RECUPERA_ACTUALIZA_RECEIVE;
    payload: Recupera_ActualizaRecievePayload;
};

export type Recupera_ActualizaError = {
    type: typeof POST_RECUPERA_ACTUALIZA_ERROR;
    payload: Recupera_ActualizaErrorPayload;
};

export type Recupera_ActualizaActions = 
| Recupera_ActualizaSend
| Recupera_ActualizaReceive
| Recupera_ActualizaError;



