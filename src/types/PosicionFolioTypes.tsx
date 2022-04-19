import { RESET_STATE_TARJETA_FOLIO, POST_POSICION_FOLIO_REQUEST, POST_POSICION_FOLIO_RECEIVE, POST_POSICION_FOLIO_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: number;
    cerror: string;
}

export interface PosicionFolioState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
}

export interface PosicionFolioReceivePayload {
    response: IResponse;
}

export interface PosicionFolioErrorPayload {
    error: any | null;
}

export interface PosicionFolioRequestPayload {
    message: string;
    params: string[];
}

export interface PosicionFolioResetPayload {
    hacerResetAInitialState: boolean;
}

export interface PosicionFolioRequest {
    type: typeof POST_POSICION_FOLIO_REQUEST;
    payload: PosicionFolioRequestPayload;
}

export type PosicionFolioReceive = {
    type: typeof POST_POSICION_FOLIO_RECEIVE;
    payload: PosicionFolioReceivePayload;
}

export type PosicionFolioError = {
    type: typeof POST_POSICION_FOLIO_ERROR;
    payload: PosicionFolioErrorPayload;
}

export interface PosicionFolioReset {
    type: typeof RESET_STATE_TARJETA_FOLIO;
    payload: PosicionFolioResetPayload;
}

export type PosicionFolioActions = 
| PosicionFolioRequest
| PosicionFolioReceive
| PosicionFolioError
| PosicionFolioReset;