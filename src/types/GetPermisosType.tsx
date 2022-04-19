import { GET_PERMISOS_REQUEST, GET_PERMISOS_RECEIVE, GET_PERMISOS_ERROR, GET_PERMISOS_RESET } from '../actions/actionTypes';

export interface TtServicios {
    ServicioId: number;
    Tipo: number;
    Servicio: string;
    Activo: boolean;
    Editable: boolean;
    FechaCrea: string | null;
    Absorbe: boolean;
    FechaHora: string | null;
}

export interface DsServicios {
    ttServicios: TtServicios[];
}

export interface GetPermisosResponse {
    ierror: number;
    cerror: string;
    dsServicios: DsServicios;
}

export interface GetPermisosState {
    loading: boolean;
    getPermisosRespuesta: GetPermisosResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetPermisosRequestPayload {
    message: string;
    params: string[];
}

export interface GetPermisosReceivePayload {
    getPermisosRespuesta: GetPermisosResponse;
}

export interface GetPermisosErrorPayload {
    error: string | null;
}

export interface GetPermisosResetPayload {
    hacerReset: boolean;
}

export interface GetPermisosReset {
    type: typeof GET_PERMISOS_RESET;
    payload: GetPermisosResetPayload;
}

export interface GetPermisosRequest {
    type: typeof GET_PERMISOS_REQUEST;
    payload: GetPermisosRequestPayload;
}

export interface GetPermisosReceive {
    type: typeof GET_PERMISOS_RECEIVE;
    payload: GetPermisosReceivePayload;
}

export interface GetPermisosError {
    type: typeof GET_PERMISOS_ERROR;
    payload: GetPermisosErrorPayload;
}

export type GetPermisosActions = 
| GetPermisosRequest
| GetPermisosReceive
| GetPermisosError
| GetPermisosReset;
