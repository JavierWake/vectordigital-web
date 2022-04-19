import * as actionTypes from '../actions/actionTypes';
import { GetAlertasMiPosicionState, GetAlertasMiPosicionActions } from '../types/GetAlertasMiPosicionType';

const initialState: GetAlertasMiPosicionState = {
    loading: false,
    getAlertasMiPosicionRespuesta: {
        ierror: 0,
        cerror: "",
        dsPreferencias: {
            tdsPreferencias: [],
        },
    },
    error: null,
    message: "",
    params: [],
};

const getAlertasMiPosicionReducer = ( state = initialState, action: GetAlertasMiPosicionActions ) => {
    switch(action.type){
        case actionTypes.GET_ALERTAS_MI_POSICION_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ALERTAS_MI_POSICION_RECEIVE:
            return {...state, loading: false, getAlertasMiPosicionRespuesta: action.payload.getAlertasMiPosicionRespuesta, error: null};

        case actionTypes.GET_ALERTAS_MI_POSICION_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_ALERTAS_MI_POSICION:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default getAlertasMiPosicionReducer;
