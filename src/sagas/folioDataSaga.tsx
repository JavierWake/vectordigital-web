import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFolioDataRecieve, getFolioDataError } from '../actions/folioDataAction';
import { GET_FOLIO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { IResponse } from '../types/FolioDataTypes';
import * as apiCall from '../constants';

type FolioGet = SagaReturnType<typeof getFolio>

const getFolio = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION + data, params);

function* getFolioSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try {

        const folioGet: FolioGet = yield call(getFolio, action.payload.message, config);
        const resp = folioGet.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFolioDataRecieve({ response: resp }));
        }   
        

    } catch (e: any) {

        yield put(getFolioDataError({ error: e.message }));

    }
}

function* folioDataSaga() {

    yield all([takeLatest(GET_FOLIO_REQUEST, getFolioSaga)]);

}

export default folioDataSaga;