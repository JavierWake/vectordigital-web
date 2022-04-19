import {DELETE_ALERT_REQUEST, DELETE_ALERT_RECEIVE, DELETE_ALERT_ERROR} from '../actions/actionTypes';
import { DeleteAlertRequest, DeleteAlertReceive, DeleteAlertError, DeleteAlertRequestPayload, DeleteAlertErrorPayload } from '../types/DeleteAlertType';

export const deleteAlertRequest = (payload: DeleteAlertRequestPayload): DeleteAlertRequest => ({
    type: DELETE_ALERT_REQUEST,
    payload
    
});

export const deleteAlertRecieve = (): DeleteAlertReceive => ({
    type: DELETE_ALERT_RECEIVE
});

export const deleteAlertError = ( payload: DeleteAlertErrorPayload ): DeleteAlertError => ({
    type: DELETE_ALERT_ERROR,
    payload,
}); 