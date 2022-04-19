import { RESET_STATE_GET_ORDENES, GET_ORDENES_REQUEST, GET_ORDENES_RECEIVE, GET_ORDENES_ERROR } from '../actions/actionTypes';

export interface tdsOrdenesFd {
    contrato: number;
    numFolio: number;
    estado: string;
    descEstado: string;
    fondo: string;
    tipoTransaccion: string;
    fecha: string;
    FecAplic: string;
    titulos: number;
    monto: number;
}

export interface tdsOrdenesCap {
    contrato: number;
    origen: string;
    cuenta: string;
    folio: string;
    folioMod: string;
    Instruccion: string;
    emisora: string;
    bolsa: string;
    tipoorden: string;
    Fecha: string;
    Hora: string;
    Validez: string;
    titulos: string;
    sTitulos:string;
    precio: string;
    Puja: number;
    ValorPuja: number;
    estatus: string;
    estatusDesc: string;
    TitulosAsign: number;
    PrecioAsign: number;
    monto: number;
    sMonto: string;
    rechazo: string;
    UltimoPrecio: number;
    puedeCancelar: boolean;
}

export interface tdsOrdenesEstado {
    estatusFI: boolean;
    ResponseFI: string;
    estatusCap: boolean;
    ResponseCap: string;
    estatusMD: boolean;
    ResponseMD: string;
}

export interface OrdenesStatus {
    loading: boolean;
    tdsOrdenesFd: tdsOrdenesFd[];
    tdsOrdenesCap: tdsOrdenesCap[];
    tdsOrdenesEstado: tdsOrdenesEstado[];
    error: string | null;
    message: string;
    params: string[];
}

export interface dsOrdenesReceivePayload {
    tdsOrdenesFd: tdsOrdenesFd[];
    tdsOrdenesCap: tdsOrdenesCap[];
    tdsOrdenesEstado: tdsOrdenesEstado[];
}

export interface dsOrdenesErrorPayload {
    error: any | null;
}

export interface dsOrdenesRequestPayload {
    message: string;
    params: string[];
}

export interface dsOrdenesResetPayload {
    hacerResetDelEstado: boolean;
}

export interface dsOrdenesReset {
    type: typeof RESET_STATE_GET_ORDENES;
    payload: dsOrdenesResetPayload;
}

export interface dsOrdenesRequest {
    type: typeof GET_ORDENES_REQUEST;
    payload: dsOrdenesRequestPayload;
}

export type dsOrdenesReceive = {
    type: typeof GET_ORDENES_RECEIVE;
    payload: dsOrdenesReceivePayload;
};

export type dsOrdenesError = {
    type: typeof GET_ORDENES_ERROR;
    payload: dsOrdenesErrorPayload;
};

export type dsOrdenesActions = 
| dsOrdenesRequest
| dsOrdenesReceive
| dsOrdenesError
| dsOrdenesReset;
