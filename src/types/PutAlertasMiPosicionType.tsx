import { PUT_ALERTAS_MI_POSICION_REQUEST, PUT_ALERTAS_MI_POSICION_RECEIVE, PUT_ALERTAS_MI_POSICION_ERROR, RESET_STATE_ALERTAS_MI_POSICION } from '../actions/actionTypes';

export interface PutAlertasMiPosicionResponse {
    ierror: number;
    cerror: string;
}

export interface PutAlertasMiPosicionState {
    loading: boolean;
    putAlertasMiPosicionRespuesta: PutAlertasMiPosicionResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutAlertasMiPosicionRequestPayload {
    message: string;
    params: string[];
}

export interface PutAlertasMiPosicionReceivePayload {
    putAlertasMiPosicionRespuesta: PutAlertasMiPosicionResponse;
}

export interface PutAlertasMiPosicionErrorPayload {
    error: string | null;
}

export interface PutAlertasMiPosicionResetPayload {
    hacerReset: boolean;
}

export interface PutAlertasMiPosicionReset {
    type: typeof RESET_STATE_ALERTAS_MI_POSICION;
    payload: PutAlertasMiPosicionResetPayload;
}

export interface PutAlertasMiPosicionRequest {
    type: typeof PUT_ALERTAS_MI_POSICION_REQUEST;
    payload: PutAlertasMiPosicionRequestPayload;
}

export interface PutAlertasMiPosicionReceive {
    type: typeof PUT_ALERTAS_MI_POSICION_RECEIVE;
    payload: PutAlertasMiPosicionReceivePayload;
}

export interface PutAlertasMiPosicionError {
    type: typeof PUT_ALERTAS_MI_POSICION_ERROR;
    payload: PutAlertasMiPosicionErrorPayload;
}

export type PutAlertasMiPosicionActions = 
| PutAlertasMiPosicionRequest
| PutAlertasMiPosicionReceive
| PutAlertasMiPosicionError
| PutAlertasMiPosicionReset;
