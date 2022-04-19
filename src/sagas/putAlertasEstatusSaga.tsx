import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putAlertasEstatusRecieve, putAlertasEstatusError } from '../actions/putAlertasEstatusAction';
import { PUT_ALERTAS_ESTATUS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasEstatusPut = SagaReturnType<typeof putAlertasEstatus>

const putAlertasEstatus = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* putAlertasEstatusDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };
    /*console.log("api put alerta estatus");
    console.log(apiCall.API_CONFIGURA+action.payload.message);
    console.log(config);*/

    try{
        const alertasEstatusPut: AlertasEstatusPut = yield call(putAlertasEstatus, action.payload.message, config);
        const putAlertasEstatusObj = alertasEstatusPut.data.response;

        if(putAlertasEstatusObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( putAlertasEstatusRecieve({ putAlertasEstatusRespuesta: putAlertasEstatusObj }) );
        } 
        
        
    } catch (e: any) {

        yield put( putAlertasEstatusError({ error: e.message }));

    }
}

function* putAlertasEstatusSaga() {

    yield all([takeLatest(PUT_ALERTAS_ESTATUS_REQUEST, putAlertasEstatusDataSaga)]);

}

export default putAlertasEstatusSaga;