import { GET_COMMODITIES_REQUEST, GET_COMMODITIES_RECEIVE, GET_COMMODITIES_ERROR } from '../actions/actionTypes';


export interface IndicesArray{
    ric: string;
    name: string;
    precio: number;
    variacion: string;
    descVariacion: string;
    completeName: string;
}

export interface IResponse{
    indices: IndicesArray[];
    fx: IndicesArray[];
    commodities: IndicesArray[];
}

export interface CommoditiesState {
    loading: boolean;
    response: IResponse;
    error: string | null;
    message: string;
}

export interface GetCommoditiesReceivePayload {
    response: IResponse;
    error: string;
}

export interface GetCommoditiesErrorPayload {
    error: string;
}

export interface GetCommoditiesRequestPayload {
    message: string;
}

export interface GetCommoditiesRequest {
    type: typeof GET_COMMODITIES_REQUEST;
    payload: GetCommoditiesRequestPayload;
}

export type GetCommoditiesReceive = {
    type: typeof GET_COMMODITIES_RECEIVE;
    payload: GetCommoditiesReceivePayload;
};

export type GetCommoditiesError = {
    type: typeof GET_COMMODITIES_ERROR;
    payload: GetCommoditiesErrorPayload;
};

export type CommoditiesActions = 
| GetCommoditiesRequest
| GetCommoditiesReceive
| GetCommoditiesError;