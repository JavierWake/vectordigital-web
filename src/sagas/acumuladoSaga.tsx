import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getAcumuladoRecieve, getAcumuladoError } from '../actions/acumuladoAction';
import { GET_ACUMULADO_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

type AcumuladoGet = SagaReturnType<typeof getAcumulado>

const getAcumulado = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getAcumuladoSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_MERCADO,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const acumuladoGet: AcumuladoGet = yield call(getAcumulado, action.payload.message, config);

        if(acumuladoGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getAcumuladoRecieve({ tdsAcumulado: acumuladoGet.data.response.dsAcumulado.tdsAcumulado }) );
        }   
        
    } catch (e : any) {

        yield put( getAcumuladoError({ error: e.message }));

    }
}

function* acumuladoSaga() {

    yield all([takeLatest(GET_ACUMULADO_REQUEST, getAcumuladoSaga)]);

}

export default acumuladoSaga;