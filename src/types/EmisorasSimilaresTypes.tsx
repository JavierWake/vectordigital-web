import { GET_EMISORA_SIMILAR_REQUEST, GET_EMISORA_SIMILAR_RECEIVE, GET_EMISORA_SIMILAR_ERROR } from '../actions/actionTypes';

export interface ISimilares {
    ticker: string;
    name: string;
    percentage: any;
    last: any;
    currency: string;
}

export interface EmisorasSimilaresState {
    loading: boolean;
    similares: ISimilares[];
    error: string | null;
    message: string;
}

export interface GetEmisorasSimilaresRequestPayload {
    message: string;
}

export interface GetEmisorasSimilaresReceivePayload {
    similares: ISimilares[];
}

export interface GetEmisorasSimilaresErrorPayload {
    error: string;
}

export interface GetEmisorasSimilaresRequest {
    type: typeof GET_EMISORA_SIMILAR_REQUEST;
    payload: GetEmisorasSimilaresRequestPayload
}

export type GetEmisorasSimilaresReceive = {
    type: typeof GET_EMISORA_SIMILAR_RECEIVE;
    payload: GetEmisorasSimilaresReceivePayload;
};

export type GetEmisorasSimilaresError = {
    type: typeof GET_EMISORA_SIMILAR_ERROR;
    payload: GetEmisorasSimilaresErrorPayload;
};

export type EmisorasSimilaresActions = 
| GetEmisorasSimilaresRequest
| GetEmisorasSimilaresReceive
| GetEmisorasSimilaresError;