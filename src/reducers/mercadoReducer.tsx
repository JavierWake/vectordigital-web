import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mercado: "BMV",
}

const mercadoReducer = ( state = initialState, action: any ) => {
    switch(action.type){
        case actionTypes.CHANGE_MERCADO:
            return { ...state, mercado: action.payload };
        
        default: 
            return { ...state };
    }
}

export default mercadoReducer;
