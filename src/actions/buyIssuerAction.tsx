import { POST_BUY_ISSUER_REQUEST, POST_BUY_ISSUER_RECEIVE, POST_BUY_ISSUER_ERROR } from '../actions/actionTypes';
import { BuyIssuerRequest, BuyIssuerReceive, BuyIssuerError, BuyIssuerRequestPayload, BuyIssuerErrorPayload, BuyIssuerReceivePayload } from '../types/BuyIssuerType';

export const postBuyIssuerRequest = (payload: BuyIssuerRequestPayload): BuyIssuerRequest => ({
    type: POST_BUY_ISSUER_REQUEST,
    payload    
});

export const postBuyIssuerReceive = ( payload: BuyIssuerReceivePayload ): BuyIssuerReceive => ({
    type: POST_BUY_ISSUER_RECEIVE,
    payload
});

export const postBuyIssuerError = ( payload: BuyIssuerErrorPayload ): BuyIssuerError => ({
    type: POST_BUY_ISSUER_ERROR,
    payload,
}); 