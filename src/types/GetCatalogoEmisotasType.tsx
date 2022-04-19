import { GET_CATALOGO_EMISORAS_REQUEST, GET_CATALOGO_EMISORAS_RECEIVE, GET_CATALOGO_EMISORAS_ERROR } from '../actions/actionTypes';

export interface Emisora {
    PrimaryRIC: string;
    Emisora: string;
    CommonName: string;
    RIC: string;
    Serie: string;
    TechRules: string;
}

export interface CatalogoEmisorasState {
    loading: boolean;
    catalogoEmisorasRespuesta: Emisora[];
    error: string | null;
    message: string;
}

export interface GetCatalogoEmisorasRequestPayload {
    message: string;
}

export interface GetCatalogoEmisorasReceivePayload {
    catalogoEmisorasRespuesta: Emisora[];
}

export interface GetCatalogoEmisorasErrorPayload {
    error: string | null;
}

export interface GetCatalogoEmisorasRequest {
    type: typeof GET_CATALOGO_EMISORAS_REQUEST;
    payload: GetCatalogoEmisorasRequestPayload;
}

export interface GetCatalogoEmisorasReceive {
    type: typeof GET_CATALOGO_EMISORAS_RECEIVE;
    payload: GetCatalogoEmisorasReceivePayload;
}

export interface GetCatalogoEmisorasError {
    type: typeof GET_CATALOGO_EMISORAS_ERROR;
    payload: GetCatalogoEmisorasErrorPayload;
}

export type CatalogoEmisorasActions = 
| GetCatalogoEmisorasRequest
| GetCatalogoEmisorasReceive
| GetCatalogoEmisorasError;
