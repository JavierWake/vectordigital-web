import { POST_MULT_BUY_ISSUER_REQUEST, POST_MULT_BUY_ISSUER_RECEIVE, POST_MULT_BUY_ISSUER_ERROR } from '../actions/actionTypes';
import { MultBuyIssuerRequest, MultBuyIssuerReceive, MultBuyIssuerError, MultBuyIssuerRequestPayload, MultBuyIssuerErrorPayload, MultBuyIssuerReceivePayload } from '../types/MultBuyIssuerType';

export const postMultBuyIssuerRequest = (payload: MultBuyIssuerRequestPayload): MultBuyIssuerRequest => ({
    type: POST_MULT_BUY_ISSUER_REQUEST,
    payload    
});

export const postMultBuyIssuerReceive = ( payload: MultBuyIssuerReceivePayload ): MultBuyIssuerReceive => ({
    type: POST_MULT_BUY_ISSUER_RECEIVE,
    payload
});

export const postMultBuyIssuerError = ( payload: MultBuyIssuerErrorPayload ): MultBuyIssuerError => ({
    type: POST_MULT_BUY_ISSUER_ERROR,
    payload,
}); 