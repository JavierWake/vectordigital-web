import { LIST_STATION_REQUEST, LIST_STATION_RECEIVE, LIST_STATION_ERROR } from './actionTypes'
import { GetStationListError, GetStationListErrorPayload, GetStationListReceive, GetStationListReceivePayload, GetStationListRequest } from '../types/StationListTypes';


export const getStationListRequest = (payload: string): GetStationListRequest => ({
    type: LIST_STATION_REQUEST,
    payload
    
});

export const getStationListRecieve = ( payload: GetStationListReceivePayload ): GetStationListReceive => ({
    type: LIST_STATION_RECEIVE,
    payload,
});

export const getStationListError = ( payload: GetStationListErrorPayload ): GetStationListError => ({
    type: LIST_STATION_ERROR,
    payload,
}); 
