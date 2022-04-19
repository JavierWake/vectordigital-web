import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosMonitorRecieve, getFondosMonitorError } from '../actions/fondosMonitorAction';
import { GET_FONDOS_MONITOR_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

type FondosMonitorGet = SagaReturnType<typeof getFondosMonitor>

const getFondosMonitor = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getFondosMonitorDataSaga(action: any) {

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
        const fondosMonitorGet: FondosMonitorGet = yield call(getFondosMonitor, action.payload.message, config);
        const fondosMonitorResponse = fondosMonitorGet.data.response;

        if(fondosMonitorResponse.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosMonitorRecieve({ fondosMonitorRespuesta: fondosMonitorResponse }) );
        }   
                     
    } catch (e: any) {

        yield put( getFondosMonitorError({ error: e.message }));

    }
}

function* fondosMonitorSaga() {

    yield all([takeLatest(GET_FONDOS_MONITOR_REQUEST, getFondosMonitorDataSaga)]);

}

export default fondosMonitorSaga;