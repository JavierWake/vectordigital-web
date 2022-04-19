import * as actionTypes from '../actions/actionTypes';
import { GetCapEmisoraDetalleState, GetCapEmisoraDetalleActions } from '../types/GetCapEmisoraDetalleType';

const initialState: GetCapEmisoraDetalleState = {
    loading: false,
    getCapEmisoraDetalleRespuesta: {
        ierror: 0,
        cerror: "",
        dsDetalleEmisora: {
            ttDetalleEmisora: [],
        }
    },
    error: null,
    message: "",
    params: [],
}

const getCapEmisoraDetalleReducer = ( state = initialState, action: GetCapEmisoraDetalleActions ) => {
    switch(action.type){
        case actionTypes.GET_CAP_EMISORA_DETALLE_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_CAP_EMISORA_DETALLE_RECEIVE:
            return {...state, loading: false, getCapEmisoraDetalleRespuesta: action.payload.getCapEmisoraDetalleRespuesta, error: null};

        case actionTypes.GET_CAP_EMISORA_DETALLE_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getCapEmisoraDetalleReducer;