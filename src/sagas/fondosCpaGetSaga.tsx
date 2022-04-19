import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosCpaGetRecieve, getFondosCpaGetError } from '../actions/fondosCpaGetAction';
import { GET_FONDOS_CPA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosCpaGet = SagaReturnType<typeof getFondosCpa>

const getFondosCpa = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getFondosCpaGetSaga(action: any) {

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
        // console.log("url fondos cpa get");
        // console.log(apiCall.GET_API_OPERACION+action.payload.message);

        const fondosCpaGet: FondosCpaGet = yield call(getFondosCpa, action.payload.message, config);
        const fondosCpaObj = fondosCpaGet.data.response;
        
        if(fondosCpaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosCpaGetRecieve({ fondosCpaGetRespuesta: fondosCpaObj }) );
        }   
        
        
    } catch (e: any) {

        yield put( getFondosCpaGetError({ error: e.message }));

    }
}

function* fondosCpaGetSaga() {

    yield all([takeLatest(GET_FONDOS_CPA_REQUEST, getFondosCpaGetSaga)]);

}

export default fondosCpaGetSaga;