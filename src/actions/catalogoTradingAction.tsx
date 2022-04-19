import { GET_CATALOGO_TRADING_REQUEST, GET_CATALOGO_TRADING_RECEIVE, GET_CATALOGO_TRADING_ERROR } from '../actions/actionTypes';
import { CatalogoTradingRequest, CatalogoTradingReceive, CatalogoTradingError, CatalogoTradingRequestPayload, CatalogoTradingReceivePayload, CatalogoTradingErrorPayload } from '../types/CatalogoTradingTypes';

export const catalogoTradingRequest = ( payload: CatalogoTradingRequestPayload ): CatalogoTradingRequest => ({
    type: GET_CATALOGO_TRADING_REQUEST,
    payload    
});

export const catalogoTradingRecieve = ( payload: CatalogoTradingReceivePayload ): CatalogoTradingReceive => ({
    type: GET_CATALOGO_TRADING_RECEIVE,
    payload
});

export const catalogoTradingError = ( payload: CatalogoTradingErrorPayload ): CatalogoTradingError => ({
    type: GET_CATALOGO_TRADING_ERROR,
    payload,
}); 