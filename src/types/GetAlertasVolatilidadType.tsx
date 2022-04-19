import { GET_ALERTAS_VOLATILIDAD_REQUEST, GET_ALERTAS_VOLATILIDAD_RECEIVE, GET_ALERTAS_VOLATILIDAD_ERROR } from '../actions/actionTypes';

export interface TdsTipoAlerta {
    idtipo: string;
    descripcion: string;
}

export interface TdsAlerta {
    emisora: string;
    serie: string;
    descripcion: string;
    idtipo: string;
    tipo: string;
    fecha: string;
    estatus: string;
    precioActual: number;
    limiteinf: number;
    limitesup: number;
}

export interface DsAlertas {
    tdsTipoAlerta: TdsTipoAlerta[];
    tdsAlerta: TdsAlerta[];
}

export interface GetAlertasVolatilidadResponse {
    ierror: number;
    cerror: string;
    dsAlertas: DsAlertas;
}

export interface GetAlertasVolatilidadState {
    loading: boolean;
    getAlertasVolatilidadRespuesta: GetAlertasVolatilidadResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetAlertasVolatilidadRequestPayload {
    message: string;
    params: string[];
}

export interface GetAlertasVolatilidadReceivePayload {
    getAlertasVolatilidadRespuesta: GetAlertasVolatilidadResponse;
}

export interface GetAlertasVolatilidadErrorPayload {
    error: string | null;
}

export interface GetAlertasVolatilidadRequest {
    type: typeof GET_ALERTAS_VOLATILIDAD_REQUEST;
    payload: GetAlertasVolatilidadRequestPayload;
}

export interface GetAlertasVolatilidadReceive {
    type: typeof GET_ALERTAS_VOLATILIDAD_RECEIVE;
    payload: GetAlertasVolatilidadReceivePayload;
}

export interface GetAlertasVolatilidadError {
    type: typeof GET_ALERTAS_VOLATILIDAD_ERROR;
    payload: GetAlertasVolatilidadErrorPayload;
}

export type GetAlertasVolatilidadActions = 
| GetAlertasVolatilidadRequest
| GetAlertasVolatilidadReceive
| GetAlertasVolatilidadError;
