import * as actionTypes from '../actions/actionTypes';
import { PutAlertasMiPosicionState, PutAlertasMiPosicionActions } from '../types/PutAlertasMiPosicionType';

const initialState: PutAlertasMiPosicionState = {
    loading: false,
    putAlertasMiPosicionRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
};

const putAlertasMiPosicionReducer = ( state = initialState, action: PutAlertasMiPosicionActions ) => {
    switch(action.type){
        case actionTypes.PUT_ALERTAS_MI_POSICION_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_ALERTAS_MI_POSICION_RECEIVE:
            return {...state, loading: false, putAlertasMiPosicionRespuesta: action.payload.putAlertasMiPosicionRespuesta, error: null};

        case actionTypes.PUT_ALERTAS_MI_POSICION_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_ALERTAS_MI_POSICION:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default putAlertasMiPosicionReducer;
