import { QUOTES_DATA_REQUEST, QUOTES_DATA_RECEIVE, QUOTES_DATA_ERROR } from '../actions/actionTypes';

export interface IQuotesData {
    ticker: string;
    name: string;
    actual: string;
    v_max: string;
    v_min: string;
    buy: string;
    sell: string;
    buy_vol: string;
    sell_vol: string;
    percentage: any;
    vol: string;
    points: string;
    initial: string;
    trade_time: string;
    icon: any;
}

export interface QuotesState {
    loading: boolean;
    quotesList: IQuotesData[];
    error: string | null;
    message: string[];
    companies: string;
}


export interface GetQuotesReceivePayload {
    quotesList: IQuotesData[];
}

export interface GetQuotesErrorPayload {
    error: string | null;
}

export interface GetQuotesRequest {
    type: typeof QUOTES_DATA_REQUEST;
    payload: string[];
}

export interface GetQuotesReceive {
    type: typeof QUOTES_DATA_RECEIVE;
    payload: GetQuotesReceivePayload;
}

export interface GetQuotesError {
    type: typeof QUOTES_DATA_ERROR;
    payload: GetQuotesErrorPayload;
}

export type QuotesActions = 
| GetQuotesRequest
| GetQuotesReceive
| GetQuotesError;
