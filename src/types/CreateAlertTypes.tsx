import { PUT_ALERT_REQUEST_VARIACION, PUT_ALERT_REQUEST_PRECIO, PUT_ALERT_REQUEST_RANGO, PUT_ALERT_REQUEST_NOTICIA, PUT_ALERT_RECEIVE, PUT_ALERT_ERROR } from '../actions/actionTypes';

export interface IAlert {
    tipo: any;
    ticker: any;
    vigencia:any;
    frecuencia: any;
    fecha_creada: any;
    valor?: any;
    tipo_v?: any;
    movimiento?: any;
    min?: any;
    max?: any;
    precio?: any;
}

export interface CreateAlertState {
    loading: boolean;
    error: string | null;
    message: string;
    params: IAlert[];
}

export interface CreateAlertRequestPayload {
    message: string;
    params: IAlert[];
}

export interface CreateAlertErrorPayload {
    error: string;
}

export interface CreateAlertRequestVariacion {
    type: typeof PUT_ALERT_REQUEST_VARIACION;
    payload: CreateAlertRequestPayload;
}

export interface CreateAlertRequestPrecio {
    type: typeof PUT_ALERT_REQUEST_PRECIO;
    payload: CreateAlertRequestPayload;
}

export interface CreateAlertRequestRango {
    type: typeof PUT_ALERT_REQUEST_RANGO;
    payload: CreateAlertRequestPayload;
}

export interface CreateAlertRequestNoticia {
    type: typeof PUT_ALERT_REQUEST_NOTICIA;
    payload: CreateAlertRequestPayload;
}

export type CreateAlertReceive = {
    type: typeof PUT_ALERT_RECEIVE;
};

export type CreateAlertError = {
    type: typeof PUT_ALERT_ERROR;
    payload: CreateAlertErrorPayload;
};

export type CreateAlertActions = 
| CreateAlertRequestVariacion
| CreateAlertRequestPrecio
| CreateAlertRequestRango
| CreateAlertRequestNoticia
| CreateAlertReceive
| CreateAlertError;