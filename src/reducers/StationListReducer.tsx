import * as actionTypes from '../actions/actionTypes';
import {StationListActions,StationListState} from '../types/StationListTypes';

const initialState: StationListState = {
    loading: false,
    StationList: [],
    error: null,
    message: ""
}

const StationListReducer = ( state = initialState, action: StationListActions ) => {
    switch(action.type){
        case actionTypes.LIST_STATION_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.LIST_STATION_RECEIVE:
            return {...state, loading: false, StationList: action.payload.StationList, error: null};

        case actionTypes.LIST_STATION_ERROR:
            return { ...state, loading: false, news: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default StationListReducer;