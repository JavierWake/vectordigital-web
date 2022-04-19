import * as actionTypes from '../actions/actionTypes';
import { SectorActions, SectorState } from '../types/SectorTypes';

const initialState: SectorState = {
    loading: false,
    sector: [],
    error: null,
    message: ""
}

const sectorReducer = ( state = initialState, action: SectorActions ) => {
    switch(action.type){
        case actionTypes.SECTOR_API_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.SECTOR_API_RECEIVE:
            return {...state, loading: false, sector: action.payload.sector, error: null};

        case actionTypes.SECTOR_API_ERROR:
            return { ...state, loading: false, sector: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default sectorReducer;