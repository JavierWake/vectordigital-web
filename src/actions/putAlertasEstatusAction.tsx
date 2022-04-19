import { PUT_ALERTAS_ESTATUS_REQUEST, PUT_ALERTAS_ESTATUS_RECEIVE, PUT_ALERTAS_ESTATUS_ERROR } from '../actions/actionTypes';
import { PutAlertasEstatusRequest, PutAlertasEstatusReceive, PutAlertasEstatusError, PutAlertasEstatusRequestPayload, PutAlertasEstatusReceivePayload, PutAlertasEstatusErrorPayload } from '../types/PutAlertasEstatusType';

export const putAlertasEstatusRequest = ( payload: PutAlertasEstatusRequestPayload ): PutAlertasEstatusRequest => ({
    type: PUT_ALERTAS_ESTATUS_REQUEST,
    payload    
});

export const putAlertasEstatusRecieve = ( payload: PutAlertasEstatusReceivePayload ): PutAlertasEstatusReceive => ({
    type: PUT_ALERTAS_ESTATUS_RECEIVE,
    payload
});

export const putAlertasEstatusError = ( payload: PutAlertasEstatusErrorPayload ): PutAlertasEstatusError => ({
    type: PUT_ALERTAS_ESTATUS_ERROR,
    payload,
}); 