import { PUT_SERVICIOS_REQUEST, PUT_SERVICIOS_RECEIVE, PUT_SERVICIOS_ERROR } from '../actions/actionTypes';
 
export interface IResponse {
    ierror: number;
    cerror: string;
}

export interface ItdsServicios {
    IdServicio: number;
    IdCanal: string;
    Activo: boolean;
}

export interface PutServiciosStatus {
    loading: boolean;
    error: string | null;
    message: string;
    params: any[];
    response: IResponse;
    tdsServicios: any;
    all: boolean;
}

export interface PutServiciosRequestPayload {
    message: string;
    params: any[];
    tdsServicios: any;
    all: boolean;
}

export interface PutServiciosReceivePayload {
    response: IResponse;
}

export interface PutServiciosErrorPayload {
    error: any | null;
}

export interface PutServiciosRequest {
    type: typeof PUT_SERVICIOS_REQUEST;
    payload: PutServiciosRequestPayload;
}

export type PutServiciosReceive = {
    type: typeof PUT_SERVICIOS_RECEIVE;
    payload: PutServiciosReceivePayload;
};

export type PutServiciosError = {
    type: typeof PUT_SERVICIOS_ERROR;
    payload: PutServiciosErrorPayload;
};

export type putServiciosActions =
| PutServiciosRequest
| PutServiciosReceive
| PutServiciosError;