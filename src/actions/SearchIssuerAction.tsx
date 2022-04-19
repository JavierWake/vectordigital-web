import { GET_MONITOR_REQUEST, GET_MONITOR_RECEIVE, GET_MONITOR_ERROR } from '../actions/actionTypes';
import { GetSearchIssuerRequest, GetSearchIssuerReceive, GetSearchIssuerReceivePayload, GetSearchIssuerError, GetSearchIssuerErrorPayload } from '../types/SearchIssuer';

export const getSearchIssuerRequest = (payload: string): GetSearchIssuerRequest => ({
    type: GET_MONITOR_REQUEST,
    payload
    
});

export const getSearchIssuerRecieve = ( payload: GetSearchIssuerReceivePayload ): GetSearchIssuerReceive => ({
    type: GET_MONITOR_RECEIVE,
    payload,
});

export const getSearchIssuerError = ( payload: GetSearchIssuerErrorPayload ): GetSearchIssuerError => ({
    type: GET_MONITOR_ERROR,
    payload,
});