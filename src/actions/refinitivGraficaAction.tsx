import { GET_REFINITIV_GRAFICA_REQUEST, GET_REFINITIV_GRAFICA_RECEIVE, GET_REFINITIV_GRAFICA_ERROR } from '../actions/actionTypes';
import { GetRefinitivGraficaRequest, GetRefinitivGraficaReceive, GetRefinitivGraficaError, GetRefinitivGraficaRequestPayload, GetRefinitivGraficaReceivePayload, GetRefinitivGraficaErrorPayload } from '../types/RefinitivGraficaTypes';

export const getRefinitivGraficaRequest = ( payload: GetRefinitivGraficaRequestPayload ): GetRefinitivGraficaRequest => ({
    type: GET_REFINITIV_GRAFICA_REQUEST,
    payload    
});

export const getRefinitivGraficaRecieve = ( payload: GetRefinitivGraficaReceivePayload ): GetRefinitivGraficaReceive => ({
    type: GET_REFINITIV_GRAFICA_RECEIVE,
    payload
});

export const getRefinitivGraficaError = ( payload: GetRefinitivGraficaErrorPayload ): GetRefinitivGraficaError => ({
    type: GET_REFINITIV_GRAFICA_ERROR,
    payload,
}); 