import { GET_FONDOS_MONITOR_REQUEST, GET_FONDOS_MONITOR_RECEIVE, GET_FONDOS_MONITOR_ERROR } from '../actions/actionTypes';
import { GetFondosMonitorRequest, GetFondosMonitorReceive, GetFondosMonitorError, GetFondosMonitorRequestPayload, GetFondosMonitorReceivePayload, GetFondosMonitorErrorPayload } from '../types/FondosMonitorType';

export const getFondosMonitorRequest = ( payload: GetFondosMonitorRequestPayload ): GetFondosMonitorRequest => ({
    type: GET_FONDOS_MONITOR_REQUEST,
    payload    
});

export const getFondosMonitorRecieve = ( payload: GetFondosMonitorReceivePayload ): GetFondosMonitorReceive => ({
    type: GET_FONDOS_MONITOR_RECEIVE,
    payload
});

export const getFondosMonitorError = ( payload: GetFondosMonitorErrorPayload ): GetFondosMonitorError => ({
    type: GET_FONDOS_MONITOR_ERROR,
    payload,
}); 