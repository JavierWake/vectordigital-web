import { RESET_STATE_OPERACIONES_FONDOS ,GET_FONDOS_CPAEMIS_REQUEST, GET_FONDOS_CPAEMIS_RECEIVE, GET_FONDOS_CPAEMIS_ERROR } from '../actions/actionTypes';

export interface IConfig {
    horariooperacion: string;
    operaFlujos: boolean;
    saldo: number;
}

export interface IEmisora {
    Emisora: string;
    Serie: string;
    Descripcion: string;
    IdFamilia: number;
    TipoRent: string;
    Precio: number;
    Posicion: number;
    PosicionT: number;
    MontoMaximo: number;
    MontoMaximoT: number;
    MontoMaximoV: number;
    MontoMaximoVT: number;
    Operacion: string;
    Monto: number;
    FechaIng: any;
    Titulos: number;
    Total: number;
    Folio: number;
    Mensaje: string;
    Horario: string;
    HorarioCierreV: string;
    FechaOper: string;
    FechaLIQ: string;
    RF: boolean;
    CteEsp: boolean;
}

export interface IFondosCpaEmisRespuestaData {
    tdsConfig: IConfig[];
    tdsEmisoras: IEmisora[]; 
} 

export interface IFondosCpaEmisResponse {
    ierror: number;
    cerror: string;
    dsRespuesta: IFondosCpaEmisRespuestaData;
}

export interface FondosCpaEmisState {
    loading: boolean;
    fondosCpaEmisRespuesta: IFondosCpaEmisResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosCpaEmisRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosCpaEmisReceivePayload {
    fondosCpaEmisRespuesta: IFondosCpaEmisRespuestaData;
}

export interface GetFondosCpaEmisErrorPayload {
    error: string | null;
}

export interface GetFondosCpaEmisResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetFondosCpaEmisRequest {
    type: typeof GET_FONDOS_CPAEMIS_REQUEST;
    payload: GetFondosCpaEmisRequestPayload;
}

export interface GetFondosCpaEmisReceive {
    type: typeof GET_FONDOS_CPAEMIS_RECEIVE;
    payload: GetFondosCpaEmisReceivePayload;
}

export interface GetFondosCpaEmisError {
    type: typeof GET_FONDOS_CPAEMIS_ERROR;
    payload: GetFondosCpaEmisErrorPayload;
}

export interface GetFondosCpaEmisReset {
    type: typeof RESET_STATE_OPERACIONES_FONDOS;
    payload: GetFondosCpaEmisResetPayload;
}

export type FondosCpaEmisActions = 
| GetFondosCpaEmisRequest
| GetFondosCpaEmisReceive
| GetFondosCpaEmisError
| GetFondosCpaEmisReset;
