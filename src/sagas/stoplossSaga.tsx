import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getStoplossRecieve, getStoplossError } from '../actions/stoplossAction';
import { GET_STOPLOSS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type StopLossGet = SagaReturnType<typeof getStopLoss>

const getStopLoss = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getStopLossSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const stopLossGet: StopLossGet = yield call(getStopLoss, action.payload.message, config);

        if(stopLossGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getStoplossRecieve({ CatEmisStopLoss: stopLossGet.data.response.dsRespuesta.CatEmisStopLoss, ierror: stopLossGet.data.response.ierror, cerror: stopLossGet.data.response.cerror }) );
        }   

        
        
    } catch (e : any) {

        yield put( getStoplossError({ error: e.message }));

    }
}

function* stopLossSaga() {

    yield all([takeLatest(GET_STOPLOSS_REQUEST, getStopLossSaga)]);

}

export default stopLossSaga;