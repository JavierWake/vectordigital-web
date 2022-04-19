import { GET_RECOM_REQUEST, GET_RECOM_RECEIVE, GET_RECOM_ERROR } from './actionTypes';
import { GetRecomIssuerRequest, GetRecomIssuerReceive, GetRecomIssuerError, GetRecomIssuerReceivePayload, GetRecomIssuerErrorPayload } from '../types/RecomIssuerTypes';

export const getRecomIssuerRequest = (payload: string): GetRecomIssuerRequest => ({
    type: GET_RECOM_REQUEST,
    payload
    
});

export const getRecomIssuerRecieve = ( payload: GetRecomIssuerReceivePayload ): GetRecomIssuerReceive => ({
    type: GET_RECOM_RECEIVE,
    payload,
});

export const getRecomIssuerError = ( payload: GetRecomIssuerErrorPayload ): GetRecomIssuerError => ({
    type: GET_RECOM_ERROR,
    payload,
}); 