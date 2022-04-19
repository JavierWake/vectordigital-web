import { POST_LIST_REQUEST, POST_LIST_RECEIVE, POST_LIST_ERROR } from './actionTypes';
import { PostListRequest, PostListReceive, PostListError, PostListErrorPayload, PostListRequestPayload, PostListReceivedPayload } from '../types/PostList';

export const postListRequest = ( payload: PostListRequestPayload ): PostListRequest  => ({
    type: POST_LIST_REQUEST,
    payload
});

export const postListReceive = ( payload: PostListReceivedPayload ): PostListReceive  => ({
    type: POST_LIST_RECEIVE,
    payload
});

export const postListError = ( payload: PostListErrorPayload ): PostListError  => ({
    type: POST_LIST_ERROR,
    payload
});