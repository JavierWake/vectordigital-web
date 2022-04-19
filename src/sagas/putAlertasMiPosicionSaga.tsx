import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putAlertasMiPosicionRecieve, putAlertasMiPosicionError } from '../actions/putAlertasMiPosicionAction';
import { PUT_ALERTAS_MI_POSICION_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

type AlertasMiPosicionPut = SagaReturnType<typeof putAlertasMiPosicion>

const putAlertasMiPosicion = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* putAlertasMiPosicionDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };

    try{
        const alertasMiPosicionPut: AlertasMiPosicionPut = yield call(putAlertasMiPosicion, action.payload.message, config);
        const putAlertasMiPosicionObj = alertasMiPosicionPut.data.response;

        if(putAlertasMiPosicionObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( putAlertasMiPosicionRecieve({ putAlertasMiPosicionRespuesta: putAlertasMiPosicionObj }) );
        } 

        
        
    } catch (e: any) {

        yield put( putAlertasMiPosicionError({ error: e.message }));

    }
}

function* putAlertasMiPosicionSaga() {

    yield all([takeLatest(PUT_ALERTAS_MI_POSICION_REQUEST, putAlertasMiPosicionDataSaga)]);

}

export default putAlertasMiPosicionSaga;
