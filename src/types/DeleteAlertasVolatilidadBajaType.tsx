import {DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST, DELETE_ALERTAS_VOLATILIDAD_BAJA_RECEIVE, DELETE_ALERTAS_VOLATILIDAD_BAJA_ERROR} from '../actions/actionTypes';

export interface DeleteAlertasVolatilidadBajaResponse {
    ierror: number;
    cerror: string;
}

export interface DeleteAlertasVolatilidadBajaState {
    loading: boolean;
    deleteAlertasVolatilidadBajaRespuesta: DeleteAlertasVolatilidadBajaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface DeleteAlertasVolatilidadBajaRequestPayload {
    message: string;
    params: string[];
}

export interface DeleteAlertasVolatilidadBajaErrorPayload {
    error: string;
}

export interface DeleteAlertasVolatilidadBajaReceivePayload {
    deleteAlertasVolatilidadBajaRespuesta: DeleteAlertasVolatilidadBajaResponse;
}

export interface DeleteAlertasVolatilidadBajaRequest {
    type: typeof DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST;
    payload: DeleteAlertasVolatilidadBajaRequestPayload;
}

export type DeleteAlertasVolatilidadBajaReceive = {
    type: typeof DELETE_ALERTAS_VOLATILIDAD_BAJA_RECEIVE;
    payload: DeleteAlertasVolatilidadBajaReceivePayload;
};

export type DeleteAlertasVolatilidadBajaError = {
    type: typeof DELETE_ALERTAS_VOLATILIDAD_BAJA_ERROR;
    payload: DeleteAlertasVolatilidadBajaErrorPayload;
};

export type DeleteAlertasVolatilidadBajaActions = 
| DeleteAlertasVolatilidadBajaRequest
| DeleteAlertasVolatilidadBajaReceive
| DeleteAlertasVolatilidadBajaError;