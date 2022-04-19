import { RESET_STATE, POST_RETIRO_REQUEST, POST_RETIRO_RECEIVE, POST_RETIRO_ERROR } from '../actions/actionTypes';
import { PostRetiroRequest, PostRetiroReceive, PostRetiroError, PostRetiroRequestPayload, PostRetiroReceivePayload, PostRetiroErrorPayload, PostRetiroResetPayload, PostRetiroReset } from '../types/PostRetiroType';

export const postRetiroRequest = ( payload: PostRetiroRequestPayload ): PostRetiroRequest => ({
    type: POST_RETIRO_REQUEST,
    payload    
});

export const postRetiroRecieve = ( payload: PostRetiroReceivePayload ): PostRetiroReceive => ({
    type: POST_RETIRO_RECEIVE,
    payload
});

export const postRetiroError = ( payload: PostRetiroErrorPayload ): PostRetiroError => ({
    type: POST_RETIRO_ERROR,
    payload,
}); 

export const postRetiroReset = ( payload: PostRetiroResetPayload ): PostRetiroReset => ({
    type: RESET_STATE,
    payload,
});
