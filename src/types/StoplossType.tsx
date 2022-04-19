import { GET_STOPLOSS_REQUEST, GET_STOPLOSS_RECEIVE, GET_STOPLOSS_ERROR } from '../actions/actionTypes';

export interface CatEmisStopLoss {
    Emisora: string;
    Serie: boolean;
    TitDisp: boolean;
    Preciomax: number;
    PrecioIni: string;
    PrecioAct: string;
    VariacionIni: string;
    VariacionMax: string;
}

export interface StopLossStatus {
    loading: boolean;
    CatEmisStopLoss: CatEmisStopLoss[];
    ierror: number | null;
    cerror: string;
    message: string;
    params: string[];
}

export interface stopLossReceivePayload {
    CatEmisStopLoss: CatEmisStopLoss[];
    ierror: number | null;
    cerror: string;
}

export interface stopLossErrorPayload {
    error: any | null;
}

export interface stopLossRequestPayload {
    message: string;
    params: string[];
}

export interface stopLossRequest {
    type: typeof GET_STOPLOSS_REQUEST;
    payload: stopLossRequestPayload;
}

export type stopLossReceive = {
    type: typeof GET_STOPLOSS_RECEIVE;
    payload: stopLossReceivePayload;
};

export type stopLossError = {
    type: typeof GET_STOPLOSS_ERROR;
    payload: stopLossErrorPayload;
};

export type stopLossActions = 
| stopLossRequest
| stopLossReceive
| stopLossError;