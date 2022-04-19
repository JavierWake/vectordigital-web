import { RESET_STATE, GET_RETIRO_INFO_REQUEST, GET_RETIRO_INFO_RECEIVE, GET_RETIRO_INFO_ERROR } from '../actions/actionTypes';
import { GetRetiroInfoRequest, GetRetiroInfoReceive, GetRetiroInfoError, GetRetiroInfoRequestPayload, GetRetiroInfoReceivePayload, GetRetiroInfoErrorPayload, GetRetiroInfoResetPayload, GetRetiroInfoReset } from '../types/GetRetiroInfoType';

export const getRetiroInfoRequest = ( payload: GetRetiroInfoRequestPayload ): GetRetiroInfoRequest => ({
    type: GET_RETIRO_INFO_REQUEST,
    payload    
});

export const getRetiroInfoRecieve = ( payload: GetRetiroInfoReceivePayload ): GetRetiroInfoReceive => ({
    type: GET_RETIRO_INFO_RECEIVE,
    payload
});

export const getRetiroInfoError = ( payload: GetRetiroInfoErrorPayload ): GetRetiroInfoError => ({
    type: GET_RETIRO_INFO_ERROR,
    payload,
}); 

export const getRetiroInfoReset = ( payload: GetRetiroInfoResetPayload ): GetRetiroInfoReset => ({
    type: RESET_STATE,
    payload,
});
