import * as actionTypes from '../actions/actionTypes';

const initialState = {
    multipleOrders: false,
}

const multipleOrdersReducer = ( state = initialState, action: any ) => {
    switch(action.type){
        case actionTypes.MULTIPLE_ORDERS:
            return { ...state, multipleOrders: action.payload };
        
        default: 
            return { ...state };
    }
}

export default multipleOrdersReducer;
