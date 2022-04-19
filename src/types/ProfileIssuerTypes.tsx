import { GET_PROFILE_REQUEST, GET_PROFILE_RECEIVE, GET_PROFILE_ERROR } from '../actions/actionTypes';

export interface IProfileData {
    name: string;
    business_summary: string;
    employees: string;
    year: string;
    location: string;
    ceo: string;
    revenue: string;
    ev: string;
    max: string;
    min: string;
    avgVol: string;
    shares: string;
    currency: string; 
}

export interface ProfileDataState {
    loading: boolean;
    profileData: IProfileData;
    error: string | null;
    message: string;
    params: string
}

export interface GetProfileDataReceivePayload {
    profileData: IProfileData;
}

export interface GetProfileDataErrorPayload {
    error: string;
}

export interface GetProfileDataRequestPayload {
    message: string;
    params: string;
}

export interface GetProfileDataRequest {
    type: typeof GET_PROFILE_REQUEST;
    payload: GetProfileDataRequestPayload
}

export type GetProfileDataReceive = {
    type: typeof GET_PROFILE_RECEIVE;
    payload: GetProfileDataReceivePayload;
};

export type GetProfileDataError = {
    type: typeof GET_PROFILE_ERROR;
    payload: GetProfileDataErrorPayload;
};

export type ProfileDataActions = 
| GetProfileDataRequest
| GetProfileDataReceive
| GetProfileDataError;

