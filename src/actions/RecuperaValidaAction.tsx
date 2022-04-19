import { POST_RECUPERA_VALIDA_SEND, POST_RECUPERA_VALIDA_RECEIVE, POST_RECUPERA_VALIDA_ERROR } from './actionTypes';
import { Recupera_ValidaSend, Recupera_ValidaSendPayload, Recupera_ValidaReceive, Recupera_ValidaError, Recupera_ValidaErrorPayload, Recupera_ValidaRecievePayload } from '../types/RecuperaValidaTypes';

export const postRecupera_ValidaSend = (payload: Recupera_ValidaSendPayload): Recupera_ValidaSend => ({
    type: POST_RECUPERA_VALIDA_SEND,
    payload,
    
});

export const postRecupera_ValidaRecieve = (payload:Recupera_ValidaRecievePayload): Recupera_ValidaReceive => ({
    type: POST_RECUPERA_VALIDA_RECEIVE,
    payload,
});

export const postRecupera_ValidaError = ( payload: Recupera_ValidaErrorPayload ): Recupera_ValidaError => ({
    type: POST_RECUPERA_VALIDA_ERROR,
    payload,
}); 