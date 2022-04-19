import { GET_OPERACIONESDIA_REQUEST, GET_OPERACIONESDIA_RECEIVE, GET_OPERACIONESDIA_ERROR } from '../actions/actionTypes';



export interface tdsOperacionesDia{
    cuenta: any;
    fecha: any;
    Cveordeon: any;
    operacion: any;
    concepto: any;
    monto: any;
    saldo: any;
    EsBold: any;

}
export interface IResponse {
    ierror: any;
    cerror: string;
    dsOperacionesDia: {
        tdsOperacionesDia: tdsOperacionesDia[];
    }
}

export interface OperacionesDiaState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
}

export interface OperacionesDiaReceivePayload {
    response: IResponse;
}

export interface OperacionesDiaErrorPayload {
    error: any | null;
}

export interface OperacionesDiaRequestPayload {
    message: string;
    params: string[];
}

export interface OperacionesDiaRequest {
    type: typeof GET_OPERACIONESDIA_REQUEST;
    payload: OperacionesDiaRequestPayload;
}

export type OperacionesDiaReceive = {
    type: typeof GET_OPERACIONESDIA_RECEIVE;
    payload: OperacionesDiaReceivePayload;
};

export type OperacionesDiaError = {
    type: typeof GET_OPERACIONESDIA_ERROR;
    payload: OperacionesDiaErrorPayload;
};

export type OperacionesDiaActions = 
| OperacionesDiaRequest
| OperacionesDiaReceive
| OperacionesDiaError;