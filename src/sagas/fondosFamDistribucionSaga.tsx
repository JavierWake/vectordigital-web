import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosFamDistribucionRecieve, getFondosFamDistribucionError } from '../actions/fondosFamDistribucionAction';
import { GET_FONDOS_FAM_DISTRIBUCION_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosFamDistribucionGet = SagaReturnType<typeof getFondosFamDistribucion>

const getFondosFamDistribucion = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getFondosFamDistribucionDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_MERCADO, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const fondosFamDistribucionGet: FondosFamDistribucionGet = yield call(getFondosFamDistribucion, action.payload.message, config);
        const fondosFamDistribucionObj = fondosFamDistribucionGet.data.response;

        if(fondosFamDistribucionObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosFamDistribucionRecieve({ fondosFamDistribucionRespuesta: fondosFamDistribucionObj }) );
        }   

        
    } catch (e: any) {

        yield put( getFondosFamDistribucionError({ error: e.message }));

    }
}

function* fondosFamDistribucionSaga() {

    yield all([takeLatest(GET_FONDOS_FAM_DISTRIBUCION_REQUEST, getFondosFamDistribucionDataSaga)]);

}

export default fondosFamDistribucionSaga;