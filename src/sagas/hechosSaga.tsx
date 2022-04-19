import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getHechosRecieve, getHechosError } from '../actions/hechosAction';
import { GET_HECHOS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type HechosGet = SagaReturnType<typeof getHechos>

const getHechos = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getHechosSaga(action: any) {

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

        const hechosGet: HechosGet = yield call(getHechos, action.payload.message, config);

        if(hechosGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getHechosRecieve({ tdsPosturas: hechosGet.data.response.dsPosturas.tdsPosturas }) );
        }   
        
    } catch (e : any) {

        yield put( getHechosError({ error: e.message }));

    }
}

function* hechosSaga() {

    yield all([takeLatest(GET_HECHOS_REQUEST, getHechosSaga)]);

}

export default hechosSaga;