import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';

import { deleteListRecieve, deleteListError } from '../actions/deleteListAction';
import { DELETE_LIST_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type DeleteListData = SagaReturnType<typeof deleteList>

const deleteList = (data: string, params:any) =>
    axios.delete<any>(apiCall.LISTAS_API+data, params);

function* deleteListDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
                'id': action.payload.id
            }
        }

        const quotes: DeleteListData = yield call(deleteList, action.payload.message, config);
        yield put( deleteListRecieve({idError: quotes.data.id, messageError: quotes.data.message }) );
        
    } catch (e:any) {

        yield put( deleteListError({ error: e.message }));

    }
}

function* deleteListSaga() {

    yield all([takeLatest(DELETE_LIST_REQUEST, deleteListDataSaga)]);

}

export default deleteListSaga;