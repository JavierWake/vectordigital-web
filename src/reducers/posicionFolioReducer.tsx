import * as actionTypes from '../actions/actionTypes';
import { PosicionFolioActions, PosicionFolioState } from '../types/PosicionFolioTypes';

const initialState: PosicionFolioState = { 
    loading: false,
    error: null,
    message: "",
    params: [],
    response: { ierror: 100, cerror: "" },
}

const posicionFolioReducer = ( state = initialState, action: PosicionFolioActions ) => {
    switch(action.type){
        case actionTypes.POST_POSICION_FOLIO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_POSICION_FOLIO_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_POSICION_FOLIO_ERROR:
            return { ...state, loading: false, response: { ierror: 100, cerror: "" }, error: action.payload.error };
        
        case actionTypes.RESET_STATE_TARJETA_FOLIO:
            //console.log("reset state tarjeta folio posicionFolioReducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default posicionFolioReducer;