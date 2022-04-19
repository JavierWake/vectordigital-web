import * as actionTypes from '../actions/actionTypes';
import { IMultipleBuy } from '../types/MultipleBuyType';

const initialState = {
    multipleBuy: []
}

const multipleBuyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.MULTIPLE_BUY_ADD:
            return { ...state, multipleBuy: state.multipleBuy.concat(action.payload) };
        case actionTypes.MULTIPLE_BUY_DELETE:
            return { ...state, multipleBuy: [...state.multipleBuy.slice(0, action.payload), ...state.multipleBuy.slice(action.payload + 1)] };
        case actionTypes.MULTIPLE_BUY_DELETE_ALL:
            return { ...state, multipleBuy: [] };
        default:
            return { ...state };
    }
}

export default multipleBuyReducer;
