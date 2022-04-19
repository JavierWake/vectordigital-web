import { SECTOR_API_REQUEST, SECTOR_API_RECEIVE, SECTOR_API_ERROR } from '../actions/actionTypes';

export interface ISector {
    ticker: string;
    name: string;
    percecntage: string;
    last:  any;
    currency: string;
}

export interface SectorState {
    loading: boolean;
    sector: ISector[];
    error: string | null;
    message: string;
}

export interface GetSectorReceivePayload {
    sector: ISector[];
}

export interface GetSectorErrorPayload {
    error: string;
}

export interface GetSectorRequestPayload {
    message: string;
}

export interface GetSectorRequest {
    type: typeof SECTOR_API_REQUEST;
    payload: string
}

export type GetSectorReceive = {
    type: typeof SECTOR_API_RECEIVE;
    payload: GetSectorReceivePayload;
};

export type GetSectorError = {
    type: typeof SECTOR_API_ERROR;
    payload: GetSectorErrorPayload;
};

export type SectorActions = 
| GetSectorRequest
| GetSectorReceive
| GetSectorError;