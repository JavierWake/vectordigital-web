import { GET_ALERT_REQUEST, GET_ALERT_RECEIVE, GET_ALERT_ERROR } from '../actions/actionTypes';
import { GetAlertGetRequest, GetAlertGetReceive, GetAlertGetReceivePayload, GetAlertGetError, GetAlertGetErrorPayload } from '../types/AlertGet';

export const getAlertRequest = (payload: string): GetAlertGetRequest => ({
    type: GET_ALERT_REQUEST,
    payload
    
});

export const getAlertRecieve = ( payload: GetAlertGetReceivePayload ): GetAlertGetReceive => ({
    type: GET_ALERT_RECEIVE,
    payload,
});

export const getAlertError = ( payload: GetAlertGetErrorPayload ): GetAlertGetError => ({
    type: GET_ALERT_ERROR,
    payload,
}); 
