import * as actionTypes from '../actions/actionTypes';
import { PutAlertasEstatusState, PutAlertasEstatusActions } from '../types/PutAlertasEstatusType';

const initialState: PutAlertasEstatusState = {
    loading: false,
    putAlertasEstatusRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const putAlertasEstatusReducer = ( state = initialState, action: PutAlertasEstatusActions ) => {
    switch(action.type){
        case actionTypes.PUT_ALERTAS_ESTATUS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_ALERTAS_ESTATUS_RECEIVE:
            return {...state, loading: false, putAlertasEstatusRespuesta: action.payload.putAlertasEstatusRespuesta, error: null};

        case actionTypes.PUT_ALERTAS_ESTATUS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default putAlertasEstatusReducer;