import * as actionTypes from '../actions/actionTypes';
import { FolioDataActions, FolioDataState } from '../types/FolioDataTypes';

const initialState: FolioDataState = { 
    loading: false,
    error: null,
    message: "",
    params: [],
    response: { ierror: 0, cerror: "", folio: 0, posicion: 0 },
}

const folioDataReducer = ( state = initialState, action: FolioDataActions ) => {
    switch(action.type){
        case actionTypes.GET_FOLIO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.GET_FOLIO_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_FOLIO_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: "", folio: 0, posicion: 0 }, error: action.payload.error };
        
        case actionTypes.RESET_STATE_TARJETA_FOLIO:
            //console.log("reset state tarjeta folio folioDataReducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default folioDataReducer;