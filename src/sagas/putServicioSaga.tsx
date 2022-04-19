import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putServicioRecieve, putServicioError } from '../actions/putServicioAction';
import { PUT_SERVICIO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PutServicioData = SagaReturnType<typeof putServicio>

const putServicio = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* putServicioDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            }
        }

        const servicioPut: PutServicioData = yield call(putServicio, action.payload.message, config);
        const resp = servicioPut.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( putServicioRecieve({ response: resp }) );
        }  
        
        
    } catch (e : any) {

        yield put( putServicioError({ error: e.message }));

    }
}

function* putServicioSaga() {

    yield all([takeLatest(PUT_SERVICIO_REQUEST, putServicioDataSaga)]);

}

export default putServicioSaga;