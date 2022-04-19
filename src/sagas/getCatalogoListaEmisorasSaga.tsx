import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getCatalogoListaEmisorasRecieve, getCatalogoListaEmisorasError } from '../actions/getCatalogoListaEmisorasAction';
import { GET_CATALOGO_LISTA_EMISORAS_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type CatalogoListaEmisorasGet = SagaReturnType<typeof getCatalogoListaEmisoras>

const getCatalogoListaEmisoras = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CATALOGO_EMISORAS+data, params);

function* getCatalogoListaEmisorasDataSaga(action: any) {

    let config = {
        headers: {
            'X-Api-Key': apiCall.X_API_KEY_CATALOGO_EMISORAS, //action.payload.params[0],
        },
    }
    try{
        const catalogoListaEmisorasGet: CatalogoListaEmisorasGet = yield call(getCatalogoListaEmisoras, action.payload.message, config);
        const catalogoListaEmisorasObj = catalogoListaEmisorasGet.data;
        yield put( getCatalogoListaEmisorasRecieve({ catalogoListaEmisorasRespuesta: catalogoListaEmisorasObj }) );
        
    } catch (e: any) {

        yield put( getCatalogoListaEmisorasError({ error: e.message }));

    }
}

function* getCatalogoListaEmisorasSaga() {

    yield all([takeLatest(GET_CATALOGO_LISTA_EMISORAS_REQUEST, getCatalogoListaEmisorasDataSaga)]);

}

export default getCatalogoListaEmisorasSaga;