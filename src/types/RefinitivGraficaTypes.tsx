import { GET_REFINITIV_GRAFICA_REQUEST, GET_REFINITIV_GRAFICA_RECEIVE, GET_REFINITIV_GRAFICA_ERROR } from '../actions/actionTypes';

export interface RefinitivGraficaState {
    loading: boolean;
    refinitivGrafica: string;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetRefinitivGraficaRequestPayload {
    message: string;
    params: string[];
}

export interface GetRefinitivGraficaReceivePayload {
    refinitivGrafica: string;
}

export interface GetRefinitivGraficaErrorPayload {
    error: string | null;
}

export interface GetRefinitivGraficaRequest {
    type: typeof GET_REFINITIV_GRAFICA_REQUEST;
    payload: GetRefinitivGraficaRequestPayload;
}

export interface GetRefinitivGraficaReceive {
    type: typeof GET_REFINITIV_GRAFICA_RECEIVE;
    payload: GetRefinitivGraficaReceivePayload;
}

export interface GetRefinitivGraficaError {
    type: typeof GET_REFINITIV_GRAFICA_ERROR;
    payload: GetRefinitivGraficaErrorPayload;
}

export type RefinitivGraficaActions = 
| GetRefinitivGraficaRequest
| GetRefinitivGraficaReceive
| GetRefinitivGraficaError;
