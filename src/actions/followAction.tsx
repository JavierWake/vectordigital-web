import { POST_FOLLOW_REQUEST, POST_FOLLOW_RECEIVE, POST_FOLLOW_ERROR } from '../actions/actionTypes';
import { PostFollowRequest, PostFollowRequestPayload, PostFollowReceive, PostFollowError, PostFollowErrorPayload } from '../types/FollowListTypes';

export const postFollowRequest = (payload: PostFollowRequestPayload): PostFollowRequest => ({
    type: POST_FOLLOW_REQUEST,
    payload
    
});

export const postFollowRecieve = (): PostFollowReceive => ({
    type: POST_FOLLOW_RECEIVE
});

export const postFollowError = ( payload: PostFollowErrorPayload ): PostFollowError => ({
    type: POST_FOLLOW_ERROR,
    payload,
}); 