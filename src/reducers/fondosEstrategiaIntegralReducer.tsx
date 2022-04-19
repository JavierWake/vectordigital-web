import * as actionTypes from '../actions/actionTypes';
import { FondosEstrategiaIntegralState, FondosEstrategiaIntegralActions } from '../types/FondosEstrategiaIntegralTypes';

const initialState: FondosEstrategiaIntegralState = {
    loading: false,
    fondosEstrategiaIntegralRespuesta: {
        ierror: 0,
        cerror: "", 
        data: {
            tdsFondo: [],
        },
    },
    error: null,
    message: "",
    params: [],
}

const fondosEstrategiaIntegralReducer = ( state = initialState, action: FondosEstrategiaIntegralActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_ESTRATEGIA_INTEGRAL_RECEIVE:
            return {...state, loading: false, fondosEstrategiaIntegralRespuesta: action.payload.fondosEstrategiaIntegralRespuesta, error: null};

        case actionTypes.GET_FONDOS_ESTRATEGIA_INTEGRAL_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosEstrategiaIntegralReducer;