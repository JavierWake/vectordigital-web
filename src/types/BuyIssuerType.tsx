import { POST_BUY_ISSUER_REQUEST, POST_BUY_ISSUER_RECEIVE, POST_BUY_ISSUER_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: any;
    cerror: string;
    dstrade: {
        tdstrade: any;
    }
}

export interface BuyIssuerState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
    data: any;
}

export interface BuyIssuerReceivePayload {
    response: IResponse;
}

export interface BuyIssuerErrorPayload {
    error: any | null;
}

export interface BuyIssuerRequestPayload {
    message: string;
    params: string[];
}

export interface BuyIssuerRequest {
    type: typeof POST_BUY_ISSUER_REQUEST;
    payload: BuyIssuerRequestPayload;
}

export type BuyIssuerReceive = {
    type: typeof POST_BUY_ISSUER_RECEIVE;
    payload: BuyIssuerReceivePayload;
};

export type BuyIssuerError = {
    type: typeof POST_BUY_ISSUER_ERROR;
    payload: BuyIssuerErrorPayload;
};

export type BuyIssuerActions =
    | BuyIssuerRequest
    | BuyIssuerReceive
    | BuyIssuerError;