import * as actionTypes from '../actions/actionTypes';

const initialState = {
    venta: false,
}

const ventaReducer = ( state = initialState, action: any ) => {
    switch(action.type){
        case actionTypes.VENTA:
            return { ...state, venta: action.payload };
        
        default: 
            return { ...state };
    }
}

export default ventaReducer;
