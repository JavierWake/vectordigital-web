import {STORY_API_REQUEST, STORY_API_RECEIVE, STORY_API_ERROR} from '../actions/actionTypes';

export interface IModalNews {
    title: string;
    time: string;
    prov: string;
    story: string;
}

export interface StoryState {
    modal: IModalNews | null;
    error: string;
    id: string;
    loading: boolean;
}

export interface GetStoryReceivePayload {
    modal: IModalNews;
}

export interface GetStoryErrorPayload {
    error: string;
}

export interface GetStoryRequest {
    type: typeof STORY_API_REQUEST;
    payload: string
}

export type GetStoryReceive = {
    type: typeof STORY_API_RECEIVE;
    payload: GetStoryReceivePayload;
};

export type GetStoryError = {
    type: typeof STORY_API_ERROR;
    payload: GetStoryErrorPayload;
};

export type StoryActions = 
| GetStoryRequest
| GetStoryReceive
| GetStoryError;
