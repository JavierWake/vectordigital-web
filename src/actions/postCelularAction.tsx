import { POST_CELULAR_REQUEST, POST_CELULAR_RECEIVE, POST_CELULAR_ERROR } from '../actions/actionTypes';
import { PostCelularRequest, PostCelularReceive, PostCelularError, PostCelularRequestPayload, PostCelularReceivePayload, PostCelularErrorPayload } from '../types/PostCelularType';

export const postCelularRequest = ( payload: PostCelularRequestPayload ): PostCelularRequest => ({
    type: POST_CELULAR_REQUEST,
    payload    
});

export const postCelularRecieve = ( payload: PostCelularReceivePayload ): PostCelularReceive => ({
    type: POST_CELULAR_RECEIVE,
    payload
});

export const postCelularError = ( payload: PostCelularErrorPayload ): PostCelularError => ({
    type: POST_CELULAR_ERROR,
    payload,
}); 