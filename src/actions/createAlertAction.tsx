import { PUT_ALERT_REQUEST_VARIACION, PUT_ALERT_REQUEST_PRECIO, PUT_ALERT_REQUEST_RANGO, PUT_ALERT_REQUEST_NOTICIA,  PUT_ALERT_RECEIVE,  PUT_ALERT_ERROR } from '../actions/actionTypes';
import {  CreateAlertRequestVariacion, CreateAlertRequestPrecio, CreateAlertRequestRango, CreateAlertRequestNoticia, CreateAlertRequestPayload, CreateAlertReceive, CreateAlertError, CreateAlertErrorPayload } from '../types/CreateAlertTypes';

export const createAlertRequestVariacion = (payload: any): CreateAlertRequestVariacion => ({
    type: PUT_ALERT_REQUEST_VARIACION,
    payload
    
});

export const createAlertRequestPecio = (payload: CreateAlertRequestPayload): CreateAlertRequestPrecio => ({
    type: PUT_ALERT_REQUEST_PRECIO,
    payload
    
});

export const createAlertRequestRango = (payload: CreateAlertRequestPayload): CreateAlertRequestRango => ({
    type: PUT_ALERT_REQUEST_RANGO,
    payload
    
});

export const createAlertRequestNoticia = (payload: CreateAlertRequestPayload): CreateAlertRequestNoticia => ({
    type: PUT_ALERT_REQUEST_NOTICIA,
    payload
    
});


export const createAlertRecieve = (): CreateAlertReceive => ({
    type: PUT_ALERT_RECEIVE
});

export const createAlertError = ( payload: CreateAlertErrorPayload ): CreateAlertError => ({
    type: PUT_ALERT_ERROR,
    payload,
}); 