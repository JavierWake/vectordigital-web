import { RESET_STATE_OPERACIONES_FONDOS, PUT_FONDOS_CPA_REQUEST, PUT_FONDOS_CPA_RECEIVE, PUT_FONDOS_CPA_ERROR } from '../actions/actionTypes';

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

export interface IFondosCpaPutRespuestaData {
    tdsTradeData: IFondosTradeData[]; 
} 

export interface IFondosCpaPutResponse {
    ierror: number;
    cerror: string;
    deRespuesta: IFondosCpaPutRespuestaData;
}

export interface FondosCpaPutState {
    loading: boolean;
    fondosCpaPutRespuesta: IFondosCpaPutResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutFondosCpaPutRequestPayload {
    message: string;
    params: string[];
}

export interface PutFondosCpaPutReceivePayload {
    fondosCpaPutRespuesta: IFondosCpaPutRespuestaData;
}

export interface PutFondosCpaPutErrorPayload {
    error: string | null;
}

export interface PutFondosCpaPutResetPayload {
    hacerResetAInitialState: boolean;
}

export interface PutFondosCpaPutRequest {
    type: typeof PUT_FONDOS_CPA_REQUEST;
    payload: PutFondosCpaPutRequestPayload;
}

export interface PutFondosCpaPutReceive {
    type: typeof PUT_FONDOS_CPA_RECEIVE;
    payload: PutFondosCpaPutReceivePayload;
}

export interface PutFondosCpaPutError {
    type: typeof PUT_FONDOS_CPA_ERROR;
    payload: PutFondosCpaPutErrorPayload;
}

export interface PutFondosCpaPutReset {
    type: typeof RESET_STATE_OPERACIONES_FONDOS;
    payload: PutFondosCpaPutResetPayload;
}

export type FondosCpaPutActions = 
| PutFondosCpaPutRequest
| PutFondosCpaPutReceive
| PutFondosCpaPutError
| PutFondosCpaPutReset;
