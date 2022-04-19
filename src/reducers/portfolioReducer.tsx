import * as actionTypes from '../actions/actionTypes';
import {dsPortafolioActions, PortfolioStatus} from '../types/PortfolioTypes';

const initialState: PortfolioStatus = {
    loading: false,
    dsPortafolio: {
        tdsPortafolioFd: [
            {
                Cuenta: 0,
                Emisora: "",
                Serie: "",
                Descripcion: "",
                TitulosDisponibles: 0,
                TitulosVenta: 0,
                TitulosBloqueados: 0,
                CostoPromedio: 0,
                CostoCompra: 0,
                UltimoPrecio: 0,
                Utilidad: 0,
                UtilidadPorc: 0,
                ValorMercado: 0,
                EmisoraEncode: "",
                Importe: 0,

            }
        ], 
        tdsPortafolioCap: [], 
        tdsPortafolioMd: []
    },
    emisorasRefinitiv: "",
    tradingData: [
        {
            descripcion: "",
            titulos: "",
        }
    ],
    error: "",
    message: "",
    params: [],
}

const portfolioReducer = ( state = initialState, action: dsPortafolioActions ) => {
    switch(action.type){
        case actionTypes.GET_POSITION_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_POSITION_RECEIVE:
            return {...state, loading: false, dsPortafolio: action.payload.dsPortafolio, emisorasRefinitiv: action.payload.emisorasRefinitiv, tradingData: action.payload.tradingData, error: "" };

        case actionTypes.GET_POSITION_ERROR:
            return { ...state, loading: false, dsPortafolio: {tdsPortafolioFd: [], tdsPortafolioCap: []}, tradingData: initialState.tradingData, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default portfolioReducer;