import * as actionTypes from '../actions/actionTypes';
import { FondosFamDistribucionState, FondosFamDistribucionActions } from '../types/FondosFamDistribucionTypes';

const initialState: FondosFamDistribucionState = {
    loading: false,
    fondosFamDistribucionRespuesta: {
        ierror: 0,
        cerror: "", 
        data: {
            Distribucion: {
                Familias: [],
                Distribucion: [],
            },
        },
    },
    error: null,
    message: "",
    params: [],
}

const fondosFamDistribucionReducer = ( state = initialState, action: FondosFamDistribucionActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_FAM_DISTRIBUCION_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_FAM_DISTRIBUCION_RECEIVE:
            return {...state, loading: false, fondosFamDistribucionRespuesta: action.payload.fondosFamDistribucionRespuesta, error: null};

        case actionTypes.GET_FONDOS_FAM_DISTRIBUCION_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosFamDistribucionReducer;