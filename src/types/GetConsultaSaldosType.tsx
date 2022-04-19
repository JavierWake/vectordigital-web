import { GET_CONSULTA_SALDOS_REQUEST, GET_CONSULTA_SALDOS_RECEIVE, GET_CONSULTA_SALDOS_ERROR } from '../actions/actionTypes';

export interface TdsSaldoEfectivo {
    cuenta: number;
    nombre: string;
    numprom: string;
    saldo: number;
    saldo24: number;
    saldo48: number;
    saldo72: number;
    Fsaldo: string | null;
    Fsaldo24: string | null;
    Fsaldo48: string | null;
    Fsaldo72: string | null;
    suma: number;
}

export interface TdsCapCpa {
    cuenta: number;
    esquema: string;
    saldo: number;
}

export interface DsSaldos {
    tdsSaldoEfectivo: TdsSaldoEfectivo[];
    tdsCapCpa: TdsCapCpa[];
}

export interface ConsultaSaldosResponse {
    ierror: number;
    cerror: string;
    dsSaldos: DsSaldos;
}

export interface GetConsultaSaldosState {
    loading: boolean;
    consultaSaldosRespuesta: ConsultaSaldosResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetConsultaSaldosRequestPayload {
    message: string;
    params: string[];
}

export interface GetConsultaSaldosReceivePayload {
    consultaSaldosRespuesta: ConsultaSaldosResponse;
}

export interface GetConsultaSaldosErrorPayload {
    error: string | null;
}

export interface GetConsultaSaldosRequest {
    type: typeof GET_CONSULTA_SALDOS_REQUEST;
    payload: GetConsultaSaldosRequestPayload;
}

export interface GetConsultaSaldosReceive {
    type: typeof GET_CONSULTA_SALDOS_RECEIVE;
    payload: GetConsultaSaldosReceivePayload;
}

export interface GetConsultaSaldosError {
    type: typeof GET_CONSULTA_SALDOS_ERROR;
    payload: GetConsultaSaldosErrorPayload;
}

export type GetConsultaSaldosActions = 
| GetConsultaSaldosRequest
| GetConsultaSaldosReceive
| GetConsultaSaldosError;
