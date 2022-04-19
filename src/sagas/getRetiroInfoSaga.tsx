import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getRetiroInfoRecieve, getRetiroInfoError } from '../actions/getRetiroInfoAction';
import { GET_RETIRO_INFO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type RetiroInfoGet = SagaReturnType<typeof getRetiroInfo>

const getRetiroInfo = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getRetiroInfoDataSaga(action: any) {

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
        const retiroInfoGet: RetiroInfoGet = yield call(getRetiroInfo, action.payload.message, config);
        const retiroInfoObj = retiroInfoGet.data.response;

        if(retiroInfoObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getRetiroInfoRecieve({ retiroInfoRespuesta: retiroInfoObj }) );
        }  

    } catch (e: any) {

        yield put( getRetiroInfoError({ error: e.message }));

    }
}

function* getRetiroInfoSaga() {

    yield all([takeLatest(GET_RETIRO_INFO_REQUEST, getRetiroInfoDataSaga)]);

}

export default getRetiroInfoSaga;