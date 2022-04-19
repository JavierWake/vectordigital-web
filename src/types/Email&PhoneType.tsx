import { POST_EMAIL_PHONE_SEND, POST_EMAIL_PHONE_RECEIVE, POST_EMAIL_PHONE_ERROR } from '../actions/actionTypes';

export interface respuestaApiAuth{
    ierror: number;
    cerror: string;
}

export interface Email_PhoneState {
    loading: boolean;
    error: string | null; 
    respuesta: respuestaApiAuth;           
    message: string;
    params: string;
}

export interface Email_PhoneSendPayload {
    message: string;
    params: string[];
}

export interface Email_PhoneRecievePayload{
    respuesta: respuestaApiAuth;
}

export interface Email_PhoneErrorPayload {
    error: string;
}

export interface Email_PhoneSend {
    type: typeof POST_EMAIL_PHONE_SEND;
    payload: Email_PhoneSendPayload;
}

export type Email_PhoneReceive = {
    type: typeof POST_EMAIL_PHONE_RECEIVE;
    payload: Email_PhoneRecievePayload;
};

export type Email_PhoneError = {
    type: typeof POST_EMAIL_PHONE_ERROR;
    payload: Email_PhoneErrorPayload;
};

export type Email_PhoneActions = 
| Email_PhoneSend
| Email_PhoneReceive
| Email_PhoneError;



