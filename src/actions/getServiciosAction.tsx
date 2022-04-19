import { GET_SERVICIOS_REQUEST, GET_SERVICIOS_RECEIVE, GET_SERVICIOS_ERROR } from '../actions/actionTypes';
import { GetServiciosRequest, GetServiciosReceive, GetServiciosError, GetServiciosRequestPayload, GetServiciosErrorPayload, GetServiciosReceivePayload } from '../types/GetServiciosTypes';

export const getServiciosRequest = (payload: GetServiciosRequestPayload): GetServiciosRequest => ({
    type: GET_SERVICIOS_REQUEST,
    payload    
});

export const getServiciosRecieve = ( payload: GetServiciosReceivePayload ): GetServiciosReceive => ({
    type: GET_SERVICIOS_RECEIVE,
    payload
});

export const getServiciosError = ( payload: GetServiciosErrorPayload ): GetServiciosError => ({
    type: GET_SERVICIOS_ERROR,
    payload,
}); 