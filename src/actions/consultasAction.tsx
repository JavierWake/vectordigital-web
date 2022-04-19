import { GET_CONSULTAS_REQUEST, GET_CONSULTAS_RECEIVE, GET_CONSULTAS_ERROR } from '../actions/actionTypes';
import { ConsultasRequest, ConsultasReceive, ConsultasError, ConsultasRequestPayload, ConsultasErrorPayload, ConsultasReceivePayload } from '../types/ConsultasTypes';

export const getConsultasRequest = (payload: ConsultasRequestPayload): ConsultasRequest => ({
    type: GET_CONSULTAS_REQUEST,
    payload    
});

export const getConsultasRecieve = ( payload: ConsultasReceivePayload ): ConsultasReceive => ({
    type: GET_CONSULTAS_RECEIVE,
    payload
});

export const getConsultasError = ( payload: ConsultasErrorPayload ): ConsultasError => ({
    type: GET_CONSULTAS_ERROR,
    payload,
}); 