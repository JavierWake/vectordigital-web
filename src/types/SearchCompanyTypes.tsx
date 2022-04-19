import { SEARCH_COMPANY_REQUEST, SEARCH_COMPANY_RECEIVE, SEARCH_COMPANY_ERROR } from '../actions/actionTypes';

export interface ISearchCompany {
    ticker: string;
    name: string;
    percentage: any;
    last:  any;
    currency: string;
}

export interface SearchCompanyState {
    loading: boolean;
    searchCompany: ISearchCompany[];
    error: string | null;
    message: string;
}

export interface GetSearchCompanyReceivePayload {
    searchCompany: ISearchCompany[];
}

export interface GetSearchCompanyErrorPayload {
    error: string;
}

export interface GetSearchCompanyRequestPayload {
    message: string;
}

export interface GetSearchCompanyRequest {
    type: typeof SEARCH_COMPANY_REQUEST;
    payload: string
}

export type GetSearchCompanyReceive = {
    type: typeof SEARCH_COMPANY_RECEIVE;
    payload: GetSearchCompanyReceivePayload;
};

export type GetSearchCompanyError = {
    type: typeof SEARCH_COMPANY_ERROR;
    payload: GetSearchCompanyErrorPayload;
};

export type SearchCompanyActions = 
| GetSearchCompanyRequest
| GetSearchCompanyReceive
| GetSearchCompanyError;