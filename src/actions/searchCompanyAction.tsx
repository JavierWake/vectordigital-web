import { SEARCH_COMPANY_REQUEST, SEARCH_COMPANY_RECEIVE, SEARCH_COMPANY_ERROR } from './actionTypes';
import { GetSearchCompanyRequest, GetSearchCompanyReceive, GetSearchCompanyReceivePayload, GetSearchCompanyError, GetSearchCompanyErrorPayload } from '../types/SearchCompanyTypes';

export const getSearchCompanyRequest = (payload: string): GetSearchCompanyRequest => ({
    type: SEARCH_COMPANY_REQUEST,
    payload
    
});

export const getSearchCompanyRecieve = ( payload: GetSearchCompanyReceivePayload ): GetSearchCompanyReceive => ({
    type: SEARCH_COMPANY_RECEIVE,
    payload,
});

export const getSearchCompanyError = ( payload: GetSearchCompanyErrorPayload ): GetSearchCompanyError => ({
    type: SEARCH_COMPANY_ERROR,
    payload,
});