import { POST_MULT_SELL_ISSUER_REQUEST, POST_MULT_SELL_ISSUER_RECEIVE, POST_MULT_SELL_ISSUER_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: any;
    cerror: string;
    dstrade: {
        tdstrade: any;
    }
}

export interface MultSellIssuerState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
    data: any;
}

export interface MultSellIssuerReceivePayload {
    response: IResponse;
}

export interface MultSellIssuerErrorPayload {
    error: any | null;
}

export interface MultSellIssuerRequestPayload {
    message: string;
    params: string[];
}

export interface MultSellIssuerRequest {
    type: typeof POST_MULT_SELL_ISSUER_REQUEST;
    payload: MultSellIssuerRequestPayload;
}

export type MultSellIssuerReceive = {
    type: typeof POST_MULT_SELL_ISSUER_RECEIVE;
    payload: MultSellIssuerReceivePayload;
};

export type MultSellIssuerError = {
    type: typeof POST_MULT_SELL_ISSUER_ERROR;
    payload: MultSellIssuerErrorPayload;
};

export type MultSellIssuerActions =
    | MultSellIssuerRequest
    | MultSellIssuerReceive
    | MultSellIssuerError;