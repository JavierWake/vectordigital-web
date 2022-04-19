import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosVtaPutRecieve, getFondosVtaPutError } from '../actions/fondosVtaPutAction';
import { PUT_FONDOS_VTA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosVtaPut = SagaReturnType<typeof putFondosVta>

const putFondosVta = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, "", params);

function* getFondosVtaPutSaga(action: any) {

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
        const fondosVtaPut: FondosVtaPut = yield call(putFondosVta, action.payload.message, config);
        const fondosVtaObj = fondosVtaPut.data.response;
        
        if(fondosVtaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosVtaPutRecieve({ fondosVtaPutRespuesta: fondosVtaObj }) );
        }   

        
    } catch (e: any) {

        yield put( getFondosVtaPutError({ error: e.message }));

    }
}

function* fondosVtaPutSaga() {

    yield all([takeLatest(PUT_FONDOS_VTA_REQUEST, getFondosVtaPutSaga)]);

}

export default fondosVtaPutSaga;