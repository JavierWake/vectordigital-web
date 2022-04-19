import { GET_EMAIL_REQUEST, GET_EMAIL_RECEIVE, GET_EMAIL_ERROR } from '../actions/actionTypes';
import { GetEmailRequest, GetEmailReceive, GetEmailError, GetEmailRequestPayload, GetEmailReceivePayload, GetEmailErrorPayload } from '../types/GetEmailType';

export const getEmailRequest = ( payload: GetEmailRequestPayload ): GetEmailRequest => ({
    type: GET_EMAIL_REQUEST,
    payload    
});

export const getEmailRecieve = ( payload: GetEmailReceivePayload ): GetEmailReceive => ({
    type: GET_EMAIL_RECEIVE,
    payload
});

export const getEmailError = ( payload: GetEmailErrorPayload ): GetEmailError => ({
    type: GET_EMAIL_ERROR,
    payload,
}); 