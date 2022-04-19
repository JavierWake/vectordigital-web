import { GET_DEPOSITO_BANCOS_REQUEST, GET_DEPOSITO_BANCOS_RECEIVE, GET_DEPOSITO_BANCOS_ERROR } from '../actions/actionTypes';

export interface TdsTradeData {
    saldo: number;
    hroperacion: string;
    clabe: string;
}

export interface TdsBancos {
    Banco: number;
    Nombre: string;
}

export interface TdsBancosChequera {
    Banco: number;
    Nombre: string;
    Chequera: string;
}

export interface DsDeposito {
    tdsTradeData: TdsTradeData[];
    tdsBancos: TdsBancos[];
    tdsBancosChequera: TdsBancosChequera[];
}

export interface DepositoBancosResponse {
    ierror: number;
    cerror: string;
    dsDeposito: DsDeposito;
}

export interface GetDepositoBancosState {
    loading: boolean;
    depositoBancosRespuesta: DepositoBancosResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetDepositoBancosRequestPayload {
    message: string;
    params: string[];
}

export interface GetDepositoBancosReceivePayload {
    depositoBancosRespuesta: DepositoBancosResponse;
}

export interface GetDepositoBancosErrorPayload {
    error: string | null;
}

export interface GetDepositoBancosRequest {
    type: typeof GET_DEPOSITO_BANCOS_REQUEST;
    payload: GetDepositoBancosRequestPayload;
}

export interface GetDepositoBancosReceive {
    type: typeof GET_DEPOSITO_BANCOS_RECEIVE;
    payload: GetDepositoBancosReceivePayload;
}

export interface GetDepositoBancosError {
    type: typeof GET_DEPOSITO_BANCOS_ERROR;
    payload: GetDepositoBancosErrorPayload;
}

export type GetDepositoBancosActions = 
| GetDepositoBancosRequest
| GetDepositoBancosReceive
| GetDepositoBancosError;
