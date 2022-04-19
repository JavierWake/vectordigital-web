import * as actionTypes from '../actions/actionTypes';
import { SearchCompanyActions,  SearchCompanyState} from '../types/SearchCompanyTypes';

const initialState: SearchCompanyState = {
    loading: false,
    searchCompany: [],
    error: null,
    message: ""
}

const searchCompanyReducer = ( state = initialState, action: SearchCompanyActions ) => {
    switch(action.type){
        case actionTypes.SEARCH_COMPANY_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.SEARCH_COMPANY_RECEIVE:
            return {...state, loading: false, searchCompany: action.payload.searchCompany, error: null};

        case actionTypes.SEARCH_COMPANY_ERROR:
            return { ...state, loading: false, searchCompany: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default searchCompanyReducer;