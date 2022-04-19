import { GET_HECHOS_REQUEST, GET_HECHOS_RECEIVE, GET_HECHOS_ERROR } from '../actions/actionTypes';

export interface tdsPosturas {
    Hora: number;
    HoraPostura: string;
    Folio: number;
    Compra: string;
    Vende: string;
    Precio: number;
    Volumen: number;
    Importe: number;
    Exchange: string;
}

export interface HechosStatus {
    loading: boolean;
    tdsPosturas: tdsPosturas[];
    error: string | null;
    message: string;
    params: string[];
}

export interface hechosReceivePayload {
    tdsPosturas: tdsPosturas[];
}

export interface hechosErrorPayload {
    error: any | null;
}

export interface hechosRequestPayload {
    message: string;
    params: string[];
}

export interface hechosRequest {
    type: typeof GET_HECHOS_REQUEST;
    payload: hechosRequestPayload;
}

export type hechosReceive = {
    type: typeof GET_HECHOS_RECEIVE;
    payload: hechosReceivePayload;
};

export type hechosError = {
    type: typeof GET_HECHOS_ERROR;
    payload: hechosErrorPayload;
};

export type hechosActions =
    | hechosRequest
    | hechosReceive
    | hechosError;