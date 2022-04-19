import { GET_ALERTAS_EVENTO_REQUEST, GET_ALERTAS_EVENTO_RECEIVE, GET_ALERTAS_EVENTO_ERROR } from '../actions/actionTypes';

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

export interface GetAlertasEventoResponse {
    ierror: number;
    cerror: string;
    dsAlertas: DsAlertas;
}

export interface GetAlertasEventoState {
    loading: boolean;
    getAlertasEventoRespuesta: GetAlertasEventoResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetAlertasEventoRequestPayload {
    message: string;
    params: string[];
}

export interface GetAlertasEventoReceivePayload {
    getAlertasEventoRespuesta: GetAlertasEventoResponse;
}

export interface GetAlertasEventoErrorPayload {
    error: string | null;
}

export interface GetAlertasEventoRequest {
    type: typeof GET_ALERTAS_EVENTO_REQUEST;
    payload: GetAlertasEventoRequestPayload;
}

export interface GetAlertasEventoReceive {
    type: typeof GET_ALERTAS_EVENTO_RECEIVE;
    payload: GetAlertasEventoReceivePayload;
}

export interface GetAlertasEventoError {
    type: typeof GET_ALERTAS_EVENTO_ERROR;
    payload: GetAlertasEventoErrorPayload;
}

export type GetAlertasEventoActions = 
| GetAlertasEventoRequest
| GetAlertasEventoReceive
| GetAlertasEventoError;
