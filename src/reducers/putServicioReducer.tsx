import * as actionTypes from '../actions/actionTypes';
import {PutServicioActions, PutServicioState} from '../types/PutServicioType';

const initialState: PutServicioState = {
    loading: false,
    response: {
        ierror: null,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
    data: [],
}

const putServicioReducer = ( state = initialState, action: PutServicioActions ) => {
    switch(action.type){
        case actionTypes.PUT_SERVICIO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.PUT_SERVICIO_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.PUT_SERVICIO_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: ""}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default putServicioReducer;