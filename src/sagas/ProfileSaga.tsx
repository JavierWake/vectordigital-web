import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getProfileDataRecieve, getProfileDataError } from '../actions/ProfileIssuerAction';
import { GET_PROFILE_REQUEST } from '../actions/actionTypes';
import { IProfileData  } from '../types/ProfileIssuerTypes';
import * as apiCall from '../constants';

type ProfileGet = SagaReturnType<typeof getProfileData>


const getProfileData = (data: string, config: any) =>
    axios.get<IProfileData>(apiCall.NEWS_API+data, config);

function* getProfileSaga(action: any) {

    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_NEWS
            },
            params: {
                lang: action.payload.params
            },
        }
    
        const profileGetD: ProfileGet = yield call(getProfileData, action.payload.message, config);
        yield put( getProfileDataRecieve({ profileData: profileGetD.data }) );
        
    } catch (e:any) {

        yield put( getProfileDataError({ error: e.message }));

    }
}

function* ProfileSaga() {

    yield all([takeLatest(GET_PROFILE_REQUEST, getProfileSaga)]);

}

export default ProfileSaga;