import { PUT_ALERTAS_MI_POSICION_REQUEST, PUT_ALERTAS_MI_POSICION_RECEIVE, PUT_ALERTAS_MI_POSICION_ERROR, RESET_STATE_ALERTAS_MI_POSICION } from '../actions/actionTypes';
import { PutAlertasMiPosicionRequest, PutAlertasMiPosicionReceive, PutAlertasMiPosicionError, PutAlertasMiPosicionRequestPayload, PutAlertasMiPosicionReceivePayload, PutAlertasMiPosicionErrorPayload, PutAlertasMiPosicionResetPayload, PutAlertasMiPosicionReset } from '../types/PutAlertasMiPosicionType';

export const putAlertasMiPosicionRequest = ( payload: PutAlertasMiPosicionRequestPayload ): PutAlertasMiPosicionRequest => ({
    type: PUT_ALERTAS_MI_POSICION_REQUEST,
    payload    
});

export const putAlertasMiPosicionRecieve = ( payload: PutAlertasMiPosicionReceivePayload ): PutAlertasMiPosicionReceive => ({
    type: PUT_ALERTAS_MI_POSICION_RECEIVE,
    payload
});

export const putAlertasMiPosicionError = ( payload: PutAlertasMiPosicionErrorPayload ): PutAlertasMiPosicionError => ({
    type: PUT_ALERTAS_MI_POSICION_ERROR,
    payload,
}); 

export const putAlertasMiPosicionReset = ( payload: PutAlertasMiPosicionResetPayload ): PutAlertasMiPosicionReset => ({
    type: RESET_STATE_ALERTAS_MI_POSICION,
    payload,
}); 
