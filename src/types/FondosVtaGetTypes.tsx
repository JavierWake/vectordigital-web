import { RESET_STATE_OPERACIONES_FONDOS, GET_FONDOS_VTA_REQUEST, GET_FONDOS_VTA_RECEIVE, GET_FONDOS_VTA_ERROR } from '../actions/actionTypes';

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

export interface IFondosVtaGetRespuestaData {
    tdsTradeData: IFondosTradeData[]; 
} 

export interface IFondosVtaGetResponse {
    ierror: number;
    cerror: string;
    dsRespuesta: IFondosVtaGetRespuestaData;
}

export interface FondosVtaGetState {
    loading: boolean;
    fondosVtaGetRespuesta: IFondosVtaGetResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosVtaGetRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosVtaGetReceivePayload {
    fondosVtaGetRespuesta: IFondosVtaGetRespuestaData;
}

export interface GetFondosVtaGetErrorPayload {
    error: string | null;
}

export interface GetFondosVtaGetResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetFondosVtaGetRequest {
    type: typeof GET_FONDOS_VTA_REQUEST;
    payload: GetFondosVtaGetRequestPayload;
}

export interface GetFondosVtaGetReceive {
    type: typeof GET_FONDOS_VTA_RECEIVE;
    payload: GetFondosVtaGetReceivePayload;
}

export interface GetFondosVtaGetError {
    type: typeof GET_FONDOS_VTA_ERROR;
    payload: GetFondosVtaGetErrorPayload;
}

export interface GetFondosVtaGetReset {
    type: typeof RESET_STATE_OPERACIONES_FONDOS;
    payload: GetFondosVtaGetResetPayload;
}

export type FondosVtaGetActions = 
| GetFondosVtaGetRequest
| GetFondosVtaGetReceive
| GetFondosVtaGetError
| GetFondosVtaGetReset;
