import { GET_BUY_TRADE_DATA_REQUEST, GET_BUY_TRADE_DATA_RECEIVE, GET_BUY_TRADE_DATA_ERROR } from '../actions/actionTypes';

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

export interface BuyTradeDataStatus {
    loading: boolean;
    errorNumApi: number;
    errorTextoApi: string;
    tdstradedata: tdstradedata[];
    tdsEmisoras: tdsEmisoras[];
    ttTipoOrdenes: ttTipoOrdenes[];
    error: string | null;
    message: string;
    params: string[];
}

export interface buyTradeDataReceivePayload {
    errorNumApi: number;
    errorTextoApi: string;
    tdstradedata: tdstradedata[];
    tdsEmisoras: tdsEmisoras[];
    ttTipoOrdenes: ttTipoOrdenes[];
}

export interface buyTradeDataErrorPayload {
    error: any | null;
}

export interface buyTradeDataRequestPayload {
    message: string;
    params: string[];
}

export interface buyTradeDataRequest {
    type: typeof GET_BUY_TRADE_DATA_REQUEST;
    payload: buyTradeDataRequestPayload;
}

export type buyTradeDataReceive = {
    type: typeof GET_BUY_TRADE_DATA_RECEIVE;
    payload: buyTradeDataReceivePayload;
};

export type buyTradeDataError = {
    type: typeof GET_BUY_TRADE_DATA_ERROR;
    payload: buyTradeDataErrorPayload;
};

export type buyTradeDataActions = 
| buyTradeDataRequest
| buyTradeDataReceive
| buyTradeDataError;