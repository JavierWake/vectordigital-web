import {DELETE_ALERTAS_EVENTO_BAJA_REQUEST, DELETE_ALERTAS_EVENTO_BAJA_RECEIVE, DELETE_ALERTAS_EVENTO_BAJA_ERROR} from '../actions/actionTypes';

export interface DeleteAlertasEventoBajaResponse {
    ierror: number;
    cerror: string;
}

export interface DeleteAlertasEventoBajaState {
    loading: boolean;
    deleteAlertasEventoBajaRespuesta: DeleteAlertasEventoBajaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface DeleteAlertasEventoBajaRequestPayload {
    message: string;
    params: string[];
}

export interface DeleteAlertasEventoBajaErrorPayload {
    error: string;
}

export interface DeleteAlertasEventoBajaReceivePayload {
    deleteAlertasEventoBajaRespuesta: DeleteAlertasEventoBajaResponse;
}

export interface DeleteAlertasEventoBajaRequest {
    type: typeof DELETE_ALERTAS_EVENTO_BAJA_REQUEST;
    payload: DeleteAlertasEventoBajaRequestPayload;
}

export type DeleteAlertasEventoBajaReceive = {
    type: typeof DELETE_ALERTAS_EVENTO_BAJA_RECEIVE;
    payload: DeleteAlertasEventoBajaReceivePayload;
};

export type DeleteAlertasEventoBajaError = {
    type: typeof DELETE_ALERTAS_EVENTO_BAJA_ERROR;
    payload: DeleteAlertasEventoBajaErrorPayload;
};

export type DeleteAlertasEventoBajaActions = 
| DeleteAlertasEventoBajaRequest
| DeleteAlertasEventoBajaReceive
| DeleteAlertasEventoBajaError;