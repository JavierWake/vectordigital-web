import { POST_STOPLOSS_REQUEST, POST_STOPLOSS_RECEIVE, POST_STOPLOSS_ERROR } from '../actions/actionTypes';
import { PostStopLossRequest, PostStopLossReceive, PostStopLossError, PostStopLossRequestPayload, PostStopLossReceivePayload, PostStopLossErrorPayload } from '../types/PostStopLossType';

export const postStopLossRequest = ( payload: PostStopLossRequestPayload ): PostStopLossRequest => ({
    type: POST_STOPLOSS_REQUEST,
    payload    
});

export const postStopLossRecieve = ( payload: PostStopLossReceivePayload ): PostStopLossReceive => ({
    type: POST_STOPLOSS_RECEIVE,
    payload
});

export const postStopLossError = ( payload: PostStopLossErrorPayload ): PostStopLossError => ({
    type: POST_STOPLOSS_ERROR,
    payload,
}); 