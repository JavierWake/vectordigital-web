import { POST_RECUPERA_ACTUALIZA_SEND, POST_RECUPERA_ACTUALIZA_RECEIVE, POST_RECUPERA_ACTUALIZA_ERROR } from './actionTypes';
import { Recupera_ActualizaSend, Recupera_ActualizaSendPayload, Recupera_ActualizaReceive, Recupera_ActualizaError, Recupera_ActualizaErrorPayload, Recupera_ActualizaRecievePayload } from '../types/RecuperaActualizaType';

export const postRecupera_ActualizaSend = (payload: Recupera_ActualizaSendPayload): Recupera_ActualizaSend => ({
    type: POST_RECUPERA_ACTUALIZA_SEND,
    payload,
    
});

export const postRecupera_ActualizaRecieve = (payload:Recupera_ActualizaRecievePayload): Recupera_ActualizaReceive => ({
    type: POST_RECUPERA_ACTUALIZA_RECEIVE,
    payload,
});

export const postRecupera_ActualizaError = ( payload: Recupera_ActualizaErrorPayload ): Recupera_ActualizaError => ({
    type: POST_RECUPERA_ACTUALIZA_ERROR,
    payload,
}); 