import * as actionTypes from '../actions/actionTypes';
import { DeleteAlertasVolatilidadBajaState, DeleteAlertasVolatilidadBajaActions } from '../types/DeleteAlertasVolatilidadBajaType';

const initialState: DeleteAlertasVolatilidadBajaState = {
    loading: false,
    deleteAlertasVolatilidadBajaRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const deleteAlertasVolatilidadBajaReducer = ( state = initialState, action: DeleteAlertasVolatilidadBajaActions ) => {
    switch(action.type){
        case actionTypes.DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.DELETE_ALERTAS_VOLATILIDAD_BAJA_RECEIVE:
            return {...state, loading: false, deleteAlertasVolatilidadBajaRespuesta: action.payload.deleteAlertasVolatilidadBajaRespuesta, error: null};

        case actionTypes.DELETE_ALERTAS_VOLATILIDAD_BAJA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default deleteAlertasVolatilidadBajaReducer;