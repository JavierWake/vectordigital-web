import { GET_ALERTAS_MI_POSICION_REQUEST, GET_ALERTAS_MI_POSICION_RECEIVE, GET_ALERTAS_MI_POSICION_ERROR, RESET_STATE_ALERTAS_MI_POSICION } from '../actions/actionTypes';
import { GetAlertasMiPosicionRequest, GetAlertasMiPosicionReceive, GetAlertasMiPosicionError, GetAlertasMiPosicionRequestPayload, GetAlertasMiPosicionReceivePayload, GetAlertasMiPosicionErrorPayload, GetAlertasMiPosicionResetPayload, GetAlertasMiPosicionReset } from '../types/GetAlertasMiPosicionType';

export const getAlertasMiPosicionRequest = ( payload: GetAlertasMiPosicionRequestPayload ): GetAlertasMiPosicionRequest => ({
    type: GET_ALERTAS_MI_POSICION_REQUEST,
    payload    
});

export const getAlertasMiPosicionRecieve = ( payload: GetAlertasMiPosicionReceivePayload ): GetAlertasMiPosicionReceive => ({
    type: GET_ALERTAS_MI_POSICION_RECEIVE,
    payload
});

export const getAlertasMiPosicionError = ( payload: GetAlertasMiPosicionErrorPayload ): GetAlertasMiPosicionError => ({
    type: GET_ALERTAS_MI_POSICION_ERROR,
    payload,
}); 

export const getAlertasMiPosicionReset = ( payload: GetAlertasMiPosicionResetPayload ): GetAlertasMiPosicionReset => ({
    type: RESET_STATE_ALERTAS_MI_POSICION,
    payload,
}); 
