import { RESET_STATE_GET_ORDENES, GET_ORDENES_CAP_ESTATUS_REQUEST, GET_ORDENES_CAP_ESTATUS_RECEIVE, GET_ORDENES_CAP_ESTATUS_ERROR } from '../actions/actionTypes';

export interface TdsOrdenesCapPend {
    contrato: number;
    origen: string;
    cuenta: string;
    folio: string;
    folioMod: string;
    Instruccion: string;
    emisora: string;
    bolsa: string;
    tipoorden: string;
    Fecha: string;
    Hora: string;
    Validez: string;
    titulos: string;
    precio: string;
    Puja: number;
    ValorPuja: number;
    estatus: string;
    estatusDesc: string;
    TitulosAsign: number;
    PrecioAsign: number;
    monto: number;
    rechazo: string;
    UltimoPrecio: number;
    puedeCancelar: boolean;
    iTitulos: number;
    sTitulos: string;
    sTitulosAsign: string;
    sPrecioAsign: string;
    sMonto: string;
    sUltimoPrecio: string;
}

export interface DsOrdenesCapPendObj {
    tdsOrdenesCapPend: TdsOrdenesCapPend[];
}

export interface DsOrdenesCapPend {
    dsOrdenesCapPend: DsOrdenesCapPendObj;
}

export interface TdsAsig {
    contrato: number;
    FolioOrd: string;
    FolioAsig: string;
    TitulosAsig: string;
    PrecioAsig: string;
    Monto: string;
    TitulosAsigD: number;
    PrecioAsigD: number;
    MontoD: number;
}

export interface TdsOrdenesCap {
    contrato: number;
    origen: string;
    cuenta: string;
    folio: string;
    folioMod: string;
    Instruccion: string;
    emisora: string;
    bolsa: string;
    tipoorden: string;
    Fecha: string;
    Hora: string;
    Validez: string;
    titulos: string;
    precio: string;
    Puja: number;
    ValorPuja: number;
    estatus: string;
    estatusDesc: string;
    TitulosAsign: number;
    PrecioAsign: number;
    monto: number;
    rechazo: string;
    UltimoPrecio: number;
    puedeCancelar: boolean;
    iTitulos: number;
    sTitulos: string;
    sTitulosAsign: string;
    sPrecioAsign: string;
    sMonto: string;
    sUltimoPrecio: string;
    tdsAsig: TdsAsig[];
}

export interface DsOrdenesCapObj {
    tdsOrdenesCap: TdsOrdenesCap[];
}

export interface DsOrdenesCap {
    dsOrdenesCap: DsOrdenesCapObj;
}

export interface GetOrdenesCapEstatusResponse {
    ierror: number;
    cerror: string;
    dsOrdenesCapPend: DsOrdenesCapPend;
    dsOrdenesCap: DsOrdenesCap;
    dsPortafolioCap: any;
}

export interface GetOrdenesCapEstatusState {
    loading: boolean;
    getOrdenesCapEstatusRespuesta: GetOrdenesCapEstatusResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetOrdenesCapEstatusRequestPayload {
    message: string;
    params: string[];
}

export interface GetOrdenesCapEstatusReceivePayload {
    getOrdenesCapEstatusRespuesta: GetOrdenesCapEstatusResponse;
}

export interface GetOrdenesCapEstatusErrorPayload {
    error: string | null;
}

export interface GetOrdenesCapEstatusResetPayload {
    hacerReset: boolean;
}

export interface GetOrdenesCapEstatusReset {
    type: typeof RESET_STATE_GET_ORDENES;
    payload: GetOrdenesCapEstatusResetPayload;
}

export interface GetOrdenesCapEstatusRequest {
    type: typeof GET_ORDENES_CAP_ESTATUS_REQUEST;
    payload: GetOrdenesCapEstatusRequestPayload;
}

export interface GetOrdenesCapEstatusReceive {
    type: typeof GET_ORDENES_CAP_ESTATUS_RECEIVE;
    payload: GetOrdenesCapEstatusReceivePayload;
}

export interface GetOrdenesCapEstatusError {
    type: typeof GET_ORDENES_CAP_ESTATUS_ERROR;
    payload: GetOrdenesCapEstatusErrorPayload;
}

export type GetOrdenesCapEstatusActions = 
| GetOrdenesCapEstatusRequest
| GetOrdenesCapEstatusReceive
| GetOrdenesCapEstatusError
| GetOrdenesCapEstatusReset;
