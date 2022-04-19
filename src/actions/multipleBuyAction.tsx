import { MULTIPLE_BUY_ADD, MULTIPLE_BUY_DELETE, MULTIPLE_BUY_DELETE_ALL } from './actionTypes';
import { IMultipleBuy } from '../types/MultipleBuyType'

export const multipleBuyAdd = (payload: IMultipleBuy) => ({
    type: MULTIPLE_BUY_ADD,
    payload 
});

export const multipleBuyDelete = (payload: number ) => ({
    type: MULTIPLE_BUY_DELETE,
    payload 
});

export const multipleBuyDeleteAll = (payload: boolean ) => ({
    type: MULTIPLE_BUY_DELETE_ALL,
    payload 
});
