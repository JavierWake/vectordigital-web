import { GET_MONITOR_REQUEST, GET_MONITOR_RECEIVE, GET_MONITOR_ERROR } from '../actions/actionTypes';

export interface ISearchIssuer {
    ticker: string;
    name: string;
    exists: boolean;
}

export interface SearchIssuerState {
    loading: boolean;
    searchIssuer: ISearchIssuer[];
    error: string | null;
    message: string;
}

export interface GetSearchIssuerReceivePayload {
    searchIssuer: ISearchIssuer[];
}

export interface GetSearchIssuerErrorPayload {
    error: string;
}

export interface GetSearchIssuerRequestPayload {
    message: string;
}

export interface GetSearchIssuerRequest {
    type: typeof GET_MONITOR_REQUEST;
    payload: string
}

export type GetSearchIssuerReceive = {
    type: typeof GET_MONITOR_RECEIVE;
    payload: GetSearchIssuerReceivePayload;
};

export type GetSearchIssuerError = {
    type: typeof GET_MONITOR_ERROR;
    payload: GetSearchIssuerErrorPayload;
};

export type SearchIssuerActions = 
| GetSearchIssuerRequest
| GetSearchIssuerReceive
| GetSearchIssuerError;