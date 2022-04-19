import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getCatalogoEmisorasRecieve, getCatalogoEmisorasError } from '../actions/getCatalogoEmisorasAction';
import { GET_CATALOGO_EMISORAS_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type CatalogoEmisorasGet = SagaReturnType<typeof getCatalogoEmisoras>

const getCatalogoEmisoras = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CATALOGO_EMISORAS+data, params);

function* getCatalogoEmisorasDataSaga(action: any) {

    let config = {
        headers: {
            'X-Api-Key': apiCall.X_API_KEY_CATALOGO_EMISORAS, //action.payload.params[0],
        },
    }
    try{
        const catalogoEmisorasGet: CatalogoEmisorasGet = yield call(getCatalogoEmisoras, action.payload.message, config);
        const catalogoEmisorasObj = catalogoEmisorasGet.data;
        yield put( getCatalogoEmisorasRecieve({ catalogoEmisorasRespuesta: catalogoEmisorasObj }) );
        
    } catch (e: any) {

        yield put( getCatalogoEmisorasError({ error: e.message }));

    }
}

function* getCatalogoEmisorasSaga() {

    yield all([takeLatest(GET_CATALOGO_EMISORAS_REQUEST, getCatalogoEmisorasDataSaga)]);

}

export default getCatalogoEmisorasSaga;