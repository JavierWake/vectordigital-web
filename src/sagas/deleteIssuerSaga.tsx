import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';

import { deleteIssuerRecieve, deleteIssuerError } from '../actions/deleteIssuerAction';
import { DELETE_ISSUER_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type DeleteIssuerData = SagaReturnType<typeof deleteIssuer>

const deleteIssuer = (data: string, params:any) =>
    axios.delete<any>(apiCall.LISTAS_API+data, params);

function* deleteIssuerDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_LISTAS,
                'id': action.payload.id
            }
        }

        const quotes: DeleteIssuerData = yield call(deleteIssuer, action.payload.message, config);
        yield put( deleteIssuerRecieve({ idError: quotes.data.id, messageError: quotes.data.message }) );
        
    } catch (e:any) {

        yield put( deleteIssuerError({ error: e.message }));

    }
}

function* deleteIssuerSaga() {

    yield all([takeLatest(DELETE_ISSUER_REQUEST, deleteIssuerDataSaga)]);

}

export default deleteIssuerSaga;