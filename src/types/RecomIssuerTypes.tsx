import { GET_RECOM_REQUEST, GET_RECOM_RECEIVE, GET_RECOM_ERROR } from '../actions/actionTypes';

export interface IRecomIssuer {
    buy: number;
    sell: number;
    hold: number;
    perBuy: number;
    perSell: number;
    perHold: number;
    analysts: number;
}

export interface RecomIssuerState {
    loading: boolean;
    recomIssuer: IRecomIssuer;
    error: string | null;
    message: string;
}


export interface GetRecomIssuerReceivePayload {
    recomIssuer: IRecomIssuer;
}

export interface GetRecomIssuerErrorPayload {
    error: string;
}


export interface GetRecomIssuerRequest {
    type: typeof GET_RECOM_REQUEST;
    payload: string
}

export type GetRecomIssuerReceive = {
    type: typeof GET_RECOM_RECEIVE;
    payload: GetRecomIssuerReceivePayload;
};

export type GetRecomIssuerError = {
    type: typeof GET_RECOM_ERROR;
    payload: GetRecomIssuerErrorPayload;
};

export type RecomIssuerActions = 
| GetRecomIssuerRequest
| GetRecomIssuerReceive
| GetRecomIssuerError;