import { POST_LIST_REQUEST, POST_LIST_RECEIVE, POST_LIST_ERROR } from '../actions/actionTypes';

export interface PostListState {
    loading: boolean;
    error: string;
    message: string;
    id: any;
    idError: number;
    messageError: string;
    list_id: string;
}

export interface PostListRequestPayload {
    message: string;
    id: any;
}


export interface PostListErrorPayload {
    error: string;
}

export interface PostListReceivedPayload {
    idError: number;
    messageError: string;
    list_id: string;
}

export interface PostListRequest {
    type: typeof POST_LIST_REQUEST;
    payload: PostListRequestPayload;
}

export interface PostListReceive {
    type: typeof POST_LIST_RECEIVE;
    payload: PostListReceivedPayload;
}

export interface PostListError {
    type: typeof POST_LIST_ERROR;
    payload: PostListErrorPayload;
}

export type PostListActions = 
| PostListRequest
| PostListReceive
| PostListError;