import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosVtaGetRecieve, getFondosVtaGetError } from '../actions/fondosVtaGetAction';
import { GET_FONDOS_VTA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosVtaGet = SagaReturnType<typeof getFondosVta>

const getFondosVta = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getFondosVtaGetSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const fondosVtaGet: FondosVtaGet = yield call(getFondosVta, action.payload.message, config);
        const fondosVtaObj = fondosVtaGet.data.response;
        
        if(fondosVtaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosVtaGetRecieve({ fondosVtaGetRespuesta: fondosVtaObj }) );
        } 

        
    } catch (e: any) {

        yield put( getFondosVtaGetError({ error: e.message }));

    }
}

function* fondosVtaGetSaga() {

    yield all([takeLatest(GET_FONDOS_VTA_REQUEST, getFondosVtaGetSaga)]);

}

export default fondosVtaGetSaga;