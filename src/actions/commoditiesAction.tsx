import { GET_COMMODITIES_REQUEST, GET_COMMODITIES_RECEIVE, GET_COMMODITIES_ERROR } from './actionTypes';
import { GetCommoditiesRequest, GetCommoditiesRequestPayload, GetCommoditiesReceive, GetCommoditiesReceivePayload, GetCommoditiesError, GetCommoditiesErrorPayload } from '../types/CommoditiesType';

export const getCommoditiesRequest = (payload: GetCommoditiesRequestPayload): GetCommoditiesRequest => ({
    type: GET_COMMODITIES_REQUEST,
    payload
});

export const getCommoditiesReceive = ( payload: GetCommoditiesReceivePayload ): GetCommoditiesReceive => ({
    type: GET_COMMODITIES_RECEIVE,
    payload,
});

export const getCommoditiesError = ( payload: GetCommoditiesErrorPayload ): GetCommoditiesError => ({
    type: GET_COMMODITIES_ERROR,
    payload,
});