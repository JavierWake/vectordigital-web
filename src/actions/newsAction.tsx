import { NEWS_API_REQUEST, NEWS_API_RECEIVE, NEWS_API_ERROR } from './actionTypes';
import { GetNewsRequest, GetNewsReceive, GetNewsReceivePayload, GetNewsError, GetNewsErrorPayload } from '../types/NewsTypes';

export const getNewsRequest = (payload: string): GetNewsRequest => ({
    type: NEWS_API_REQUEST,
    payload
    
});

export const getNewsRecieve = ( payload: GetNewsReceivePayload ): GetNewsReceive => ({
    type: NEWS_API_RECEIVE,
    payload,
});

export const getNewsError = ( payload: GetNewsErrorPayload ): GetNewsError => ({
    type: NEWS_API_ERROR,
    payload,
}); 