import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putCelularReenviaRecieve, putCelularReenviaError } from '../actions/putCelularReenviaAction';
import { PUT_CELULAR_REENVIA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type CelularReenviaPut = SagaReturnType<typeof putCelularReenvia>

const putCelularReenvia = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* putCelularReenviaDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const celularReenviaPut: CelularReenviaPut = yield call(putCelularReenvia, action.payload.message, config);
        const putCelularReenviaObj = celularReenviaPut.data.response;

        if(putCelularReenviaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( putCelularReenviaRecieve({ putCelularReenviaRespuesta: putCelularReenviaObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( putCelularReenviaError({ error: e.message }));

    }
}

function* putCelularReenviaSaga() {

    yield all([takeLatest(PUT_CELULAR_REENVIA_REQUEST, putCelularReenviaDataSaga)]);

}

export default putCelularReenviaSaga;