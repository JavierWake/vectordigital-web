import { POST_PASSWORDPOST_SEND, POST_PASSWORDPOST_RECEIVE, POST_PASSWORDPOST_ERROR } from './actionTypes';
import { PasswordPostSend, PasswordPostSendPayload, PasswordPostReceive, PasswordPostError, PasswordPostErrorPayload, PasswordPostRecievePayload } from '../types/PasswordPostType';

export const postPasswordPostSend = (payload: PasswordPostSendPayload): PasswordPostSend => ({
    type: POST_PASSWORDPOST_SEND,
    payload,
    
});

export const postPasswordPostRecieve = (payload:PasswordPostRecievePayload): PasswordPostReceive => ({
    type: POST_PASSWORDPOST_RECEIVE,
    payload,
});

export const postPasswordPostError = ( payload: PasswordPostErrorPayload ): PasswordPostError => ({
    type: POST_PASSWORDPOST_ERROR,
    payload,
}); 