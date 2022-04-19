import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { deleteAlertRecieve, deleteAlertError } from '../actions/deleteAlertAction';
import { DELETE_ALERT_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

function* deleteFollowListSaga(action: any): any{
    try{

        const callPut = () => {
            axios.delete(apiCall.GET_ALERT+action.payload[0], {params: {
                tipo: action.payload[1]
            }})
        }

        const followPut = yield call(callPut);
        yield put( deleteAlertRecieve() );

    } catch (e:any) {

        yield put( deleteAlertError({ error: e.message }));

    }
}

function* delertAlertSaga() {

    yield all([takeLatest(DELETE_ALERT_REQUEST, deleteFollowListSaga)]);

}

export default delertAlertSaga;