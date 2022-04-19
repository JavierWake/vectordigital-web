import { POST_LOGOUT_REQUEST, POST_LOGOUT_RECEIVE, POST_LOGOUT_ERROR } from '../actions/actionTypes';
import { PostLogoutRequest, PostLogoutReceive, PostLogoutError, PostLogoutRequestPayload, PostLogoutReceivePayload, PostLogoutErrorPayload } from '../types/PostLogoutTypes';

export const postLogoutRequest = ( payload: PostLogoutRequestPayload ): PostLogoutRequest => ({
    type: POST_LOGOUT_REQUEST,
    payload    
});

export const postLogoutRecieve = ( payload: PostLogoutReceivePayload ): PostLogoutReceive => ({
    type: POST_LOGOUT_RECEIVE,
    payload
});

export const postLogoutError = ( payload: PostLogoutErrorPayload ): PostLogoutError => ({
    type: POST_LOGOUT_ERROR,
    payload,
}); 
