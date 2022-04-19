import { DELETE_UNFOLLOW_REQUEST, DELETE_UNFOLLOW_RECEIVE, DELETE_UNFOLLOW_ERROR } from '../actions/actionTypes';

export interface DeleteUnfollowState {
    loading: boolean;
    error: string | null;
    message: string;
    id:any;
}

export interface DeleteUnfollowRequestPayload {
    message: string;
    id:any;
}

export interface DeleteUnfollowErrorPayload {
    error: string;
}

export interface DeleteUnfollowRequest {
    type: typeof DELETE_UNFOLLOW_REQUEST;
    payload: DeleteUnfollowRequestPayload;
}

export type DeleteUnfollowReceive = {
    type: typeof DELETE_UNFOLLOW_RECEIVE;
};

export type DeleteUnfollowError = {
    type: typeof DELETE_UNFOLLOW_ERROR;
    payload: DeleteUnfollowErrorPayload;
};

export type DeleteUnfollowActions = 
| DeleteUnfollowRequest
| DeleteUnfollowReceive
| DeleteUnfollowError;