import * as actionTypes from '../actions/actionTypes';
import { GetPermisosState, GetPermisosActions } from '../types/GetPermisosType';

const initialState: GetPermisosState = {
    loading: false,
    getPermisosRespuesta: {
        ierror: 0,
        cerror: "",
        dsServicios: {
            ttServicios: [],
        },
    },
    error: null,
    message: "",
    params: [],
};

const getPermisosReducer = ( state = initialState, action: GetPermisosActions ) => {
    switch(action.type){
        case actionTypes.GET_PERMISOS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_PERMISOS_RECEIVE:
            return {...state, loading: false, getPermisosRespuesta: action.payload.getPermisosRespuesta, error: null};

        case actionTypes.GET_PERMISOS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };

        case actionTypes.GET_PERMISOS_RESET:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default getPermisosReducer;
