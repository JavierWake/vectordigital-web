import { GET_CONSULTA_SALDOS_REQUEST, GET_CONSULTA_SALDOS_RECEIVE, GET_CONSULTA_SALDOS_ERROR } from '../actions/actionTypes';
import { GetConsultaSaldosRequest, GetConsultaSaldosReceive, GetConsultaSaldosError, GetConsultaSaldosRequestPayload, GetConsultaSaldosReceivePayload, GetConsultaSaldosErrorPayload } from '../types/GetConsultaSaldosType';

export const getConsultaSaldosRequest = ( payload: GetConsultaSaldosRequestPayload ): GetConsultaSaldosRequest => ({
    type: GET_CONSULTA_SALDOS_REQUEST,
    payload    
});

export const getConsultaSaldosRecieve = ( payload: GetConsultaSaldosReceivePayload ): GetConsultaSaldosReceive => ({
    type: GET_CONSULTA_SALDOS_RECEIVE,
    payload
});

export const getConsultaSaldosError = ( payload: GetConsultaSaldosErrorPayload ): GetConsultaSaldosError => ({
    type: GET_CONSULTA_SALDOS_ERROR,
    payload,
}); 