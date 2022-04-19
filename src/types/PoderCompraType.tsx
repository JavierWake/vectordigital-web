import { GET_PODER_COMPRA_REQUEST, GET_PODER_COMPRA_RECEIVE, GET_PODER_COMPRA_ERROR } from '../actions/actionTypes';

export interface tdsSaldo {
    Saldo: number;
    Fecha: string;
    Disclaimer: string;
}

export interface tdsDetalleFlujos {
    Descripcion: string;
    Monto: number;
    Suma: boolean;
}

export interface PoderCompraStatus {
    loading: boolean;
    tdsSaldo: tdsSaldo[];
    tdsDetalleFlujos: tdsDetalleFlujos[];
    error: string | null;
    message: string;
    params: string[];
}

export interface poderCompraReceivePayload {
    tdsSaldo: tdsSaldo[];
    tdsDetalleFlujos: tdsDetalleFlujos[];
}

export interface poderCompraErrorPayload {
    error: any | null;
}

export interface poderCompraRequestPayload {
    message: string;
    params: string[];
}

export interface poderCompraRequest {
    type: typeof GET_PODER_COMPRA_REQUEST;
    payload: poderCompraRequestPayload;
}

export type poderCompraReceive = {
    type: typeof GET_PODER_COMPRA_RECEIVE;
    payload: poderCompraReceivePayload;
};

export type poderCompraError = {
    type: typeof GET_PODER_COMPRA_ERROR;
    payload: poderCompraErrorPayload;
};

export type poderCompraActions =
    | poderCompraRequest
    | poderCompraReceive
    | poderCompraError;
