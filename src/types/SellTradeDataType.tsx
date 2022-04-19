import { GET_SELL_TRADE_DATA_REQUEST, GET_SELL_TRADE_DATA_RECEIVE, GET_SELL_TRADE_DATA_ERROR } from '../actions/actionTypes';

export interface tdstradedata {
    horariooperacion: string;
    roc: boolean;
    operaFlujos: boolean;
    saldo: number;
    HrInicioBolsa: string;
    HrFinalBolsa: string;
    HrCierreIni: string;
    HrCierreFin: string;
    SelectividadBolsa: boolean;
    pan: number;
}

export interface tdsEmisoras {
    Emisora: string;
    Serie: string;
    Mercado: string;
    Posicion: number;
    EnVenta: number;
    Precio: number;
    PreBiva: number;
    PreSOR: number;
    Lotes: number;
    TitPrestatario: number;
    VarPolitica: string;
    VarPermitida: number;
    MontoMaximo: number;
    Favorita: boolean;
}

export interface ttTipoOrdenes {
    idtipo: number;
    descripcion: string;
    tipodeorden: string;
    aplicabmv: boolean;
    aplicabiva: boolean;
    aplicasor: boolean;
}

export interface SellTradeDataStatus {
    loading: boolean;
    tdstradedata: tdstradedata[];
    tdsEmisoras: tdsEmisoras[];
    ttTipoOrdenes: ttTipoOrdenes[];
    error: string | null;
    message: string;
    params: string[];
}

export interface sellTradeDataReceivePayload {
    tdstradedata: tdstradedata[];
    tdsEmisoras: tdsEmisoras[];
    ttTipoOrdenes: ttTipoOrdenes[];
}

export interface sellTradeDataErrorPayload {
    error: any | null;
}

export interface sellTradeDataRequestPayload {
    message: string;
    params: string[];
}

export interface sellTradeDataRequest {
    type: typeof GET_SELL_TRADE_DATA_REQUEST;
    payload: sellTradeDataRequestPayload;
}

export type sellTradeDataReceive = {
    type: typeof GET_SELL_TRADE_DATA_RECEIVE;
    payload: sellTradeDataReceivePayload;
};

export type sellTradeDataError = {
    type: typeof GET_SELL_TRADE_DATA_ERROR;
    payload: sellTradeDataErrorPayload;
};

export type sellTradeDataActions = 
| sellTradeDataRequest
| sellTradeDataReceive
| sellTradeDataError;