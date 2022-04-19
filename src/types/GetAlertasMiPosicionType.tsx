import { GET_ALERTAS_MI_POSICION_REQUEST, GET_ALERTAS_MI_POSICION_RECEIVE, GET_ALERTAS_MI_POSICION_ERROR, RESET_STATE_ALERTAS_MI_POSICION } from '../actions/actionTypes';

export interface TdsPreferencias {
    Id: number;
    Activo: boolean;
    Detalle: any;
}

export interface DsPreferencias {
    tdsPreferencias: TdsPreferencias[];
}

export interface GetAlertasMiPosicionResponse {
    ierror: number;
    cerror: string;
    dsPreferencias: DsPreferencias;
}

export interface GetAlertasMiPosicionState {
    loading: boolean;
    getAlertasMiPosicionRespuesta: GetAlertasMiPosicionResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetAlertasMiPosicionRequestPayload {
    message: string;
    params: string[];
}

export interface GetAlertasMiPosicionReceivePayload {
    getAlertasMiPosicionRespuesta: GetAlertasMiPosicionResponse;
}

export interface GetAlertasMiPosicionErrorPayload {
    error: string | null;
}

export interface GetAlertasMiPosicionResetPayload {
    hacerReset: boolean;
}

export interface GetAlertasMiPosicionReset {
    type: typeof RESET_STATE_ALERTAS_MI_POSICION;
    payload: GetAlertasMiPosicionResetPayload;
}

export interface GetAlertasMiPosicionRequest {
    type: typeof GET_ALERTAS_MI_POSICION_REQUEST;
    payload: GetAlertasMiPosicionRequestPayload;
}

export interface GetAlertasMiPosicionReceive {
    type: typeof GET_ALERTAS_MI_POSICION_RECEIVE;
    payload: GetAlertasMiPosicionReceivePayload;
}

export interface GetAlertasMiPosicionError {
    type: typeof GET_ALERTAS_MI_POSICION_ERROR;
    payload: GetAlertasMiPosicionErrorPayload;
}

export type GetAlertasMiPosicionActions = 
| GetAlertasMiPosicionRequest
| GetAlertasMiPosicionReceive
| GetAlertasMiPosicionError
| GetAlertasMiPosicionReset;
