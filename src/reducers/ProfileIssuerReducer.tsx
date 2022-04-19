import * as actionTypes from '../actions/actionTypes';
import { ProfileDataActions, ProfileDataState } from '../types/ProfileIssuerTypes';

const initialState: ProfileDataState = {
    loading: false,
    profileData: {
        name: "",
        business_summary: "",
        employees: "",
        year: "",
        location: "",
        ceo: "",
        revenue: "",
        ev: "",
        max: "",
        min: "",
        avgVol: "",
        shares: "",
        currency: "", 
    },
    error: null,
    message: "", 
    params: "",
}

const ProfileIssuerReducer = ( state = initialState, action: ProfileDataActions ) => {
    switch(action.type){
        case actionTypes.GET_PROFILE_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_PROFILE_RECEIVE:
            return {...state, loading: false, profileData: action.payload.profileData, error: null};

        case actionTypes.GET_PROFILE_ERROR:
            return { ...state, loading: false, profileData: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default ProfileIssuerReducer;