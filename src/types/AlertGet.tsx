import { GET_ALERT_REQUEST, GET_ALERT_RECEIVE, GET_ALERT_ERROR } from '../actions/actionTypes';

export interface IAlertGet {
    ticker: string;
    tipo: string;
    vigencia: string;
    frecuencia: string;
    fecha_creada: string;
    estatus: string;
    alert_id: string;
    valor: string;
    tipo_2: string;
    movimient: string;
    min: string;
    max: string;
    precio:string;
}

export interface AlertStatus {
    alertGet: IAlertGet[];
    error: string | null;
    message: string;
    loading: boolean;
}

export interface GetAlertGetReceivePayload {
    alertGet: IAlertGet[];
}

export interface GetAlertGetErrorPayload {
    error: string;
}

export interface GetAlertGetRequest {
    type: typeof GET_ALERT_REQUEST;
    payload: string
}

export type GetAlertGetReceive = {
    type: typeof GET_ALERT_RECEIVE;
    payload: GetAlertGetReceivePayload;
};

export type GetAlertGetError = {
    type: typeof GET_ALERT_ERROR;
    payload: GetAlertGetErrorPayload;
};

export type GetAlertActions = 
| GetAlertGetRequest
| GetAlertGetReceive
| GetAlertGetError;