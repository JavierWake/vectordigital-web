import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getDepositoBancosRecieve, getDepositoBancosError } from '../actions/getDepositoBancosAction';
import { GET_DEPOSITO_BANCOS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type DepositoBancosGet = SagaReturnType<typeof getDepositoBancos>

const getDepositoBancos = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getDepositoBancosDataSaga(action: any) {

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
        const depositoBancosGet: DepositoBancosGet = yield call(getDepositoBancos, action.payload.message, config);
        const depositoBancosObj = depositoBancosGet.data.response;
        
        if(depositoBancosObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getDepositoBancosRecieve({ depositoBancosRespuesta: depositoBancosObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( getDepositoBancosError({ error: e.message }));

    }
}

function* getDepositoBancosSaga() {

    yield all([takeLatest(GET_DEPOSITO_BANCOS_REQUEST, getDepositoBancosDataSaga)]);

}

export default getDepositoBancosSaga;