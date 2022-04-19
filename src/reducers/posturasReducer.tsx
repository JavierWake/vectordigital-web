import * as actionTypes from '../actions/actionTypes';
import { PosturasActions, PosturasState } from '../types/PosturasTypes';

const initialState: PosturasState = {
    loading: false,
    posturas: {compra: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, compraVol: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, venta: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, ventaVol: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, perCompra: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, perVenta: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}},
    error: null,
    message: "",
    params: "",
}

const posturasReducer = ( state = initialState, action: PosturasActions ) => {
    switch(action.type){
        case actionTypes.GET_POSTURAS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_POSTURAS_RECEIVE:
            return {...state, loading: false, posturas: action.payload.posturas, error: null};

        case actionTypes.GET_POSTURAS_ERROR:
            return { ...state, loading: false, posturas: {}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default posturasReducer;