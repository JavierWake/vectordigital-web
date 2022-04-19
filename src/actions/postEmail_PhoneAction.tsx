import { POST_EMAIL_PHONE_SEND, POST_EMAIL_PHONE_RECEIVE, POST_EMAIL_PHONE_ERROR } from './actionTypes';
import { Email_PhoneSend, Email_PhoneSendPayload, Email_PhoneReceive, Email_PhoneError, Email_PhoneErrorPayload, Email_PhoneRecievePayload } from '../types/Email&PhoneType';

export const postEmail_PhoneSend = (payload: Email_PhoneSendPayload): Email_PhoneSend => ({
    type: POST_EMAIL_PHONE_SEND,
    payload,
    
});

export const postEmail_PhoneRecieve = (payload:Email_PhoneRecievePayload): Email_PhoneReceive => ({
    type: POST_EMAIL_PHONE_RECEIVE,
    payload,
});

export const postEmail_PhoneError = ( payload: Email_PhoneErrorPayload ): Email_PhoneError => ({
    type: POST_EMAIL_PHONE_ERROR,
    payload,
}); 