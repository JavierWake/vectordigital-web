import * as actionTypes from '../actions/actionTypes';
import { RefinitivGraficaState, RefinitivGraficaActions } from '../types/RefinitivGraficaTypes';

const initialState: RefinitivGraficaState = {
    loading: false,
    refinitivGrafica: "",
    error: null,
    message: "",
    params: [],
}

const refinitivGraficaReducer = ( state = initialState, action: RefinitivGraficaActions ) => {
    switch(action.type){
        case actionTypes.GET_REFINITIV_GRAFICA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_REFINITIV_GRAFICA_RECEIVE:
            return {...state, loading: false, refinitivGrafica: action.payload.refinitivGrafica, error: null};

        case actionTypes.GET_REFINITIV_GRAFICA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default refinitivGraficaReducer;