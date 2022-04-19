import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getAlertasMiPosicionRecieve, getAlertasMiPosicionError } from '../actions/getAlertasMiPosicionAction';
import { GET_ALERTAS_MI_POSICION_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasMiPosicionGet = SagaReturnType<typeof getAlertasMiPosicion>

const getAlertasMiPosicion = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getAlertasMiPosicionDataSaga(action: any) {

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
        const alertasMiPosicionGet: AlertasMiPosicionGet = yield call(getAlertasMiPosicion, action.payload.message, config);
        const getAlertasMiPosicionObj = alertasMiPosicionGet.data.response;

        if(getAlertasMiPosicionObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getAlertasMiPosicionRecieve({ getAlertasMiPosicionRespuesta: getAlertasMiPosicionObj }) );
        } 
        
        
    } catch (e: any) {

        yield put( getAlertasMiPosicionError({ error: e.message }));

    }
}

function* getAlertasMiPosicionSaga() {

    yield all([takeLatest(GET_ALERTAS_MI_POSICION_REQUEST, getAlertasMiPosicionDataSaga)]);

}

export default getAlertasMiPosicionSaga;
