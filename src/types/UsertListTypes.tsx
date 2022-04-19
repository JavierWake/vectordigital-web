import { LIST_USER_REQUEST, LIST_USER_RECEIVE, LIST_USER_ERROR } from '../actions/actionTypes';


export interface emisoras{
    techRules: string;
    consolidadoP: string;
    name: string;
    serie: string;
    bivap: string;
    bmvP: string;
    biva: string;
    ric: string;
    consolidado: string;
    emisora: string;
}


export interface IListUser {
    list_name: string;
    list_id: string;
    list_size: number;
    vector: boolean;
    emisoras: emisoras[];
    
}

export interface ListUserState {
    listUser: IListUser[];
    error: string | null;
    message: string;
    loading: boolean;
    id: any;
}
export interface GetListUserRequestPayload {
    message: string;
    id: any;
}

export interface GetListUserReceivePayload {
    listUser: IListUser[];
}

export interface GetListUserErrorPayload {
    error: string;
}

export interface GetListUserRequest {
    type: typeof LIST_USER_REQUEST;
    payload: string
}

export type GetListUserReceive = {
    type: typeof LIST_USER_RECEIVE;
    payload: GetListUserReceivePayload;
};

export type GetListError = {
    type: typeof LIST_USER_ERROR;
    payload: GetListUserErrorPayload;
};

export type ListUserActions = 
| GetListUserRequest
| GetListUserReceive
| GetListError;