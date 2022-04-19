import { GET_MOVERS_REQUEST, GET_MOVERS_RECEIVE, GET_MOVERS_ERROR } from '../actions/actionTypes';

export interface IMoversData {
    idfiltro: string;
    tendencia: string;
    itemTableLS: string;
    itemLS: string;
    emisora: string;
    serie: string;
    descripcion: string;
    precioactual: number;
    precioInicial: number;
    Precio_Minimo: number;
    Precio_Maximo: number;
    ptjevar: number;
    ptsvar: number;
    hora: string;
    volumen: number;
    operado: number;
    Precio_Compra: number;
    Precio_Venta: number;
} 

export interface MoversState {
    loading: boolean;
    moversList: IMoversData[];
    error: string | null;
    message: string;
    params: string[];
}

export interface GetMoversRequestPayload {
    message: string;
    params: string[];
}

export interface GetMoversReceivePayload {
    moversList: IMoversData[];
}

export interface GetMoversErrorPayload {
    error: string | null;
}

export interface GetMoversRequest {
    type: typeof GET_MOVERS_REQUEST;
    payload: GetMoversRequestPayload;
}

export interface GetMoversReceive {
    type: typeof GET_MOVERS_RECEIVE;
    payload: GetMoversReceivePayload;
}

export interface GetMoversError {
    type: typeof GET_MOVERS_ERROR;
    payload: GetMoversErrorPayload;
}

export type MoversActions = 
| GetMoversRequest
| GetMoversReceive
| GetMoversError;
