import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { postIssuerRecieve, postIssuerError } from '../actions/PostIssuerAction';
import { POST_ISSUER_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

//Agregar una emisora a una lista

type PostIssuerData = SagaReturnType<typeof postIssuer>

const postIssuer = (data: string, params: any) =>
    axios.post<any>(apiCall.LISTAS_API+data,null, params);

function* postIssuerDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
                'id': action.payload.id,
            }
        }

        const quotes: PostIssuerData = yield call(postIssuer, action.payload.message, config);
        yield put( postIssuerRecieve({ idRespuesta: quotes.data.id, messageRespueta: quotes.data.message }) );
        
    } catch (e: any) {

        yield put( postIssuerError({ error: e.message }));

    }
}

function* postIssuerSaga() {

    yield all([takeLatest(POST_ISSUER_REQUEST, postIssuerDataSaga)]);

}

export default postIssuerSaga;