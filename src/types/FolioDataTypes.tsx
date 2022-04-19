import { RESET_STATE_TARJETA_FOLIO, GET_FOLIO_REQUEST, GET_FOLIO_RECEIVE, GET_FOLIO_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: number;
    cerror: string;
    folio: number;
    posicion: number;
}

export interface FolioDataState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
}

export interface FolioDataReceivePayload {
    response: IResponse;
}

export interface FolioDataErrorPayload {
    error: any | null;
}

export interface FolioDataRequestPayload {
    message: string;
    params: string[];
}

export interface FolioDataResetPayload {
    hacerResetAInitialState: boolean;
}

export interface FolioDataRequest {
    type: typeof GET_FOLIO_REQUEST;
    payload: FolioDataRequestPayload;
}

export type FolioDataReceive = {
    type: typeof GET_FOLIO_RECEIVE;
    payload: FolioDataReceivePayload;
}

export type FolioDataError = {
    type: typeof GET_FOLIO_ERROR;
    payload: FolioDataErrorPayload;
}

export interface FolioDataReset {
    type: typeof RESET_STATE_TARJETA_FOLIO;
    payload: FolioDataResetPayload;
}

export type FolioDataActions = 
| FolioDataRequest
| FolioDataReceive
| FolioDataError
| FolioDataReset;