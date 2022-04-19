import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosCpaEmisRecieve, getFondosCpaEmisError } from '../actions/fondosCpaEmisAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { GET_FONDOS_CPAEMIS_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type FondosCpaEmisGet = SagaReturnType<typeof getFondosCpaEmis>

const getFondosCpaEmis = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getFondosCpaEmisDataSaga(action: any) {

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

        // console.log("url fondos cpa emis");
        // console.log(apiCall.GET_API_OPERACION+action.payload.message);
        
        const fondosCpaEmisGet: FondosCpaEmisGet = yield call(getFondosCpaEmis, action.payload.message, config);
        const fondosCpaEmisObj = fondosCpaEmisGet.data.response;
        // console.log("resp saga cpaemis fd");
        // console.log(fondosCpaEmisObj);

        if(fondosCpaEmisObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosCpaEmisRecieve({ fondosCpaEmisRespuesta: fondosCpaEmisObj }) );
        }   
        
    } catch (e: any) {

        yield put( getFondosCpaEmisError({ error: e.message }));

    }
}

function* fondosCpaEmisSaga() {

    yield all([takeLatest(GET_FONDOS_CPAEMIS_REQUEST, getFondosCpaEmisDataSaga)]);

}

export default fondosCpaEmisSaga;