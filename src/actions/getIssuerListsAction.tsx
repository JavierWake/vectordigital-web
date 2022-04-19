import { GET_ISSUER_LISTS_REQUEST, GET_ISSUER_LISTS_RECEIVE, GET_ISSUER_LISTS_ERROR } from '../actions/actionTypes';
import { issuerListsRequest, issuerListsReceive, issuerListsError, issuerListsRequestPayload, issuerListsErrorPayload, issuerListsReceivePayload } from '../types/GetIssuerListsType';

export const getIssuerListsRequest = (payload: issuerListsRequestPayload): issuerListsRequest => ({
    type: GET_ISSUER_LISTS_REQUEST,
    payload    
});

export const getIssuerListsRecieve = ( payload: issuerListsReceivePayload ): issuerListsReceive => ({
    type: GET_ISSUER_LISTS_RECEIVE,
    payload
});

export const getIssuerListsError = ( payload: issuerListsErrorPayload ): issuerListsError => ({
    type: GET_ISSUER_LISTS_ERROR,
    payload,
}); 