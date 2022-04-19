import { POST_MULT_SELL_ISSUER_REQUEST, POST_MULT_SELL_ISSUER_RECEIVE, POST_MULT_SELL_ISSUER_ERROR } from '../actions/actionTypes';
import { MultSellIssuerRequest, MultSellIssuerReceive, MultSellIssuerError, MultSellIssuerRequestPayload, MultSellIssuerErrorPayload, MultSellIssuerReceivePayload } from '../types/MultSellIssuerType';

export const postMultSellIssuerRequest = (payload: MultSellIssuerRequestPayload): MultSellIssuerRequest => ({
    type: POST_MULT_SELL_ISSUER_REQUEST,
    payload    
});

export const postMultSellIssuerReceive = ( payload: MultSellIssuerReceivePayload ): MultSellIssuerReceive => ({
    type: POST_MULT_SELL_ISSUER_RECEIVE,
    payload
});

export const postMultSellIssuerError = ( payload: MultSellIssuerErrorPayload ): MultSellIssuerError => ({
    type: POST_MULT_SELL_ISSUER_ERROR,
    payload
}); 