import * as actionTypes from '../actions/actionTypes';
import { CatalogoTradingStatus, CatalogoTradingActions } from '../types/CatalogoTradingTypes';

const initialState: CatalogoTradingStatus = {
    loading: false,
    posicionTradingMX: [],
    posicionTradingBIV: [],
    posicionTradingMCO: [],
    emisorasCatalogo: [
        {
            descripcion: "",
            titulos: "",
        }
    ],
    tradingArray: [{
        ISSUER: "",
        descripcion: "",
        titulos: "",
        BID: 0,
        ASK: 0,
        BIDSIZE: 0,
        ASKSIZE: 0,
        TRDPRC_1: 0,
        ADJUST_CLS: 0,
        HIGH_1: 0,
        LOW_1: 0,
        NETCHNG_1: 0,
        PCTCHNG: 0,
        TRDVOL_1: 0,
        ASK_TIM_NS: "",
        BID_TIM_NS: "",
        NUM_MOVES: 0,
    }],
    profundidadArray: [
        {
            ISSUER: "",
            BEST_BID1: 0,
            BEST_BID2: 0,
            BEST_BID3: 0,
            BEST_BID4: 0,
            BEST_BID5: 0,
            BEST_BID6: 0,
            BEST_BID7: 0,
            BEST_BID8: 0,
            BEST_BID9: 0,
            BEST_BID10: 0,
            BEST_BSIZ1: 0,
            BEST_BSIZ2: 0,
            BEST_BSIZ3: 0,
            BEST_BSIZ4: 0,
            BEST_BSIZ5: 0,
            BEST_BSIZ6: 0,
            BEST_BSIZ7: 0,
            BEST_BSIZ8: 0,
            BEST_BSIZ9: 0,
            BEST_BSZ10: 0,
            BEST_ASK1: 0,
            BEST_ASK2: 0,
            BEST_ASK3: 0,
            BEST_ASK4: 0,
            BEST_ASK5: 0,
            BEST_ASK6: 0,
            BEST_ASK7: 0,
            BEST_ASK8: 0,
            BEST_ASK9: 0,
            BEST_ASK10: 0,
            BEST_ASIZ1: 0,
            BEST_ASIZ2: 0,
            BEST_ASIZ3: 0,
            BEST_ASIZ4: 0,
            BEST_ASIZ5: 0,
            BEST_ASIZ6: 0,
            BEST_ASIZ7: 0,
            BEST_ASIZ8: 0,
            BEST_ASIZ9: 0,
            BEST_ASZ10: 0,
        }
    ],
    error: "",
    message: "",
}

const catalogoTradingReducer = ( state = initialState, action: CatalogoTradingActions ) => {
    switch(action.type){
        case actionTypes.GET_CATALOGO_TRADING_REQUEST:
            return { ...state, loading: true, message: action.payload.message,  emisorasCatalogo: action.payload.emisorasCatalogo };
        
        case actionTypes.GET_CATALOGO_TRADING_RECEIVE:
            return { 
                        ...state, loading: false, 
                        posicionTradingMX: action.payload.posicionTradingMX, 
                        posicionTradingBIV: action.payload.posicionTradingBIV, 
                        posicionTradingMCO: action.payload.posicionTradingMCO,
                        tradingArray: action.payload.tradingArray, 
                        profundidadArray: action.payload.profundidadArray,
                        error: ""
                    };

        case actionTypes.GET_CATALOGO_TRADING_ERROR:
            return { 
                        ...state, loading: false, 
                        posicionTradingMX: initialState.posicionTradingMX, 
                        posicionTradingBIV: initialState.posicionTradingBIV, 
                        posicionTradingMCO: initialState.posicionTradingMCO,
                        emisorasCatalogo: initialState.emisorasCatalogo, 
                        tradingArray: initialState.tradingArray, 
                        profundidadArray: initialState.profundidadArray, 
                        error: action.payload.error 
                    };
        
        default: 
            return { ...state };
    }
}

export default catalogoTradingReducer;