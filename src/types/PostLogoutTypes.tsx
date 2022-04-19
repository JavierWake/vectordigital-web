import { POST_LOGOUT_REQUEST, POST_LOGOUT_RECEIVE, POST_LOGOUT_ERROR } from '../actions/actionTypes';

export interface PostLogoutResponse {
    cerror: string;
    ierror: number;
}

export interface PostLogoutState {
    loading: boolean;
    logoutResponse: PostLogoutResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostLogoutRequestPayload {
    message: string;
    params: string[];
}

export interface PostLogoutReceivePayload {
    responseApi: PostLogoutResponse;
}

export interface PostLogoutErrorPayload {
    error: string | null;
}

export interface PostLogoutRequest {
    type: typeof POST_LOGOUT_REQUEST;
    payload: PostLogoutRequestPayload;
}

export interface PostLogoutReceive {
    type: typeof POST_LOGOUT_RECEIVE;
    payload: PostLogoutReceivePayload;
}

export interface PostLogoutError {
    type: typeof POST_LOGOUT_ERROR;
    payload: PostLogoutErrorPayload;
}

export type PostLogoutActions = 
| PostLogoutRequest
| PostLogoutReceive
| PostLogoutError;
