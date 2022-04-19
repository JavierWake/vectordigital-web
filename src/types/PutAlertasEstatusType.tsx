import { PUT_ALERTAS_ESTATUS_REQUEST, PUT_ALERTAS_ESTATUS_RECEIVE, PUT_ALERTAS_ESTATUS_ERROR } from '../actions/actionTypes';

export interface PutAlertasEstatusResponse {
    ierror: number;
    cerror: string;
}

export interface PutAlertasEstatusState {
    loading: boolean;
    putAlertasEstatusRespuesta: PutAlertasEstatusResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutAlertasEstatusRequestPayload {
    message: string;
    params: string[];
}

export interface PutAlertasEstatusReceivePayload {
    putAlertasEstatusRespuesta: PutAlertasEstatusResponse;
}

export interface PutAlertasEstatusErrorPayload {
    error: string | null;
}

export interface PutAlertasEstatusRequest {
    type: typeof PUT_ALERTAS_ESTATUS_REQUEST;
    payload: PutAlertasEstatusRequestPayload;
}

export interface PutAlertasEstatusReceive {
    type: typeof PUT_ALERTAS_ESTATUS_RECEIVE;
    payload: PutAlertasEstatusReceivePayload;
}

export interface PutAlertasEstatusError {
    type: typeof PUT_ALERTAS_ESTATUS_ERROR;
    payload: PutAlertasEstatusErrorPayload;
}

export type PutAlertasEstatusActions = 
| PutAlertasEstatusRequest
| PutAlertasEstatusReceive
| PutAlertasEstatusError;
