import { POST_DEPOSITO_REQUEST, POST_DEPOSITO_RECEIVE, POST_DEPOSITO_ERROR } from '../actions/actionTypes';

export interface TdsTrade {
    Folio: number;
    Instruccion: string;
    Monto: number;
    BancoDeposito: string;
    CuentaDeposito: string;
}

export interface DsTrade {
    tdsTrade: TdsTrade[];
}

export interface PostDepositoResponse {
    ierror: number;
    cerror: string;
    dsTrade: DsTrade;
}

export interface PostDepositoState {
    loading: boolean;
    postDepositoRespuesta: PostDepositoResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostDepositoRequestPayload {
    message: string;
    params: string[];
}

export interface PostDepositoReceivePayload {
    postDepositoRespuesta: PostDepositoResponse;
}

export interface PostDepositoErrorPayload {
    error: string | null;
}

export interface PostDepositoRequest {
    type: typeof POST_DEPOSITO_REQUEST;
    payload: PostDepositoRequestPayload;
}

export interface PostDepositoReceive {
    type: typeof POST_DEPOSITO_RECEIVE;
    payload: PostDepositoReceivePayload;
}

export interface PostDepositoError {
    type: typeof POST_DEPOSITO_ERROR;
    payload: PostDepositoErrorPayload;
}

export type PostDepositoActions = 
| PostDepositoRequest
| PostDepositoReceive
| PostDepositoError;
