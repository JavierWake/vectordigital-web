import { POST_ALL_CONFIG_VA_REQUEST, POST_ALL_CONFIG_VA_RECEIVE, POST_ALL_CONFIG_VA_ERROR } from '../actions/actionTypes';

export interface PostAllConfigVAResponse {
    ierror: any;
    cerror: string;
}

export interface PostAllConfigVAState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: PostAllConfigVAResponse;
    data: any;
}

export interface PostAllConfigVAReceivePayload {
    response: PostAllConfigVAResponse;
}

export interface PostAllConfigVAErrorPayload {
    error: any | null;
}

export interface PostAllConfigVARequestPayload {
    message: string;
    params: string[];
}

export interface PostAllConfigVARequest {
    type: typeof POST_ALL_CONFIG_VA_REQUEST;
    payload: PostAllConfigVARequestPayload;
}

export type PostAllConfigVAReceive = {
    type: typeof POST_ALL_CONFIG_VA_RECEIVE;
    payload: PostAllConfigVAReceivePayload;
};

export type PostAllConfigVAError = {
    type: typeof POST_ALL_CONFIG_VA_ERROR;
    payload: PostAllConfigVAErrorPayload;
};

export type PostAllConfigVAActions =
    | PostAllConfigVARequest
    | PostAllConfigVAReceive
    | PostAllConfigVAError;