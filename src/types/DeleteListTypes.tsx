import { DELETE_LIST_REQUEST, DELETE_LIST_RECEIVE, DELETE_LIST_ERROR } from '../actions/actionTypes';

export interface DeleteListState {
    loading: boolean;
    message: "";
    error: string;
    id: any;
    idError: number;
    messageError: string;
}


export interface DeleteListErrorPayload {
    error: string;
}
export interface DeleteListRequestPayload {
    message: string;
    id: any;
}

export interface DeleteListReceivePayload {
    idError: number;
    messageError: string;
}

export interface DeleteListRequest {
    type: typeof DELETE_LIST_REQUEST;
    payload: DeleteListRequestPayload;
}

export type DeleteListReceive = {
    type: typeof DELETE_LIST_RECEIVE;
    payload: DeleteListReceivePayload;
};

export type DeleteListError = {
    type: typeof DELETE_LIST_ERROR;
    payload: DeleteListErrorPayload;
}

export type DeleteListActions = 
| DeleteListRequest
| DeleteListReceive
| DeleteListError;
