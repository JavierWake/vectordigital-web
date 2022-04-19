import * as actionTypes from '../actions/actionTypes';

const initialState = {
    compra: false,
}

const compraReducer = ( state = initialState, action: any ) => {
    switch(action.type){
        case actionTypes.COMPRA:
            return { ...state, compra: action.payload };
        
        default: 
            return { ...state };
    }
}

export default compraReducer;
