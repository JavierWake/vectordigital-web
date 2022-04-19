import { DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST, DELETE_ALERTAS_VOLATILIDAD_BAJA_RECEIVE, DELETE_ALERTAS_VOLATILIDAD_BAJA_ERROR } from '../actions/actionTypes';
import { DeleteAlertasVolatilidadBajaRequest, DeleteAlertasVolatilidadBajaReceive, DeleteAlertasVolatilidadBajaError, DeleteAlertasVolatilidadBajaRequestPayload, DeleteAlertasVolatilidadBajaReceivePayload, DeleteAlertasVolatilidadBajaErrorPayload } from '../types/DeleteAlertasVolatilidadBajaType';

export const deleteAlertasVolatilidadBajaRequest = ( payload: DeleteAlertasVolatilidadBajaRequestPayload ): DeleteAlertasVolatilidadBajaRequest => ({
    type: DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST,
    payload    
});

export const deleteAlertasVolatilidadBajaRecieve = ( payload: DeleteAlertasVolatilidadBajaReceivePayload ): DeleteAlertasVolatilidadBajaReceive => ({
    type: DELETE_ALERTAS_VOLATILIDAD_BAJA_RECEIVE,
    payload
});

export const deleteAlertasVolatilidadBajaError = ( payload: DeleteAlertasVolatilidadBajaErrorPayload ): DeleteAlertasVolatilidadBajaError => ({
    type: DELETE_ALERTAS_VOLATILIDAD_BAJA_ERROR,
    payload,
}); 