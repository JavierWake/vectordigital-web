import { POST_SELL_ISSUER_REQUEST, POST_SELL_ISSUER_RECEIVE, POST_SELL_ISSUER_ERROR } from '../actions/actionTypes';
import { SellIssuerRequest, SellIssuerReceive, SellIssuerError, SellIssuerRequestPayload, SellIssuerErrorPayload, SellIssuerReceivePayload } from '../types/SellIssuerType';

export const postSellIssuerRequest = (payload: SellIssuerRequestPayload): SellIssuerRequest => ({
    type: POST_SELL_ISSUER_REQUEST,
    payload    
});

export const postSellIssuerReceive = ( payload: SellIssuerReceivePayload ): SellIssuerReceive => ({
    type: POST_SELL_ISSUER_RECEIVE,
    payload
});

export const postSellIssuerError = ( payload: SellIssuerErrorPayload ): SellIssuerError => ({
    type: POST_SELL_ISSUER_ERROR,
    payload,
}); 