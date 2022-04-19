import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postListReceive, postListError } from '../actions/postListAction';
import { POST_LIST_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type PostListData = SagaReturnType<typeof postList>

const postList = (data: string, params: any) =>
    axios.post<any>(apiCall.LISTAS_API+data,null, params);

function* postListDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
                'id': action.payload.id,
            }
        }

        const quotes: PostListData = yield call(postList, action.payload.message, config);
        
        yield put( postListReceive({ idError: quotes.data.id, messageError: quotes.data.message, list_id: quotes.data.list_id }) );
        
    } catch (e:any) {

        yield put( postListError({ error: e.message }));

    }
}

function* postListSaga() {

    yield all([takeLatest(POST_LIST_REQUEST, postListDataSaga)]);

}

export default postListSaga;