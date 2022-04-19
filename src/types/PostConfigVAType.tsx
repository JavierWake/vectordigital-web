import { POST_CONFIG_VA_REQUEST, POST_CONFIG_VA_RECEIVE, POST_CONFIG_VA_ERROR } from '../actions/actionTypes';

export interface PostConfigVAResponse {
    ierror: any;
    cerror: string;
}

export interface PostConfigVAState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: PostConfigVAResponse;
    data: any;
}

export interface PostConfigVAReceivePayload {
    response: PostConfigVAResponse;
}

export interface PostConfigVAErrorPayload {
    error: any | null;
}

export interface PostConfigVARequestPayload {
    message: string;
    params: string[];
}

export interface PostConfigVARequest {
    type: typeof POST_CONFIG_VA_REQUEST;
    payload: PostConfigVARequestPayload;
}

export type PostConfigVAReceive = {
    type: typeof POST_CONFIG_VA_RECEIVE;
    payload: PostConfigVAReceivePayload;
};

export type PostConfigVAError = {
    type: typeof POST_CONFIG_VA_ERROR;
    payload: PostConfigVAErrorPayload;
};

export type PostConfigVAActions =
    | PostConfigVARequest
    | PostConfigVAReceive
    | PostConfigVAError;