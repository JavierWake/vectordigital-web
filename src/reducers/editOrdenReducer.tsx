import * as actionTypes from '../actions/actionTypes';
import {EditOrdenActions, EditOrdenState} from '../types/EditOrdenTypes';

const initialState: EditOrdenState = {
    loading: false,
    response: {
        ierror: 0,
        cerror: "",
        dsmodificacion: {
            tdsmodificacion: "",
        }
    },
    error: null,
    message: "",
    params: [],
}

const editOrdenReducer = ( state = initialState, action: EditOrdenActions ) => {
    switch(action.type){
        case actionTypes.POST_ORDEN_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_ORDEN_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_ORDEN_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: "", dsmodificacion: { tdsModificacion: "", } }, error: action.payload.error };
        
        case actionTypes.RESET_STATE_MODIF_CANCEL_ORDENES:
            //console.log("estado editOrden reseteado en reducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default editOrdenReducer;