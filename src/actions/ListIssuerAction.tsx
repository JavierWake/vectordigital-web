import { GET_LIST_ISSUER_REQUEST, GET_LIST_ISSUER_RECEIVE, GET_LIST_ISSUER_ERROR, GET_LIST_ISSUER_RESET } from './actionTypes';
import { GetListIssuerRequest, GetListIssuerRequestPayload, GetListIssuerReceive, GetListIssuerReceivePayload, GetListIssuerError, GetListIssuerErrorPayload, GetListIssuerReset, GetListIssuerResetPayload } from '../types/ListIssuer';

export const getListIssuerRequest = (payload: GetListIssuerRequestPayload): GetListIssuerRequest => ({
    type: GET_LIST_ISSUER_REQUEST,
    payload
});

export const getListIssuerRecieve = ( payload: GetListIssuerReceivePayload ): GetListIssuerReceive => ({
    type: GET_LIST_ISSUER_RECEIVE,
    payload,
});

export const getListIssuerError = ( payload: GetListIssuerErrorPayload ): GetListIssuerError => ({
    type: GET_LIST_ISSUER_ERROR,
    payload,
}); 

export const getListIssuerReset = ( payload: GetListIssuerResetPayload ): GetListIssuerReset => ({
    type: GET_LIST_ISSUER_RESET,
    payload,
});