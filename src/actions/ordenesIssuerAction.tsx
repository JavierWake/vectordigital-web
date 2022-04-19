import { GET_ORDENES_ISSUER_REQUEST, GET_ORDENES_ISSUER_RECEIVE, GET_ORDENES_ISSUER_ERROR } from '../actions/actionTypes';
import { ordenesIssuerRequest, ordenesIssuerReceive, ordenesIssuerError, ordenesIssuerRequestPayload, ordenesIssuerErrorPayload, ordenesIssuerReceivePayload } from '../types/OrdenesIssuerTypes';

export const getOrdenesIssuerRequest = (payload: ordenesIssuerRequestPayload): ordenesIssuerRequest => ({
    type: GET_ORDENES_ISSUER_REQUEST,
    payload    
});

export const getOrdenesIssuerRecieve = ( payload: ordenesIssuerReceivePayload ): ordenesIssuerReceive => ({
    type: GET_ORDENES_ISSUER_RECEIVE,
    payload
});

export const getOrdenesIssuerError = ( payload: ordenesIssuerErrorPayload ): ordenesIssuerError => ({
    type: GET_ORDENES_ISSUER_ERROR,
    payload,
}); 