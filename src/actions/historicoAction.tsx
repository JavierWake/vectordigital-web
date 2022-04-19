import { GET_HISTORICO_REQUEST, GET_HISTORICO_RECEIVE,  GET_VALUE_RECEIVE, GET_HISTORICO_ERROR, SEND_PORTAFOLIO_VALUE } from '../actions/actionTypes';
import { HistoricoRequest, HistoricoReceive, HistoricoRequestPayload, HistoricoError, HistoricoReceivePayload, HistoricoErrorPayload, sendPortafolioValue, sendPortafolioValuePayload } from '../types/HistoricoTypes';

export const getHistoricoRequest = (payload: HistoricoRequestPayload): HistoricoRequest => ({
    type: GET_HISTORICO_REQUEST,
    payload
    
});

export const getHistoricoRecieve = ( payload: HistoricoReceivePayload ): HistoricoReceive => ({
    type: GET_HISTORICO_RECEIVE,
    payload
});

export const getHistoricoError = ( payload: HistoricoErrorPayload ): HistoricoError => ({
    type: GET_HISTORICO_ERROR,
    payload,
}); 

export const sendPortafolioValueAction = ( payload: sendPortafolioValuePayload ): sendPortafolioValue => ({
    type: SEND_PORTAFOLIO_VALUE,
    payload,
}); 