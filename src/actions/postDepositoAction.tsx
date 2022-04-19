import { POST_DEPOSITO_REQUEST, POST_DEPOSITO_RECEIVE, POST_DEPOSITO_ERROR } from '../actions/actionTypes';
import { PostDepositoRequest, PostDepositoReceive, PostDepositoError, PostDepositoRequestPayload, PostDepositoReceivePayload, PostDepositoErrorPayload } from '../types/PostDepositoType';

export const postDepositoRequest = ( payload: PostDepositoRequestPayload ): PostDepositoRequest => ({
    type: POST_DEPOSITO_REQUEST,
    payload    
});

export const postDepositoRecieve = ( payload: PostDepositoReceivePayload ): PostDepositoReceive => ({
    type: POST_DEPOSITO_RECEIVE,
    payload
});

export const postDepositoError = ( payload: PostDepositoErrorPayload ): PostDepositoError => ({
    type: POST_DEPOSITO_ERROR,
    payload,
}); 