import { GET_ISSUER_LISTS_REQUEST, GET_ISSUER_LISTS_RECEIVE, GET_ISSUER_LISTS_ERROR } from '../actions/actionTypes';

export interface listas {
    list_id: string;
    list_name: string;
}

export interface IssuerListsStatus {
    loading: boolean;
    listas: listas[];
    message: string;
}

export interface issuerListsReceivePayload {
    listas: listas[];
}

export interface issuerListsErrorPayload {
    error: any | null;
}

export interface issuerListsRequestPayload {
    message: string;
}

export interface issuerListsRequest {
    type: typeof GET_ISSUER_LISTS_REQUEST;
    payload: issuerListsRequestPayload;
}

export type issuerListsReceive = {
    type: typeof GET_ISSUER_LISTS_RECEIVE;
    payload: issuerListsReceivePayload;
};

export type issuerListsError = {
    type: typeof GET_ISSUER_LISTS_ERROR;
    payload: issuerListsErrorPayload;
};

export type issuerListsActions = 
| issuerListsRequest
| issuerListsReceive
| issuerListsError;