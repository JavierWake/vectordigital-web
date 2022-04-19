import { GET_CONFIG_VA_REQUEST, GET_CONFIG_VA_RECEIVE, GET_CONFIG_VA_ERROR } from '../actions/actionTypes';

export interface tdsAnaSuscripcion {
    idcategoria: number;
    categoria: string;
    idtipo: number;
    descripcion: string;
    suscrito: boolean;
    desc: string;
}

export interface ConfigVAStatus {
    loading: boolean;
    ierror: number | null;
    cerror: string;
    fundamental: tdsAnaSuscripcion[];
    economia: tdsAnaSuscripcion[];
    mesaAnalisis: tdsAnaSuscripcion[];
    tecnico: tdsAnaSuscripcion[];
    internacional: tdsAnaSuscripcion[];
    rentaFija: tdsAnaSuscripcion[];
    message: string;
    params: string[];
}

export interface configVAReceivePayload {
    ierror: number;
    cerror: string;
    fundamental: tdsAnaSuscripcion[];
    economia: tdsAnaSuscripcion[];
    mesaAnalisis: tdsAnaSuscripcion[];
    tecnico: tdsAnaSuscripcion[];
    internacional: tdsAnaSuscripcion[];
    rentaFija: tdsAnaSuscripcion[];
}

export interface configVAErrorPayload {
    error: any | null;
}

export interface configVARequestPayload {
    message: string;
    params: string[];
}

export interface configVARequest {
    type: typeof GET_CONFIG_VA_REQUEST;
    payload: configVARequestPayload;
}

export type configVAReceive = {
    type: typeof GET_CONFIG_VA_RECEIVE;
    payload: configVAReceivePayload;
};

export type configVAError = {
    type: typeof GET_CONFIG_VA_ERROR;
    payload: configVAErrorPayload;
};

export type configVAActions = 
| configVARequest
| configVAReceive
| configVAError;