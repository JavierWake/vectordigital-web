import { POST_CONFIG_VA_REQUEST, POST_CONFIG_VA_RECEIVE, POST_CONFIG_VA_ERROR } from '../actions/actionTypes';
import { PostConfigVARequest, PostConfigVAReceive, PostConfigVAError, PostConfigVARequestPayload, PostConfigVAErrorPayload, PostConfigVAReceivePayload } from '../types/PostConfigVAType';

export const postConfigVARequest = (payload: PostConfigVARequestPayload): PostConfigVARequest => ({
    type: POST_CONFIG_VA_REQUEST,
    payload    
});

export const postConfigVARecieve = ( payload: PostConfigVAReceivePayload ): PostConfigVAReceive => ({
    type: POST_CONFIG_VA_RECEIVE,
    payload
});

export const postConfigVAError = ( payload: PostConfigVAErrorPayload ): PostConfigVAError => ({
    type: POST_CONFIG_VA_ERROR,
    payload,
}); 