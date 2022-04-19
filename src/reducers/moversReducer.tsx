import * as actionTypes from '../actions/actionTypes';
import { MoversState, MoversActions } from '../types/MoversType';

const initialState: MoversState = {
    loading: false,
    moversList: [
        /*{
            idfiltro: "",
            tendencia: "",
            itemTableLS: "",
            itemLS: "",
            emisora: "",
            serie: "",
            descripcion: "",
            precioactual: 0,
            precioInicial: 0,
            Precio_Minimo: 0,
            Precio_Maximo: 0,
            ptjevar: 0,
            ptsvar: 0,
            hora: "",
            volumen: 0,
            operado: 0,
            Precio_Compra: 0,
            Precio_Venta: 0,
        }*/
    ],
    error: null,
    message: "",
    params: [],
}

const moversReducer = ( state = initialState, action: MoversActions ) => {
    switch(action.type){
        case actionTypes.GET_MOVERS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_MOVERS_RECEIVE:
            return {...state, loading: false, moversList: action.payload.moversList, error: null};

        case actionTypes.GET_MOVERS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default moversReducer;