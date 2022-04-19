import { GET_PROFILE_REQUEST, GET_PROFILE_RECEIVE, GET_PROFILE_ERROR } from '../actions/actionTypes';
import { GetProfileDataRequest, GetProfileDataRequestPayload, GetProfileDataReceive, GetProfileDataReceivePayload, GetProfileDataError, GetProfileDataErrorPayload } from '../types/ProfileIssuerTypes';

export const getProfileDataRequest = (payload: GetProfileDataRequestPayload): GetProfileDataRequest => ({
    type: GET_PROFILE_REQUEST,
    payload
    
});

export const getProfileDataRecieve = ( payload: GetProfileDataReceivePayload ): GetProfileDataReceive => ({
    type: GET_PROFILE_RECEIVE,
    payload,
});

export const getProfileDataError = ( payload: GetProfileDataErrorPayload ): GetProfileDataError => ({
    type: GET_PROFILE_ERROR,
    payload,
}); 