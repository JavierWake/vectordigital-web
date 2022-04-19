import { GET_CAP_EMISORA_DETALLE_REQUEST, GET_CAP_EMISORA_DETALLE_RECEIVE, GET_CAP_EMISORA_DETALLE_ERROR } from '../actions/actionTypes';

export interface TtDetalleEmisora {
    Fecha: string;
    Tipo: string;
    Emisora: string;
    Serie: string;
    Hora: number;
    Precio_Actual: number;
    Porcentaje_Var: number;
    Variacion: number;
    Precio_Anterior: number;
    Precio_Maximo: number;
    Precio_Minimo: number;
    volumen_Acumulado: number;
    Numero_Operaciones: number;
    Precio_Compra: number;
    Volumen_Compra: number;
    Precio_Venta: number;
    Volumen_Venta: number;
    LSItem: string;
    EmisoraEncode: string;
}

export interface DsDetalleEmisora {
    ttDetalleEmisora: TtDetalleEmisora[];    
}

export interface GetCapEmisoraDetalleResponse {
    ierror: number;
    cerror: string;
    dsDetalleEmisora: DsDetalleEmisora;
}

export interface GetCapEmisoraDetalleState {
    loading: boolean;
    getCapEmisoraDetalleRespuesta: GetCapEmisoraDetalleResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetCapEmisoraDetalleRequestPayload {
    message: string;
    params: string[];
}

export interface GetCapEmisoraDetalleReceivePayload {
    getCapEmisoraDetalleRespuesta: GetCapEmisoraDetalleResponse;
}

export interface GetCapEmisoraDetalleErrorPayload {
    error: string | null;
}

export interface GetCapEmisoraDetalleRequest {
    type: typeof GET_CAP_EMISORA_DETALLE_REQUEST;
    payload: GetCapEmisoraDetalleRequestPayload;
}

export interface GetCapEmisoraDetalleReceive {
    type: typeof GET_CAP_EMISORA_DETALLE_RECEIVE;
    payload: GetCapEmisoraDetalleReceivePayload;
}

export interface GetCapEmisoraDetalleError {
    type: typeof GET_CAP_EMISORA_DETALLE_ERROR;
    payload: GetCapEmisoraDetalleErrorPayload;
}

export type GetCapEmisoraDetalleActions = 
| GetCapEmisoraDetalleRequest
| GetCapEmisoraDetalleReceive
| GetCapEmisoraDetalleError;
