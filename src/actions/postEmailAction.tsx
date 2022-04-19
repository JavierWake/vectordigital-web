import { POST_EMAIL_REQUEST, POST_EMAIL_RECEIVE, POST_EMAIL_ERROR } from '../actions/actionTypes';
import { PostEmailRequest, PostEmailReceive, PostEmailError, PostEmailRequestPayload, PostEmailReceivePayload, PostEmailErrorPayload } from '../types/PostEmailType';

export const postEmailRequest = ( payload: PostEmailRequestPayload ): PostEmailRequest => ({
    type: POST_EMAIL_REQUEST,
    payload    
});

export const postEmailRecieve = ( payload: PostEmailReceivePayload ): PostEmailReceive => ({
    type: POST_EMAIL_RECEIVE,
    payload
});

export const postEmailError = ( payload: PostEmailErrorPayload ): PostEmailError => ({
    type: POST_EMAIL_ERROR,
    payload,
}); 