import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosCpaPutRecieve, getFondosCpaPutError } from '../actions/fondosCpaPutAction';
import { PUT_FONDOS_CPA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosCpaPut = SagaReturnType<typeof putFondosCpa>

const putFondosCpa = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, "", params);

function* getFondosCpaPutSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
            'refresh': 'no',
        },
    }
    
    try{
        // console.log("url fondos cpa put");
        // console.log(apiCall.GET_API_OPERACION+action.payload.message);

        const fondosCpaPut: FondosCpaPut = yield call(putFondosCpa, action.payload.message, config);
        const fondosCpaObj = fondosCpaPut.data.response;

        if(fondosCpaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosCpaPutRecieve({ fondosCpaPutRespuesta: fondosCpaObj }) );
        } 

        
        
    } catch (e: any) {

        yield put( getFondosCpaPutError({ error: e.message }));

    }
}

function* fondosCpaPutSaga() {

    yield all([takeLatest(PUT_FONDOS_CPA_REQUEST, getFondosCpaPutSaga)]);

}

export default fondosCpaPutSaga;