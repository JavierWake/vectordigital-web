import { QUOTES_DATA_REQUEST, QUOTES_DATA_RECEIVE, QUOTES_DATA_ERROR } from './actionTypes'
import { GetQuotesRequest, GetQuotesReceive, GetQuotesReceivePayload, GetQuotesError, GetQuotesErrorPayload } from '../types/QuotesTypes';

export const getQuotesRequest = (payload: string[]): GetQuotesRequest => ({
    type: QUOTES_DATA_REQUEST,
    payload
    
});

export const getQuotesRecieve = ( payload: GetQuotesReceivePayload ): GetQuotesReceive => ({
    type: QUOTES_DATA_RECEIVE,
    payload,
});

export const getQuotesError = ( payload: GetQuotesErrorPayload ): GetQuotesError => ({
    type: QUOTES_DATA_ERROR,
    payload,
}); 