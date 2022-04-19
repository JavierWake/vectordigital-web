import * as actionTypes from '../actions/actionTypes';
import { FondosNuevaFamiliasState, FondosNuevaFamiliasActions } from '../types/FondosNuevaFamiliasTypes';

const initialState: FondosNuevaFamiliasState = {
    loading: false,
    fondosNuevaFamiliasRespuesta: {
        ierror: 0,
        cerror: "",
        dsFondos: {
            dsFondos: {
                tdsFamilia: [],
            },
        },
    },
    error: null,
    message: "",
    params: [],
}

const fondosNuevaFamiliasReducer = ( state = initialState, action: FondosNuevaFamiliasActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_NUEVA_FAMILIAS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_NUEVA_FAMILIAS_RECEIVE:
            return {...state, loading: false, fondosNuevaFamiliasRespuesta: action.payload.fondosNuevaFamiliasRespuesta, error: null};

        case actionTypes.GET_FONDOS_NUEVA_FAMILIAS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosNuevaFamiliasReducer;