import { SECTOR_API_REQUEST, SECTOR_API_RECEIVE, SECTOR_API_ERROR } from './actionTypes';
import { GetSectorRequest, GetSectorReceive, GetSectorReceivePayload, GetSectorError, GetSectorErrorPayload } from '../types/SectorTypes';

export const getSectorRequest = (payload: string): GetSectorRequest => ({
    type: SECTOR_API_REQUEST,
    payload
    
});

export const getSectorRecieve = ( payload: GetSectorReceivePayload ): GetSectorReceive => ({
    type: SECTOR_API_RECEIVE,
    payload,
});

export const getSectorError = ( payload: GetSectorErrorPayload ): GetSectorError => ({
    type: SECTOR_API_ERROR,
    payload,
}); 