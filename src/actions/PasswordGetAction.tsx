import { GET_PASSWORDGET_REQUEST, GET_PASSWORDGET_RECEIVE, GET_PASSWORDGET_ERROR, RESET_STATE_PASSWORD, } from '../actions/actionTypes';
import { PasswordGetRequest, PasswordGetReceive, PasswordGetError, PasswordGetRequestPayload, PasswordGetReceivePayload, PasswordGetErrorPayload, PasswordResetPayload, PasswordReset } from '../types/PasswordGetType';

export const getPasswordGetRequest = ( payload: PasswordGetRequestPayload ): PasswordGetRequest => ({
    type: GET_PASSWORDGET_REQUEST,
    payload    
});

export const getPasswordGetRecieve = ( payload: PasswordGetReceivePayload ): PasswordGetReceive => ({
    type: GET_PASSWORDGET_RECEIVE,
    payload
});

export const getPasswordGetError = ( payload: PasswordGetErrorPayload ): PasswordGetError => ({
    type: GET_PASSWORDGET_ERROR,
    payload,
});

export const getPasswordReset = ( payload: PasswordResetPayload ): PasswordReset => ({
    type: RESET_STATE_PASSWORD,
    payload,
}); 