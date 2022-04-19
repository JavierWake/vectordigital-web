import { NEWS_API_REQUEST, NEWS_API_RECEIVE, NEWS_API_ERROR } from '../actions/actionTypes';

export interface INews {
    id: string;
    title: string;
    desc: string;
    time: string;
    tags: string[];
    prov: string;
}

export interface NewsState {
    loading: boolean;
    news: INews[];
    error: string | null;
    message: string;
}

export interface GetNewsReceivePayload {
    news: INews[];
}

export interface GetNewsErrorPayload {
    error: string;
}

export interface GetNewsRequestPayload {
    message: string;
}

export interface GetNewsRequest {
    type: typeof NEWS_API_REQUEST;
    payload: string
}

export type GetNewsReceive = {
    type: typeof NEWS_API_RECEIVE;
    payload: GetNewsReceivePayload;
};

export type GetNewsError = {
    type: typeof NEWS_API_ERROR;
    payload: GetNewsErrorPayload;
};

export type NewsActions = 
| GetNewsRequest
| GetNewsReceive
| GetNewsError;