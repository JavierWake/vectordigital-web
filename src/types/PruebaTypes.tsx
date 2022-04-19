import { GET_PORTFOLIO_REQUEST, GET_PORTFOLIO_RECEIVE, GET_PORTFOLIO_ERROR } from '../actions/actionTypes';

export interface IGraphPortfolio {
    cuenta: number;
    fecha: string;
    saldoDisp: number;
    saldopend: number;
    tenencia: number;
    tenenciaANR: number;
    tenenciaMC: number;
    tenenciaMD: number;
    tenenciaOB: number;
    tenenciaRF: number;
    tenenciaRV: number;
}

export interface GraphPortfolioStatus {
    loading: boolean;
    graphPortfolio: IGraphPortfolio[];
    error: string | null;
    message: string;
    params: string[];
}

export interface GraphPortfolioReceivePayload {
    graphPortfolio: IGraphPortfolio[];
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

export type GraphPortfolioActions = 
| GraphPortfolioRequest
| GraphPortfolioReceive
| GraphPortfolioError;