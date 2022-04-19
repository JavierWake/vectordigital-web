import { GET_READYSTATE_REQUEST, GET_READYSTATE_RECEIVE, GET_READYSTATE_ERROR } from './actionTypes';
import { GetReadyStateRequest, GetReadyStateReceive, GetReadyStateError, GetReadyStateReceivePayload, GetReadyStateErrorPayload } from '../types/ReadyStateTypes';

export const getReadyStateRequest = (): GetReadyStateRequest => ({
    type: GET_READYSTATE_REQUEST    
});

export const getReadyStateReceive = ( payload: GetReadyStateReceivePayload ): GetReadyStateReceive => ({
    type: GET_READYSTATE_RECEIVE,
    payload,
});

export const getReadyStateError = ( payload: GetReadyStateErrorPayload ): GetReadyStateError => ({
    type: GET_READYSTATE_ERROR,
    payload,
}); 