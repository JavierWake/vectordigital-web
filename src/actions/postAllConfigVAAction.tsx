import { POST_ALL_CONFIG_VA_REQUEST, POST_ALL_CONFIG_VA_RECEIVE, POST_ALL_CONFIG_VA_ERROR } from '../actions/actionTypes';
import { PostAllConfigVARequest, PostAllConfigVAReceive, PostAllConfigVAError, PostAllConfigVARequestPayload, PostAllConfigVAErrorPayload, PostAllConfigVAReceivePayload } from '../types/PostAllConfigVAType';

export const postAllConfigVARequest = (payload: PostAllConfigVARequestPayload): PostAllConfigVARequest => ({
    type: POST_ALL_CONFIG_VA_REQUEST,
    payload    
});

export const postAllConfigVARecieve = ( payload: PostAllConfigVAReceivePayload ): PostAllConfigVAReceive => ({
    type: POST_ALL_CONFIG_VA_RECEIVE,
    payload
});

export const postAllConfigVAError = ( payload: PostAllConfigVAErrorPayload ): PostAllConfigVAError => ({
    type: POST_ALL_CONFIG_VA_ERROR,
    payload,
}); 