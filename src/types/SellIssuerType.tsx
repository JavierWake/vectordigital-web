import { POST_SELL_ISSUER_REQUEST, POST_SELL_ISSUER_RECEIVE, POST_SELL_ISSUER_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: any;
    cerror: string;
    dstrade: {
        tdstrade: any;
    }
}

export interface SellIssuerState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
    data: any;
}

export interface SellIssuerReceivePayload {
    response: IResponse;
}

export interface SellIssuerErrorPayload {
    error: any | null;
}

export interface SellIssuerRequestPayload {
    message: string;
    params: string[];
}

export interface SellIssuerRequest {
    type: typeof POST_SELL_ISSUER_REQUEST;
    payload: SellIssuerRequestPayload;
}

export type SellIssuerReceive = {
    type: typeof POST_SELL_ISSUER_RECEIVE;
    payload: SellIssuerReceivePayload;
};

export type SellIssuerError = {
    type: typeof POST_SELL_ISSUER_ERROR;
    payload: SellIssuerErrorPayload;
};

export type SellIssuerActions =
    | SellIssuerRequest
    | SellIssuerReceive
    | SellIssuerError;