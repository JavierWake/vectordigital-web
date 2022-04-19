import { PUT_SERVICIO_REQUEST, PUT_SERVICIO_RECEIVE, PUT_SERVICIO_ERROR } from '../actions/actionTypes';
import { PutServicioRequest, PutServicioReceive, PutServicioError, PutServicioRequestPayload, PutServicioErrorPayload, PutServicioReceivePayload } from '../types/PutServicioType';

export const putServicioRequest = (payload: PutServicioRequestPayload): PutServicioRequest => ({
    type: PUT_SERVICIO_REQUEST,
    payload    
});

export const putServicioRecieve = ( payload: PutServicioReceivePayload ): PutServicioReceive => ({
    type: PUT_SERVICIO_RECEIVE,
    payload
});

export const putServicioError = ( payload: PutServicioErrorPayload ): PutServicioError => ({
    type: PUT_SERVICIO_ERROR,
    payload,
});