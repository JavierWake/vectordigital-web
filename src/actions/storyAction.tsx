import { STORY_API_REQUEST, STORY_API_RECEIVE, STORY_API_ERROR } from './actionTypes';
import { GetStoryRequest, GetStoryReceive, GetStoryReceivePayload, GetStoryError, GetStoryErrorPayload } from '../types/ModalNewsTypes';

export const getStoryRequest = (payload: string): GetStoryRequest => ({
    type: STORY_API_REQUEST,
    payload
    
});

export const getStoryRecieve = ( payload: GetStoryReceivePayload ): GetStoryReceive => ({
    type: STORY_API_RECEIVE,
    payload,
});

export const getStoryError = ( payload: GetStoryErrorPayload ): GetStoryError => ({
    type: STORY_API_ERROR,
    payload,
}); 