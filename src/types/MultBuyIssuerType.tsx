import { POST_MULT_BUY_ISSUER_REQUEST, POST_MULT_BUY_ISSUER_RECEIVE, POST_MULT_BUY_ISSUER_ERROR } from '../actions/actionTypes';

export interface IResponse {
    ierror: any;
    cerror: string;
    dstrade: {
        tdstrade: any;
    }
}

export interface MultBuyIssuerState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
    data: any;
}

export interface MultBuyIssuerReceivePayload {
    response: IResponse;
}

export interface MultBuyIssuerErrorPayload {
    error: any | null;
}

export interface MultBuyIssuerRequestPayload {
    message: string;
    params: string[];
}

export interface MultBuyIssuerRequest {
    type: typeof POST_MULT_BUY_ISSUER_REQUEST;
    payload: MultBuyIssuerRequestPayload;
}

export type MultBuyIssuerReceive = {
    type: typeof POST_MULT_BUY_ISSUER_RECEIVE;
    payload: MultBuyIssuerReceivePayload;
};

export type MultBuyIssuerError = {
    type: typeof POST_MULT_BUY_ISSUER_ERROR;
    payload: MultBuyIssuerErrorPayload;
};

export type MultBuyIssuerActions =
    | MultBuyIssuerRequest
    | MultBuyIssuerReceive
    | MultBuyIssuerError;