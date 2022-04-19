import { LIST_STATION_REQUEST, LIST_STATION_RECEIVE, LIST_STATION_ERROR } from '../actions/actionTypes';

export interface IStationList {
    ticker: string;
    bmv: string;
    bmvP: string;
    biva: string;
    bibaP: string;
    consolidad: string;
    consoliladoP: string;
    techRules: string;
}

export interface StationListState {
    StationList: IStationList[];
    error: string | null;
    message: string;
    loading: boolean;
}

export interface GetStationListReceivePayload {
    StationList: IStationList[];
}

export interface GetStationListErrorPayload {
    error: string;
}

export interface GetStationListRequest {
    type: typeof LIST_STATION_REQUEST;
    payload: string
}

export type GetStationListReceive = {
    type: typeof LIST_STATION_RECEIVE;
    payload: GetStationListReceivePayload;
};

export type GetStationListError = {
    type: typeof LIST_STATION_ERROR;
    payload: GetStationListErrorPayload;
};

export type StationListActions = 
| GetStationListRequest
| GetStationListReceive
| GetStationListError;