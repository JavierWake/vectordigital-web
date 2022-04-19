import * as actionTypes from '../actions/actionTypes';
import { CatalogoListaEmisorasState, CatalogoListaEmisorasActions } from '../types/GetCatalogoListaEmisorasType';

const initialState: CatalogoListaEmisorasState = {
    loading: false,
    catalogoListaEmisorasRespuesta: [
        {
            PrimaryRIC: "",
            Emisora: "",
            CommonName: "",
            RIC: "",
            Serie: "",
            TechRules: "",
        },
    ],
    error: null,
    message: "",
}

const getCatalogoListaEmisorasReducer = ( state = initialState, action: CatalogoListaEmisorasActions ) => {
    switch(action.type){
        case actionTypes.GET_CATALOGO_LISTA_EMISORAS_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.GET_CATALOGO_LISTA_EMISORAS_RECEIVE:
            return {...state, loading: false, catalogoListaEmisorasRespuesta: action.payload.catalogoListaEmisorasRespuesta, error: null};

        case actionTypes.GET_CATALOGO_LISTA_EMISORAS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getCatalogoListaEmisorasReducer;