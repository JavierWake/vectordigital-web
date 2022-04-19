import { DELETE_ALERTAS_EVENTO_BAJA_REQUEST, DELETE_ALERTAS_EVENTO_BAJA_RECEIVE, DELETE_ALERTAS_EVENTO_BAJA_ERROR } from '../actions/actionTypes';
import { DeleteAlertasEventoBajaRequest, DeleteAlertasEventoBajaReceive, DeleteAlertasEventoBajaError, DeleteAlertasEventoBajaRequestPayload, DeleteAlertasEventoBajaReceivePayload, DeleteAlertasEventoBajaErrorPayload } from '../types/DeleteAlertasEventoBajaType';

export const deleteAlertasEventoBajaRequest = ( payload: DeleteAlertasEventoBajaRequestPayload ): DeleteAlertasEventoBajaRequest => ({
    type: DELETE_ALERTAS_EVENTO_BAJA_REQUEST,
    payload    
});

export const deleteAlertasEventoBajaRecieve = ( payload: DeleteAlertasEventoBajaReceivePayload ): DeleteAlertasEventoBajaReceive => ({
    type: DELETE_ALERTAS_EVENTO_BAJA_RECEIVE,
    payload
});

export const deleteAlertasEventoBajaError = ( payload: DeleteAlertasEventoBajaErrorPayload ): DeleteAlertasEventoBajaError => ({
    type: DELETE_ALERTAS_EVENTO_BAJA_ERROR,
    payload,
}); 