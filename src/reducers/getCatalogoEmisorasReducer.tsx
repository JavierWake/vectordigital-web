import * as actionTypes from '../actions/actionTypes';
import { CatalogoEmisorasState, CatalogoEmisorasActions } from '../types/GetCatalogoEmisotasType';

const initialState: CatalogoEmisorasState = {
    loading: false,
    catalogoEmisorasRespuesta: [
        /*{
            PrimaryRIC: "",
            Emisora: "",
            CommonName: "",
            RIC: "",
            Serie: "",
            TechRules: "",
        },*/
    ],//un arreglo vacio, .length === 0
    error: null,
    message: "",
}

const catalogoEmisorasReducer = ( state = initialState, action: CatalogoEmisorasActions ) => {
    switch(action.type){
        case actionTypes.GET_CATALOGO_EMISORAS_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.GET_CATALOGO_EMISORAS_RECEIVE:
            return {...state, loading: false, catalogoEmisorasRespuesta: action.payload.catalogoEmisorasRespuesta, error: null};

        case actionTypes.GET_CATALOGO_EMISORAS_ERROR:
            return { ...state, loading: false, catalogoEmisorasRespuesta: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default catalogoEmisorasReducer;