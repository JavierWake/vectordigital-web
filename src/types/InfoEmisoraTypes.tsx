import { GET_INFO_EMISORA_REQUEST, GET_INFO_EMISORA_RECEIVE, GET_INFO_EMISORA_ERROR, RESET_STATE_INFO_EMISORA } from '../actions/actionTypes';

export interface ITdsOrdenesCapResponse {
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

export interface ITdsPortafolioCap {
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
    PrecioAnterior: number;
    PrecioActual: number;
    Variacion: number;
    PorcentajeVar: number;
    VolumenAcumulado: number;
    NumeroOperaciones: number;
    PrecioMaximo: number;
    PrecioMinimo: number;
    sPorcComposicion: string;
    sTitulosDisponibles: string;
    sTitulosActuales: string;
    sTitulosVenta: string;
    sTitulosBloqueados: string;
    sCostoPromedio: string;
    sCostoActual: string;
    sUltimoPrecio: string;
    sPrecioInicial: string;
    sUtilidad: string;
    sUtilidadPorc: string;
    sValorMercado: string;
    sValorMercadoInicial: string;
    sImporte: string;
    sPrecioAnterior: string;
    sPrecioActual: string;
    sVariacion: string;
    sPorcentajeVar: string;
    sVolumenAcumulado: string;
    sNumeroOperaciones: string;
    sPrecioMaximo: string;
    sPrecioMinimo: string;
}

export interface ITdsMkdCapPrecios {
    Fecha: string;
    Tipo: string;
    Emisora: string;
    Serie: string;
    Secuencia: number;
    Volumen_Compra: number;
    Precio_Compra: number;
    Volumen_Venta: number;
    Precio_Venta: number;
    HoraHecho: string;
    HoraPostura: string;
    Precio_Anterior: number;
    Precio_Actual: number;
    Variacion: number;
    Porcentaje_Var: number;
    volumen_Acumulado: number;
    Numero_Operaciones: number;
    Precio_Maximo: number;
    Precio_Minimo: number;
    PuedeComprar: boolean;
    PuedeVender: boolean;
    TieneSL: boolean;
    LSItem: string;
    EmisoraEncode: string;
    sPrecioAnterior: string;
    sPrecioActual: string;
    sVariacion: string;
    sPorcentajeVar: string;
    sVolumenAcumulado: string;
    sNumeroOperaciones: string;
    sPrecioMaximo: string;
    sPrecioMinimo: string;

}

export interface IDsOrdenes {
    tdsOrdenesCapResponse: ITdsOrdenesCapResponse[]; 
} 

export interface IDsPortafolio {
    tdsPortafolioCap: ITdsPortafolioCap[]; 
}

export interface IDsOperacionesDia {
    tdsOperacionesDia: string[]; 
}

export interface IDsMkdCapPrecios {
    tdsMkdCapPrecios: ITdsMkdCapPrecios[];
}

export interface IInfoEmisoraResponse {
    ierror: number;
    cerror: string;
    TotPortafolio: number;
    TotEmisora: number;
    PorcPortafolioEmis: number;
    sTotPortafolio: string;
    sTotEmisora: string;
    sPorcPortafolioEmis: string;
    dsOrdenes: IDsOrdenes;
    dsPortafolio: IDsPortafolio;
    dsOperacionesDia: IDsOperacionesDia;
    dsMkdCapPrecios: IDsMkdCapPrecios;
}

export interface InfoEmisoraState {
    loading: boolean;
    infoEmisoraResponse: IInfoEmisoraResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetInfoEmisoraRequestPayload {
    message: string;
    params: string[];
}

export interface GetInfoEmisoraReceivePayload {
    infoEmisoraResponse: IInfoEmisoraResponse;
}

export interface GetInfoEmisoraErrorPayload {
    error: string;
    infoEmisoraResponse: IInfoEmisoraResponse;
}

export interface GetInfoEmisoraResetPayload {
    hacerResetDelEstado: boolean;
}

export interface GetInfoEmisoraReset {
    type: typeof RESET_STATE_INFO_EMISORA;
    payload: GetInfoEmisoraResetPayload;
}

export interface GetInfoEmisoraRequest {
    type: typeof GET_INFO_EMISORA_REQUEST;
    payload: GetInfoEmisoraRequestPayload;
}

export type GetInfoEmisoraReceive = {
    type: typeof GET_INFO_EMISORA_RECEIVE;
    payload: GetInfoEmisoraReceivePayload;
};

export type GetInfoEmisoraError = {
    type: typeof GET_INFO_EMISORA_ERROR;
    payload: GetInfoEmisoraErrorPayload;
};

export type InfoEmisoraActions = 
| GetInfoEmisoraRequest
| GetInfoEmisoraReceive
| GetInfoEmisoraError
| GetInfoEmisoraReset;
