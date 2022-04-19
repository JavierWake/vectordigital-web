import { GET_POSTURAS_REQUEST, GET_POSTURAS_RECEIVE, GET_POSTURAS_ERROR } from '../actions/actionTypes';

export interface compra {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface venta {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface compraVol {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface ventaVol {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface perCompra {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface perVenta {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
}

export interface IPosturas {
    compra: compra;
    compraVol: compraVol;
    venta: venta;
    ventaVol: ventaVol;
    perCompra: perCompra;
    perVenta: perVenta;
}

export interface PosturasState {
    loading: boolean;
    posturas: IPosturas;
    error: string | null;
    message: string;
    params: string;
}

export interface GetPosturasReceivePayload {
    posturas: IPosturas;
}

export interface GetPosturasErrorPayload {
    error: string;
}

export interface GetPosturasRequestPayload {
    message: string;
    params: string;
}

export interface GetPosturasRequest {
    type: typeof GET_POSTURAS_REQUEST;
    payload: GetPosturasRequestPayload;
}

export type GetPosturasReceive = {
    type: typeof GET_POSTURAS_RECEIVE;
    payload: GetPosturasReceivePayload;
};

export type GetPosturasError = {
    type: typeof GET_POSTURAS_ERROR;
    payload: GetPosturasErrorPayload;
};

export type PosturasActions = 
| GetPosturasRequest
| GetPosturasReceive
| GetPosturasError;
