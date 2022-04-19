import * as actionTypes from '../actions/actionTypes';
import { FondosMonitorState, FondosMonitorActions } from '../types/FondosMonitorType';

const initialState: FondosMonitorState = {
    loading: false,
    fondosMonitorRespuesta: {
        ierror: 0,
        cerror: "",
        dsRespuesta: {
            ttCatalogoFam: [],
            tdsFondos: [],
        },
    },
    error: null,
    message: "",
    params: [],
}

const fondosMonitorReducer = ( state = initialState, action: FondosMonitorActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_MONITOR_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_MONITOR_RECEIVE:
            return {...state, loading: false, fondosMonitorRespuesta: action.payload.fondosMonitorRespuesta, error: null};

        case actionTypes.GET_FONDOS_MONITOR_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosMonitorReducer;