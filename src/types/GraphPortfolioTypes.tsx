import { GET_PORTFOLIO_REQUEST, GET_PORTFOLIO_RECEIVE, GET_PORTFOLIO_ERROR, GET_VALUE_RECEIVE } from '../actions/actionTypes';

export interface IGraphPortfolio {
    fecha: string;
    tenencia: number;
}

export interface IValuePortfolio {
    valorPortafolio: number;
    rend: number;
}

export interface GraphPortfolioStatus {
    loading: boolean;
    graphPortfolioMonth1: IGraphPortfolio[];
    valuePortfolio: IValuePortfolio[];
    error: string | null;
    message: string;
    params: string[];
}

export interface GraphPortfolioReceivePayload {
    graphPortfolioMonth1: IGraphPortfolio[];
}

export interface GraphPortfolioErrorPayload {
    error: any | null;
}

export interface GraphPortfolioRequestPayload {
    message: string;
    params: string[];
}

export interface GraphPortfolioRequest {
    type: typeof GET_PORTFOLIO_REQUEST;
    payload: GraphPortfolioRequestPayload;
}

export type GraphPortfolioReceive = {
    type: typeof GET_PORTFOLIO_RECEIVE;
    payload: GraphPortfolioReceivePayload;
};

export type GraphPortfolioError = {
    type: typeof GET_PORTFOLIO_ERROR;
    payload: GraphPortfolioErrorPayload;
};

///////

export interface ValuePortfolioReceivePayload {
    valuePortfolio: IValuePortfolio[];
}


export type ValuePortfolioReceive = {
    type: typeof GET_VALUE_RECEIVE;
    payload: ValuePortfolioReceivePayload;
};

export type GraphPortfolioActions = 
| GraphPortfolioRequest
| GraphPortfolioReceive
| ValuePortfolioReceive
| GraphPortfolioError;

