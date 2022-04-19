import { GET_ORDENES_ISSUER_REQUEST, GET_ORDENES_ISSUER_RECEIVE, GET_ORDENES_ISSUER_ERROR } from '../actions/actionTypes';

export interface ItdsOrdenesCapResponse {
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
}

export interface ItdsPortafolioCap {
    Cuenta: number;
    Emisora: string;
    Serie: string;
    Descripcion: string;
    PorcComposicion: number;
    TitulosDisponibles: number;
    TitulosActuales: number;
    TitulosVenta: number;
    TitulosBloqueados: number;
    CostoPromedio: number;
    CostoActual: number;
    UltimoPrecio: number;
    PrecioInicial: number;
    Utilidad: number;
    UtilidadPorc: number;
    ValorMercado: number;
    ValorMercadoInicial: number;
    EmisoraEncode: string;
    Importe: number;
}

export interface IResponse {
    ierror: number;
    cerror: string;
    dsOrdenes: { tdsOrdenesCapResponse: ItdsOrdenesCapResponse[] };
    dsPortafolio: { tdsPortafolioCap: ItdsPortafolioCap[] };
    dsOperacionesDia: { tdsOperacionesDia: string[] }
}

export interface OrdenesIssuerStatus {
    loading: boolean;
    response: IResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface ordenesIssuerRequestPayload {
    message: string;
    params: string[];
}

export interface ordenesIssuerReceivePayload {
    response: IResponse;
}

export interface ordenesIssuerErrorPayload {
    error: string | null;
}

export interface ordenesIssuerRequest {
    type: typeof GET_ORDENES_ISSUER_REQUEST;
    payload: ordenesIssuerRequestPayload;
}

export interface ordenesIssuerReceive {
    type: typeof GET_ORDENES_ISSUER_RECEIVE;
    payload: ordenesIssuerReceivePayload;
}

export interface ordenesIssuerError {
    type: typeof GET_ORDENES_ISSUER_ERROR;
    payload: ordenesIssuerErrorPayload;
}

export type ordenesIssuerActions = 
| ordenesIssuerRequest
| ordenesIssuerReceive
| ordenesIssuerError;