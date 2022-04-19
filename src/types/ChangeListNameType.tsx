import { CHANGE_LIST_REQUEST, CHANGE_LIST_RECEIVE, CHANGE_LIST_ERROR } from '../actions/actionTypes';

export interface ChangeListState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string;
}

export interface ChangeListRequestPayload {
    message: string;
    params: string;
}

export interface ChangeListErrorPayload {
    error: string;
}

export interface ChangeListRequest {
    type: typeof CHANGE_LIST_REQUEST;
    payload: ChangeListRequestPayload;
}

export type ChangeListReceive = {
    type: typeof CHANGE_LIST_RECEIVE;
};

export type ChangeListError = {
    type: typeof CHANGE_LIST_ERROR;
    payload: ChangeListErrorPayload;
};

export type ChangeListActions = 
| ChangeListRequest
| ChangeListReceive
| ChangeListError;
