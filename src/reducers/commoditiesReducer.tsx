import * as actionTypes from '../actions/actionTypes';
import { CommoditiesActions, CommoditiesState} from '../types/CommoditiesType';

const initialState: CommoditiesState = {
    loading: false,
    response: {
        indices: [
            {
                ric: "", 
                name: "",
                precio: 0,
                variacion: "",
                descVariacion: "",
                completeName: "",
            }
        ],
        fx: [
            {
                ric: "", 
                name: "", 
                precio: 0, 
                variacion: "",
                descVariacion: "",
                completeName: "",
            }
        ],
        commodities: [
            {
                ric: "", 
                name: "", 
                precio: 0, 
                variacion: "",
                descVariacion: "",
                completeName: "",
            }
        ]
    },
    error: "",
    message: ""
}

const commoditiesReducer = ( state = initialState, action: CommoditiesActions ) => {
    switch(action.type){
        case actionTypes.GET_COMMODITIES_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.GET_COMMODITIES_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: ""};

        case actionTypes.GET_COMMODITIES_ERROR:
            return { ...state, loading: false, response: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default commoditiesReducer;