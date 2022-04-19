import {DELETE_ALERT_REQUEST, DELETE_ALERT_RECEIVE, DELETE_ALERT_ERROR} from '../actions/actionTypes';

export interface DeleteAlertState {
    loading: boolean;
    error: string | null;
    message: string;
}

export interface DeleteAlertRequestPayload {
    message: string;
    params: string;
}

export interface DeleteAlertErrorPayload {
    error: string;
}

export interface DeleteAlertRequest {
    type: typeof DELETE_ALERT_REQUEST;
    payload: DeleteAlertRequestPayload;
}

export type DeleteAlertReceive = {
    type: typeof DELETE_ALERT_RECEIVE;
};

export type DeleteAlertError = {
    type: typeof DELETE_ALERT_ERROR;
    payload: DeleteAlertErrorPayload;
};

export type DeleteFollowActions = 
| DeleteAlertRequest
| DeleteAlertReceive
| DeleteAlertError;