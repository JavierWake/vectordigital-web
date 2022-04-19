import { DELETE_ISSUER_REQUEST, DELETE_ISSUER_RECEIVE, DELETE_ISSUER_ERROR } from '../actions/actionTypes';

export interface DeleteIssuerState {
    loading: boolean;
    message: "";
    error: string;
    id: any;
    idError: number;
    messageError: string;
}


export interface DeleteIssuerErrorPayload {
    error: string;
}

export interface DeleteIssuerReceivePayload {
    idError: number;
    messageError: string;
}

export interface DeleteIssuerRequestPayload {
    message: string;
    id: any;
}


export interface DeleteIssuerRequest {
    type: typeof DELETE_ISSUER_REQUEST;
    payload: DeleteIssuerRequestPayload;
}

export type DeleteIssuerReceive = {
    type: typeof DELETE_ISSUER_RECEIVE;
    payload: DeleteIssuerReceivePayload;
};

export type DeleteIssuerError = {
    type: typeof DELETE_ISSUER_ERROR;
    payload: DeleteIssuerErrorPayload;
}

export type DeleteIssuerActions = 
| DeleteIssuerRequest
| DeleteIssuerReceive
| DeleteIssuerError;