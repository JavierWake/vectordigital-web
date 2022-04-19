import { RESET_STATE, GET_RETIRO_INFO_REQUEST, GET_RETIRO_INFO_RECEIVE, GET_RETIRO_INFO_ERROR } from '../actions/actionTypes';

export interface TdsTradeData {
    SaldoActual: number;
    SaldoCapCpa: number;
    saldo: number;
    hroperacion: string;
    tieneFlujos: boolean;
}

export interface TdsChequeras {
    titular: number;
    titularNombre: string;
    banco: string;
    chequera: string;
}

export interface DsTradeData {
    tdsTradeData: TdsTradeData[];
    tdsChequeras: TdsChequeras[];
}

export interface RetiroInfoResponse {
    ierror: number;
    cerror: string;
    dsTradeData: DsTradeData;
}

export interface GetRetiroInfoState {
    loading: boolean;
    retiroInfoRespuesta: RetiroInfoResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetRetiroInfoRequestPayload {
    message: string;
    params: string[];
}

export interface GetRetiroInfoReceivePayload {
    retiroInfoRespuesta: RetiroInfoResponse;
}

export interface GetRetiroInfoErrorPayload {
    error: string | null;
}

export interface GetRetiroInfoResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetRetiroInfoRequest {
    type: typeof GET_RETIRO_INFO_REQUEST;
    payload: GetRetiroInfoRequestPayload;
}

export interface GetRetiroInfoReceive {
    type: typeof GET_RETIRO_INFO_RECEIVE;
    payload: GetRetiroInfoReceivePayload;
}

export interface GetRetiroInfoError {
    type: typeof GET_RETIRO_INFO_ERROR;
    payload: GetRetiroInfoErrorPayload;
}

export interface GetRetiroInfoReset {
    type: typeof RESET_STATE;
    payload: GetRetiroInfoResetPayload;
}

export type GetRetiroInfoActions = 
| GetRetiroInfoRequest
| GetRetiroInfoReceive
| GetRetiroInfoError
| GetRetiroInfoReset;
