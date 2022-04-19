import { GET_HISTORIALEMISORA_REQUEST, GET_HISTORIALEMISORA_RECEIVE, GET_HISTORIALEMISORA_ERROR } from '../actions/actionTypes';

export interface ItdsMovimientos {
    Cuenta: number;
    Emisora: string;
    Serie: string;
    FechaOperacion: string;
    NumProm: string;
    Sucursal: number;
    Descripcion: string;
    Transaccion: number;
    Titulos: number;
    Precio: number;
    Monto: number;
    Comision: number;
    sTitulos: string;
    sPrecio: string;
    sMonto: string;
    sComision: string;
    DescTransaccion: string;
}

export interface IResponse {
    ierror: number;
    cerror: string;
    dsMovimientos: { 
        tdsMovimientos: [
            {
                Cuenta: number;
                Emisora: string;
                Serie: string;
                FechaOperacion: string;
                NumProm: string;
                Sucursal: number;
                Descripcion: string;
                Transaccion: number;
                Titulos: number;
                Precio: number;
                Monto: number;
                Comision: number;
                sTitulos: string;
                sPrecio: string;
                sMonto: string;
                sComision: string;
                DescTransaccion: string;
            }
        ]
    };
}

export interface HistorialEmisoraStatus {
    loading: boolean;
    response: IResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface HistorialEmisoraRequestPayload {
    message: string;
    params: string[];
}

export interface HistorialEmisoraReceivePayload {
    response: IResponse;
}

export interface HistorialEmisoraErrorPayload {
    error: any | null;
}

export interface HistorialEmisoraRequest {
    type: typeof GET_HISTORIALEMISORA_REQUEST;
    payload: HistorialEmisoraRequestPayload;
}

export type HistorialEmisoraReceive = {
    type: typeof GET_HISTORIALEMISORA_RECEIVE;
    payload: HistorialEmisoraReceivePayload;
};

export type HistorialEmisoraError = {
    type: typeof GET_HISTORIALEMISORA_ERROR;
    payload: HistorialEmisoraErrorPayload;
};

export type HistorialEmisoraActions = 
| HistorialEmisoraRequest
| HistorialEmisoraReceive
| HistorialEmisoraError;