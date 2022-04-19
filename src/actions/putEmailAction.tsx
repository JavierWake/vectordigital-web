import { PUT_EMAIL_REQUEST, PUT_EMAIL_RECEIVE, PUT_EMAIL_ERROR } from '../actions/actionTypes';
import { PutEmailRequest, PutEmailReceive, PutEmailError, PutEmailRequestPayload, PutEmailReceivePayload, PutEmailErrorPayload } from '../types/PutEmailType';

export const putEmailRequest = ( payload: PutEmailRequestPayload ): PutEmailRequest => ({
    type: PUT_EMAIL_REQUEST,
    payload    
});

export const putEmailRecieve = ( payload: PutEmailReceivePayload ): PutEmailReceive => ({
    type: PUT_EMAIL_RECEIVE,
    payload
});

export const putEmailError = ( payload: PutEmailErrorPayload ): PutEmailError => ({
    type: PUT_EMAIL_ERROR,
    payload,
}); 