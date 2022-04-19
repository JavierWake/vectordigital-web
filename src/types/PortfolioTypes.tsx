import { GET_POSITION_REQUEST, GET_POSITION_RECEIVE, GET_POSITION_ERROR } from '../actions/actionTypes';

export interface tdsPortafolioCap {
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

export interface tdsPortafolioFd {
    Cuenta: number;
    Emisora: string;
    Serie: string;
    Descripcion: string;
    TitulosDisponibles: number;
    TitulosVenta: number;
    TitulosBloqueados: number;
    CostoPromedio: number;
    CostoCompra: number;
    UltimoPrecio: number;
    Utilidad: number | null;
    UtilidadPorc: number | null;
    ValorMercado: number;
    EmisoraEncode: string;
    Importe: number;
}

export interface tradingData {
    /*ISSUER: string;
    ISSUER_CDE: string;
    ticker: string;
    Serie_CDE: string;
    BID: number;
    ASK: number;
    BIDSIZE: number;
    ASKSIZE: number;
    TRDPRC_1: number;
    OPEN_PRC: number;
    HIGH_1: number;
    LOW_1: number;
    NETCHNG_1: number;
    PCTCHNG: number;
    TRDVOL_1: number;
    OPENDETAIL: boolean;
    ASK_TIM_NS: any;
    BID_TIM_NS: any;
    NUM_MOVES: number;*/
    descripcion: string;
    titulos: string;
}

  
export interface dsPortafolio {
    tdsPortafolioFd: tdsPortafolioFd[];
    tdsPortafolioCap: tdsPortafolioCap[];
    tdsPortafolioMd: [];
}

export interface PortfolioStatus {
    loading: boolean;
    dsPortafolio: dsPortafolio;
    emisorasRefinitiv: string;
    tradingData: tradingData[];
    error: string | null;
    message: string;
    params: string[];
}

export interface dsPortafolioReceivePayload {
    dsPortafolio: dsPortafolio;
    emisorasRefinitiv: string;
    tradingData: tradingData[];
}

export interface dsPortafolioErrorPayload {
    error: string;
}

export interface dsPortafolioRequestPayload {
    message: string;
    params: string[];
}

export interface dsPortafolioRequest {
    type: typeof GET_POSITION_REQUEST;
    payload: dsPortafolioRequestPayload;
}

export type dsPortafolioReceive = {
    type: typeof GET_POSITION_RECEIVE;
    payload: dsPortafolioReceivePayload;
};

export type dsPortafolioError = {
    type: typeof GET_POSITION_ERROR;
    payload: dsPortafolioErrorPayload;
};


export type dsPortafolioActions = 
| dsPortafolioRequest
| dsPortafolioReceive
| dsPortafolioError;
