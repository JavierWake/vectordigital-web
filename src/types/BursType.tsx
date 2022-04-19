import { GET_BURS_REQUEST, GET_BURS_RECIEVE, GET_BURS_ERROR } from '../actions/actionTypes';

export interface IBurs{
    ticker: string;
}

export interface BursState {
    loading: boolean;
    error: string | null;
    message: any;
    listTicker: IBurs[];
}


export interface GetBursReceivePayload {
    listTicker: IBurs[];
}

export interface GetBursErrorPayload {
    error: string;
}

export interface GetBursRequestPayload {
    message: any;
}

export interface GetBursRequest {
    type: typeof GET_BURS_REQUEST;
    payload: any;
}

export interface GetBursReceive {
    type: typeof GET_BURS_RECIEVE;
    payload: GetBursReceivePayload;
}

export interface GetBursError {
    type: typeof GET_BURS_ERROR;
    payload: GetBursErrorPayload;
}

export type BursActions = 
| GetBursRequest
| GetBursReceive
| GetBursError;