import { GET_SELL_TRADE_DATA_REQUEST, GET_SELL_TRADE_DATA_RECEIVE, GET_SELL_TRADE_DATA_ERROR } from '../actions/actionTypes';
import { sellTradeDataRequest, sellTradeDataReceive, sellTradeDataError, sellTradeDataRequestPayload, sellTradeDataErrorPayload, sellTradeDataReceivePayload } from '../types/SellTradeDataType';

export const getSellTradeDataRequest = (payload: sellTradeDataRequestPayload): sellTradeDataRequest => ({
    type: GET_SELL_TRADE_DATA_REQUEST,
    payload    
});

export const getSellTradeDataRecieve = ( payload: sellTradeDataReceivePayload ): sellTradeDataReceive => ({
    type: GET_SELL_TRADE_DATA_RECEIVE,
    payload
});

export const getSellTradeDataError = ( payload: sellTradeDataErrorPayload ): sellTradeDataError => ({
    type: GET_SELL_TRADE_DATA_ERROR,
    payload,
}); 