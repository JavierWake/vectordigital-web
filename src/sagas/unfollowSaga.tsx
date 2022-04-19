import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { deleteUnfollowRecieve, deleteUnfollowError } from '../actions/unfollowAction';
import { DELETE_UNFOLLOW_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type DeleteUnfollowData = SagaReturnType<typeof deleteUnfollow>

const deleteUnfollow = (data: string, params:any) =>
    axios.delete<any>(apiCall.LISTAS_API+data, params);

function* deleteFollowListSaga(action: any): any {
    try {

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
                'id': action.payload.id
            }
        }

        const deleteUn: DeleteUnfollowData = yield call(deleteUnfollow, action.payload.message, config);
        yield put(deleteUnfollowRecieve());

    } catch (e: any) {

        yield put(deleteUnfollowError({ error: e.message }));

    }
}

function* unfollowSaga() {

    yield all([takeLatest(DELETE_UNFOLLOW_REQUEST, deleteFollowListSaga)]);

}

export default unfollowSaga;