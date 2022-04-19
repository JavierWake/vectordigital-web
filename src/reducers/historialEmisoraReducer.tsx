import * as actionTypes from '../actions/actionTypes';
import { HistorialEmisoraActions, HistorialEmisoraStatus } from '../types/HistorialEmisoraTypes';

const initialState: HistorialEmisoraStatus = {
    loading: true,
    response: {
        ierror: 0,
        cerror: "",
        dsMovimientos: {
            tdsMovimientos: [
                {
                    Cuenta: 0,
                    Emisora: "",
                    Serie: "",
                    FechaOperacion: "",
                    NumProm: "",
                    Sucursal: 0,
                    Descripcion: "",
                    Transaccion: 0,
                    Titulos: 0,
                    Precio: 0,
                    Monto: 0,
                    Comision: 0,
                    sTitulos: "",
                    sPrecio: "",
                    sMonto: "",
                    sComision: "",
                    DescTransaccion: "",
                }
            ]
        }
    },
    error: null,
    message: "",
    params: [],
}

const historialEmisoraReducer = ( state = initialState, action: HistorialEmisoraActions ) => {
    switch(action.type){
        case actionTypes.GET_HISTORIALEMISORA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_HISTORIALEMISORA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_HISTORIALEMISORA_ERROR:
            return { ...state, loading: false, response: initialState.response, error: action.payload.error };

        default: 
            return { ...state };
    }
}

export default historialEmisoraReducer;