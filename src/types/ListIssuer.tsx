import { GET_LIST_ISSUER_REQUEST, GET_LIST_ISSUER_RECEIVE, GET_LIST_ISSUER_ERROR, GET_LIST_ISSUER_RESET } from '../actions/actionTypes';
import { IProfundidadArray } from '../types/CatalogoTradingTypes';

export interface IListIssuer {
    ticker: string[];
    bmv: string[];
    bmvP: string[];
    biva: string[];
    bivaP: string[];
    consolidado: string[];
    consolidadoP: string[];
    techRules: string[];
}

export interface ITradingListArray {
    ISSUER: string;
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

export interface ListIssuerState {
    listIssuer: IListIssuer;
    error: string | null;
    message: string;
    loading: boolean;
    id: any;
    tradingArray: ITradingListArray[];
    profundidadArray: IProfundidadArray[];
}

export interface GetListIssuerRequestPayload {
    message: string;
    id: any;
}

export interface GetListIssuerReceivePayload {
    listIssuer: IListIssuer;
    tradingArray: ITradingListArray[];
    profundidadArray: IProfundidadArray[];
}

export interface GetListIssuerErrorPayload {
    error: string;
}

export interface GetListIssuerResetPayload {
    hacerResetAInitialState: boolean;
}

export interface GetListIssuerRequest {
    type: typeof GET_LIST_ISSUER_REQUEST;
    payload: GetListIssuerRequestPayload
}

export type GetListIssuerReceive = {
    type: typeof GET_LIST_ISSUER_RECEIVE;
    payload: GetListIssuerReceivePayload;
};

export type GetListIssuerError = {
    type: typeof GET_LIST_ISSUER_ERROR;
    payload: GetListIssuerErrorPayload;
};

export interface GetListIssuerReset {
    type: typeof GET_LIST_ISSUER_RESET;
    payload: GetListIssuerResetPayload;
}

export type ListIssuerActions = 
| GetListIssuerRequest
| GetListIssuerReceive
| GetListIssuerReset
| GetListIssuerError;