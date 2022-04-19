import { GET_CATALOGO_TRADING_REQUEST, GET_CATALOGO_TRADING_RECEIVE, GET_CATALOGO_TRADING_ERROR } from '../actions/actionTypes';

export interface IEmisorasCatalogo {
    descripcion: string;
    titulos: string;
}

export interface ITradingArray {
    ISSUER: string;
    descripcion?: string;
    titulos?: string;
    BID: number;
    ASK: number;
    BIDSIZE: number;
    ASKSIZE: number;
    TRDPRC_1: number;
    ADJUST_CLS: number;
    HIGH_1: number;
    LOW_1: number;
    NETCHNG_1: number;
    PCTCHNG: number;
    TRDVOL_1: number;
    ASK_TIM_NS: any;
    BID_TIM_NS: any;
    NUM_MOVES: number;
}

export interface IProfundidadArray {
    ISSUER: string;
    BEST_BID1: number;
    BEST_BID2: number;
    BEST_BID3: number;
    BEST_BID4: number;
    BEST_BID5: number;
    BEST_BID6: number;
    BEST_BID7: number;
    BEST_BID8: number;
    BEST_BID9: number;
    BEST_BID10: number;
    BEST_BSIZ1: number;
    BEST_BSIZ2: number;
    BEST_BSIZ3: number;
    BEST_BSIZ4: number;
    BEST_BSIZ5: number;
    BEST_BSIZ6: number;
    BEST_BSIZ7: number;
    BEST_BSIZ8: number;
    BEST_BSIZ9: number;
    BEST_BSZ10: number;
    BEST_ASK1: number;
    BEST_ASK2: number;
    BEST_ASK3: number;
    BEST_ASK4: number;
    BEST_ASK5: number;
    BEST_ASK6: number;
    BEST_ASK7: number;
    BEST_ASK8: number;
    BEST_ASK9: number;
    BEST_ASK10: number;
    BEST_ASIZ1: number;
    BEST_ASIZ2: number;
    BEST_ASIZ3: number;
    BEST_ASIZ4: number;
    BEST_ASIZ5: number;
    BEST_ASIZ6: number;
    BEST_ASIZ7: number;
    BEST_ASIZ8: number;
    BEST_ASIZ9: number;
    BEST_ASZ10: number;
}

export interface CatalogoTradingStatus {
    loading: boolean;
    posicionTradingMX: [];
    posicionTradingBIV: [];
    posicionTradingMCO: [];
    tradingArray: ITradingArray[];
    profundidadArray: IProfundidadArray[];
    error: string;
    message: string;
    emisorasCatalogo: IEmisorasCatalogo[];
}

export interface CatalogoTradingRequestPayload {
    message: string;
    emisorasCatalogo: IEmisorasCatalogo[];
}

export interface CatalogoTradingReceivePayload {
    posicionTradingMX: [];
    posicionTradingBIV: [];
    posicionTradingMCO: [];
    tradingArray: ITradingArray[];
    profundidadArray: IProfundidadArray[];
}

export interface CatalogoTradingErrorPayload {
    error: string;
}

export interface CatalogoTradingRequest {
    type: typeof GET_CATALOGO_TRADING_REQUEST;
    payload: CatalogoTradingRequestPayload;
}

export type CatalogoTradingReceive = {
    type: typeof GET_CATALOGO_TRADING_RECEIVE;
    payload: CatalogoTradingReceivePayload;
};

export type CatalogoTradingError = {
    type: typeof GET_CATALOGO_TRADING_ERROR;
    payload: CatalogoTradingErrorPayload;
};


export type CatalogoTradingActions = 
| CatalogoTradingRequest
| CatalogoTradingReceive
| CatalogoTradingError;
