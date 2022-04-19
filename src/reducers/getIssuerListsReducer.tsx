import * as actionTypes from '../actions/actionTypes';
import { issuerListsActions, IssuerListsStatus } from '../types/GetIssuerListsType';

const initialState: IssuerListsStatus = {
    loading: false,
    listas: [
        {
            "list_id": "",
            "list_name": ""
        }
    ],
    message: ""
}

const issuerListsReducer = (state = initialState, action: issuerListsActions) => {
    switch (action.type) {
        case actionTypes.GET_ISSUER_LISTS_REQUEST:
            return { ...state, loading: true, message: action.payload };

        case actionTypes.GET_ISSUER_LISTS_RECEIVE:
            return { ...state, loading: false, listas: action.payload.listas };

        case actionTypes.GET_ISSUER_LISTS_ERROR:
            return { ...state, loading: false, listas: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default issuerListsReducer;