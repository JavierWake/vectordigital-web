import * as actionTypes from '../actions/actionTypes';
import {ListIssuerState, ListIssuerActions} from '../types/ListIssuer';

const initialState: ListIssuerState = {
    loading: false,
    listIssuer: {
        ticker: [],
        bmv: [],
        bmvP: [],
        biva: [],
        bivaP: [],
        consolidado: [],
        consolidadoP: [],
        techRules: [],
    },
    tradingArray: [{ ISSUER: "", BID: 0, ASK: 0, BIDSIZE: 0, ASKSIZE: 0, TRDPRC_1: 0, ADJUST_CLS:0, HIGH_1: 0, LOW_1: 0, NETCHNG_1: 0, PCTCHNG: 0, TRDVOL_1: 0, ASK_TIM_NS: 0, BID_TIM_NS: 0, NUM_MOVES: 0 }],
    profundidadArray: [{
        ISSUER: "",
        BEST_BID1: 0, BEST_BID2: 0, BEST_BID3: 0, BEST_BID4: 0, BEST_BID5: 0, BEST_BID6: 0, BEST_BID7: 0, BEST_BID8: 0, BEST_BID9: 0, BEST_BID10: 0, 
        BEST_BSIZ1: 0, BEST_BSIZ2: 0, BEST_BSIZ3: 0, BEST_BSIZ4: 0, BEST_BSIZ5: 0, BEST_BSIZ6: 0, BEST_BSIZ7: 0, BEST_BSIZ8: 0, BEST_BSIZ9: 0, BEST_BSZ10: 0, 
        BEST_ASK1: 0, BEST_ASK2: 0, BEST_ASK3: 0, BEST_ASK4: 0, BEST_ASK5: 0, BEST_ASK6: 0, BEST_ASK7: 0, BEST_ASK8: 0, BEST_ASK9: 0, BEST_ASK10: 0, 
        BEST_ASIZ1: 0, BEST_ASIZ2: 0, BEST_ASIZ3: 0, BEST_ASIZ4: 0, BEST_ASIZ5: 0, BEST_ASIZ6: 0, BEST_ASIZ7: 0, BEST_ASIZ8: 0, BEST_ASIZ9: 0, BEST_ASZ10: 0, 
    }],
    error: null,
    message: "",
    id: 0,
}

const listIssuerReducer = ( state = initialState, action: ListIssuerActions ) => {
    switch(action.type){
        case actionTypes.GET_LIST_ISSUER_REQUEST:
            return { ...state, loading: true, message: action.payload.message, id: action.payload.id };
        
        case actionTypes.GET_LIST_ISSUER_RECEIVE:
            return {...state, loading: false, listIssuer: action.payload.listIssuer, tradingArray: action.payload.tradingArray, profundidadArray: action.payload.profundidadArray, error: null};

        case actionTypes.GET_LIST_ISSUER_ERROR:
            return { ...state, loading: false, listIssuer: initialState,
                tradingArray: initialState.tradingArray,
                profundidadArray: initialState.profundidadArray,
                error: action.payload.error };
                
        case actionTypes.GET_LIST_ISSUER_RESET:
            //console.log("reset fondosCpaEmisReducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default listIssuerReducer;