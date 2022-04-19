import { RESET_STATE_OPERACIONES_FONDOS, GET_FONDOS_CPA_REQUEST, GET_FONDOS_CPA_RECEIVE, GET_FONDOS_CPA_ERROR } from '../actions/actionTypes';

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

export interface IFondosCpaGetRespuestaData {
    tdsTradeData: IFondosTradeData[]; 
} 

export interface IFondosCpaGetResponse {
    ierror: number;
    cerror: string;
    dsRespuesta: IFondosCpaGetRespuestaData;
}

export interface FondosCpaGetState {
    loading: boolean;
    fondosCpaGetRespuesta: IFondosCpaGetResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosCpaGetRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosCpaGetResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetFondosCpaGetReceivePayload {
    fondosCpaGetRespuesta: IFondosCpaGetRespuestaData;
}

export interface GetFondosCpaGetErrorPayload {
    error: string | null;
}

export interface GetFondosCpaGetRequest {
    type: typeof GET_FONDOS_CPA_REQUEST;
    payload: GetFondosCpaGetRequestPayload;
}

export interface GetFondosCpaGetReceive {
    type: typeof GET_FONDOS_CPA_RECEIVE;
    payload: GetFondosCpaGetReceivePayload;
}

export interface GetFondosCpaGetError {
    type: typeof GET_FONDOS_CPA_ERROR;
    payload: GetFondosCpaGetErrorPayload;
}

export interface GetFondosCpaGetReset {
    type: typeof RESET_STATE_OPERACIONES_FONDOS;
    payload: GetFondosCpaGetResetPayload;
}

export type FondosCpaGetActions = 
| GetFondosCpaGetRequest
| GetFondosCpaGetReceive
| GetFondosCpaGetError
| GetFondosCpaGetReset;
