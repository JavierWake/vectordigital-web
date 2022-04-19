import { GET_BUY_TRADE_DATA_REQUEST, GET_BUY_TRADE_DATA_RECEIVE, GET_BUY_TRADE_DATA_ERROR } from '../actions/actionTypes';
import { buyTradeDataRequest, buyTradeDataReceive, buyTradeDataError, buyTradeDataRequestPayload, buyTradeDataErrorPayload, buyTradeDataReceivePayload } from '../types/BuyTradeDataType';

export const getBuyTradeDataRequest = (payload: buyTradeDataRequestPayload): buyTradeDataRequest => ({
    type: GET_BUY_TRADE_DATA_REQUEST,
    payload    
});

export const getBuyTradeDataRecieve = ( payload: buyTradeDataReceivePayload ): buyTradeDataReceive => ({
    type: GET_BUY_TRADE_DATA_RECEIVE,
    payload
});

export const getBuyTradeDataError = ( payload: buyTradeDataErrorPayload ): buyTradeDataError => ({
    type: GET_BUY_TRADE_DATA_ERROR,
    payload,
}); 