import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';

import { changeListRecieve, changeListError } from '../actions/changeListAction';
import { CHANGE_LIST_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type ChangeListData = SagaReturnType<typeof changeList>

const changeList = (data: string, params: any) =>
    axios.put<any>(apiCall.LISTAS_API+data,null, params);

function* changeListDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
            },
            params: {
                name: action.payload.params
            }
        }

        const quotes: ChangeListData = yield call(changeList, action.payload.message, config);
        yield put( changeListRecieve() );
        
    } catch (e:any) {

        yield put( changeListError({ error: e.message }));

    }
}

function* changeListSaga() {

    yield all([takeLatest(CHANGE_LIST_REQUEST, changeListDataSaga)]);

}

export default changeListSaga;