import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';

import { postFollowRecieve, postFollowError } from '../actions/followAction';
import { POST_FOLLOW_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type PostFollowData = SagaReturnType<typeof postFolllow>

const postFolllow = (data: string, params: any) =>
    axios.post<any>(apiCall.LISTAS_API + data, null, params);

function* postFollowListSaga(action: any) {
    try {

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
            },
            params: {
                list_name: action.payload[1]
            }
        }

        const quotes: PostFollowData = yield call(postFolllow, action.payload[0], config);
        yield put( postFollowRecieve() );
        
    } catch (e:any) {

        yield put(postFollowError({ error: e.message }));

    }
}


function* followSaga() {

    yield all([takeLatest(POST_FOLLOW_REQUEST, postFollowListSaga)]);

}

export default followSaga;