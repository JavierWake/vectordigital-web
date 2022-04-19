import { GET_FONDOS_VTAEMIS_REQUEST, GET_FONDOS_VTAEMIS_RECEIVE, GET_FONDOS_VTAEMIS_ERROR } from '../actions/actionTypes';

export interface IConfig {
    horariooperacion: string;
    operaFlujos: string;
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

export interface IFondosVtaEmisRespuestaData {
    tdsConfig: IConfig[];
    tdsEmisoras: IEmisora[]; 
} 

export interface FondosVtaEmisState {
    loading: boolean;
    fondosVtaEmisRespuesta: IFondosVtaEmisRespuestaData;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosVtaEmisRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosVtaEmisReceivePayload {
    fondosVtaEmisRespuesta: IFondosVtaEmisRespuestaData;
}

export interface GetFondosVtaEmisErrorPayload {
    error: string | null;
}

export interface GetFondosVtaEmisRequest {
    type: typeof GET_FONDOS_VTAEMIS_REQUEST;
    payload: GetFondosVtaEmisRequestPayload;
}

export interface GetFondosVtaEmisReceive {
    type: typeof GET_FONDOS_VTAEMIS_RECEIVE;
    payload: GetFondosVtaEmisReceivePayload;
}

export interface GetFondosVtaEmisError {
    type: typeof GET_FONDOS_VTAEMIS_ERROR;
    payload: GetFondosVtaEmisErrorPayload;
}

export type FondosVtaEmisActions = 
| GetFondosVtaEmisRequest
| GetFondosVtaEmisReceive
| GetFondosVtaEmisError;
