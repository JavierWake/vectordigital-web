import { RESET_STATE_OPERACIONES_FONDOS, PUT_FONDOS_VTA_REQUEST, PUT_FONDOS_VTA_RECEIVE, PUT_FONDOS_VTA_ERROR } from '../actions/actionTypes';

export interface IFondosTradeData {
    Descripcion: string;
    Emisora: string;
    Serie: string;
    Precio: number;
    Posicion: number;
    PosicionT: number;
    Grafica: string;
    MontoMaximoT: number;
    MontoMaximo: number;
    FechaOper: any;
    FechaIng: string;
    FechaLiq: any;
    Horario: number;
    Operacion: string;
    Monto: number;
    TotalTrade: number;
    Titulos: number;
    ErrorCd: number;
    Mensaje: string;
    MensajeTrade: string;
    CteEsp: boolean;
    tieneFlijos: boolean;
    Folio: number;
}

export interface IFondosVtaPutRespuestaData {
    tdsTradeData: IFondosTradeData[]; 
} 

export interface IFondosVtaPutResponse {
    ierror: number;
    cerror: string;
    dsRespuesta: IFondosVtaPutRespuestaData;
}

export interface FondosVtaPutState {
    loading: boolean;
    fondosVtaPutRespuesta: IFondosVtaPutResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutFondosVtaPutRequestPayload {
    message: string;
    params: string[];
}

export interface PutFondosVtaPutReceivePayload {
    fondosVtaPutRespuesta: IFondosVtaPutRespuestaData;
}

export interface PutFondosVtaPutErrorPayload {
    error: string | null;
}

export interface PutFondosVtaPutResetPayload {
    hacerResetAInitialState: boolean;
}

export interface PutFondosVtaPutRequest {
    type: typeof PUT_FONDOS_VTA_REQUEST;
    payload: PutFondosVtaPutRequestPayload;
}

export interface PutFondosVtaPutReceive {
    type: typeof PUT_FONDOS_VTA_RECEIVE;
    payload: PutFondosVtaPutReceivePayload;
}

export interface PutFondosVtaPutError {
    type: typeof PUT_FONDOS_VTA_ERROR;
    payload: PutFondosVtaPutErrorPayload;
}

export interface PutFondosVtaPutReset {
    type: typeof RESET_STATE_OPERACIONES_FONDOS;
    payload: PutFondosVtaPutResetPayload;
}

export type FondosVtaPutActions = 
| PutFondosVtaPutRequest
| PutFondosVtaPutReceive
| PutFondosVtaPutError
| PutFondosVtaPutReset;
