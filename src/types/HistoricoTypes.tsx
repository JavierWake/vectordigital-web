import { GET_HISTORICO_REQUEST, GET_HISTORICO_RECEIVE, GET_HISTORICO_ERROR, SEND_PORTAFOLIO_VALUE } from '../actions/actionTypes';

export interface ItdsDwResumen {
    Cuenta: number;
    Temporalidad: string;
    Peridodo: number;
    FechaIni: string;
    FechaFin: string;
    Rend: number;
}

export interface ItdsDwResumenDetalle {
    Fec: string;
    Ten: number;
}

export interface IdsDwResumen {
    tdsDwResumen: ItdsDwResumen[];
    tdsDwResumenDetalle: ItdsDwResumenDetalle[];
}

export interface IS1 {
    dsDwResumen: IdsDwResumen;
}

export interface IM1 {
    dsDwResumen: IdsDwResumen;
}

export interface IM3 {
    dsDwResumen: IdsDwResumen;
}

export interface IA1 {
    dsDwResumen: IdsDwResumen;
}

export interface IA5 {
    dsDwResumen: IdsDwResumen;
}

export interface IA10 {
    dsDwResumen: IdsDwResumen;
}

export interface Idata {
    S1: IS1;
    M1: IM1;
    M3: IM3;
    A1: IA1;
    A5: IA5;
    A10: IA10;
}

export interface IResponse {
    ierror: number;
    cerror: string;
    data: Idata;
}

export interface HistoricoStatus {
    loading: boolean;
    response: IResponse;
    error: string | null;
    message: string;
    params: string[];
    portafolioValue: string;
}

export interface HistoricoReceivePayload {
    response: IResponse;
}

export interface HistoricoErrorPayload {
    error: any | null;
}

export interface HistoricoRequestPayload {
    message: string;
    params: string[];
}

export interface sendPortafolioValuePayload {
    portafolioValue: string;
}

export interface sendPortafolioValue {
    type: typeof SEND_PORTAFOLIO_VALUE;
    payload: sendPortafolioValuePayload;
}

export interface HistoricoRequest {
    type: typeof GET_HISTORICO_REQUEST;
    payload: HistoricoRequestPayload;
}

export type HistoricoReceive = {
    type: typeof GET_HISTORICO_RECEIVE;
    payload: HistoricoReceivePayload;
};

export type HistoricoError = {
    type: typeof GET_HISTORICO_ERROR;
    payload: HistoricoErrorPayload;
};


export type HistoricoActions = 
| HistoricoRequest
| HistoricoReceive
| HistoricoError
| sendPortafolioValue;