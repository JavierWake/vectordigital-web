import { POST_FOLLOW_REQUEST, POST_FOLLOW_RECEIVE, POST_FOLLOW_ERROR } from '../actions/actionTypes';

export interface PostFollowState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string;
}

export interface PostFollowRequestPayload {
    message: string;
    params: string;
}

export interface PostFollowErrorPayload {
    error: string;
}

export interface PostFollowRequest {
    type: typeof POST_FOLLOW_REQUEST;
    payload: PostFollowRequestPayload;
}

export type PostFollowReceive = {
    type: typeof POST_FOLLOW_RECEIVE;
};

export type PostFollowError = {
    type: typeof POST_FOLLOW_ERROR;
    payload: PostFollowErrorPayload;
};

export type PostFollowActions = 
| PostFollowRequest
| PostFollowReceive
| PostFollowError;