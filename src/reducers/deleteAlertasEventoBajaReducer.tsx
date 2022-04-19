import * as actionTypes from '../actions/actionTypes';
import { DeleteAlertasEventoBajaState, DeleteAlertasEventoBajaActions } from '../types/DeleteAlertasEventoBajaType';

const initialState: DeleteAlertasEventoBajaState = {
    loading: false,
    deleteAlertasEventoBajaRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const deleteAlertasEventoBajaReducer = ( state = initialState, action: DeleteAlertasEventoBajaActions ) => {
    switch(action.type){
        case actionTypes.DELETE_ALERTAS_EVENTO_BAJA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.DELETE_ALERTAS_EVENTO_BAJA_RECEIVE:
            return {...state, loading: false, deleteAlertasEventoBajaRespuesta: action.payload.deleteAlertasEventoBajaRespuesta, error: null};

        case actionTypes.DELETE_ALERTAS_EVENTO_BAJA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default deleteAlertasEventoBajaReducer;