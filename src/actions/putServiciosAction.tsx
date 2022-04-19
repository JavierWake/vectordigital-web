import { PUT_SERVICIOS_REQUEST, PUT_SERVICIOS_RECEIVE, PUT_SERVICIOS_ERROR } from '../actions/actionTypes';
import { PutServiciosRequest, PutServiciosReceive, PutServiciosError, PutServiciosRequestPayload, PutServiciosErrorPayload, PutServiciosReceivePayload } from '../types/PutServiciosTypes';

export const putServiciosRequest = (payload: PutServiciosRequestPayload): PutServiciosRequest => ({
    type: PUT_SERVICIOS_REQUEST,
    payload    
});

export const putServiciosRecieve = ( payload: PutServiciosReceivePayload ): PutServiciosReceive => ({
    type: PUT_SERVICIOS_RECEIVE,
    payload
});

export const putServiciosError = ( payload: PutServiciosErrorPayload ): PutServiciosError => ({
    type: PUT_SERVICIOS_ERROR,
    payload,
}); 