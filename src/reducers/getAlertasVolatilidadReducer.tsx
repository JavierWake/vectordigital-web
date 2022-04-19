import * as actionTypes from '../actions/actionTypes';
import { GetAlertasVolatilidadState, GetAlertasVolatilidadActions } from '../types/GetAlertasVolatilidadType';

const initialState: GetAlertasVolatilidadState = {
    loading: false,
    getAlertasVolatilidadRespuesta: {
        ierror: 0,
        cerror: "",
        dsAlertas: {
            tdsTipoAlerta: [],
            tdsAlerta: [],
        },
    },
    error: null,
    message: "",
    params: [],
}

const getAlertasVolatilidadReducer = ( state = initialState, action: GetAlertasVolatilidadActions ) => {
    switch(action.type){
        case actionTypes.GET_ALERTAS_VOLATILIDAD_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ALERTAS_VOLATILIDAD_RECEIVE:
            return {...state, loading: false, getAlertasVolatilidadRespuesta: action.payload.getAlertasVolatilidadRespuesta, error: null};

        case actionTypes.GET_ALERTAS_VOLATILIDAD_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getAlertasVolatilidadReducer;