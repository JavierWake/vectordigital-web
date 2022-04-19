import { GET_BURS_REQUEST, GET_BURS_RECIEVE, GET_BURS_ERROR } from '../actions/actionTypes';
import { GetBursRequest, GetBursReceive, GetBursError, GetBursErrorPayload, GetBursReceivePayload } from '../types/BursType';

export const getBursRequest = (payload: any): GetBursRequest => ({
    type: GET_BURS_REQUEST,
    payload
    
});

export const getBursRecieve = ( payload: GetBursReceivePayload ): GetBursReceive => ({
    type: GET_BURS_RECIEVE,
    payload,
});

export const getBursError = ( payload: GetBursErrorPayload ): GetBursError => ({
    type: GET_BURS_ERROR,
    payload,
}); 