import { GET_CATALOGO_LISTA_EMISORAS_REQUEST, GET_CATALOGO_LISTA_EMISORAS_RECEIVE, GET_CATALOGO_LISTA_EMISORAS_ERROR } from '../actions/actionTypes';

export interface Emisora {
    PrimaryRIC: string;
    Emisora: string;
    CommonName: string;
    RIC: string;
    Serie: string;
    TechRules: string;
}

export interface CatalogoListaEmisorasState {
    loading: boolean;
    catalogoListaEmisorasRespuesta: Emisora[];
    error: string | null;
    message: string;
}

export interface GetCatalogoListaEmisorasRequestPayload {
    message: string;
}

export interface GetCatalogoListaEmisorasReceivePayload {
    catalogoListaEmisorasRespuesta: Emisora[];
}

export interface GetCatalogoListaEmisorasErrorPayload {
    error: string | null;
}

export interface GetCatalogoListaEmisorasRequest {
    type: typeof GET_CATALOGO_LISTA_EMISORAS_REQUEST;
    payload: GetCatalogoListaEmisorasRequestPayload;
}

export interface GetCatalogoListaEmisorasReceive {
    type: typeof GET_CATALOGO_LISTA_EMISORAS_RECEIVE;
    payload: GetCatalogoListaEmisorasReceivePayload;
}

export interface GetCatalogoListaEmisorasError {
    type: typeof GET_CATALOGO_LISTA_EMISORAS_ERROR;
    payload: GetCatalogoListaEmisorasErrorPayload;
}

export type CatalogoListaEmisorasActions = 
| GetCatalogoListaEmisorasRequest
| GetCatalogoListaEmisorasReceive
| GetCatalogoListaEmisorasError;
