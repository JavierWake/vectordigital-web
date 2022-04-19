import * as actionTypes from '../actions/actionTypes';
import { GetAlertasEventoState, GetAlertasEventoActions } from '../types/GetAlertasEventoType';

const initialState: GetAlertasEventoState = {
    loading: false,
    getAlertasEventoRespuesta: {
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

const getAlertasEventoReducer = ( state = initialState, action: GetAlertasEventoActions ) => {
    switch(action.type){
        case actionTypes.GET_ALERTAS_EVENTO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ALERTAS_EVENTO_RECEIVE:
            return {...state, loading: false, getAlertasEventoRespuesta: action.payload.getAlertasEventoRespuesta, error: null};

        case actionTypes.GET_ALERTAS_EVENTO_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getAlertasEventoReducer;