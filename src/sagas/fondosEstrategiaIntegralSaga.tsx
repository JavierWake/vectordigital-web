import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosEstrategiaIntegralRecieve, getFondosEstrategiaIntegralError } from '../actions/fondosEstrategiaIntegralAction';
import { GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosEstrategiaIntegralGet = SagaReturnType<typeof getFondosEstrategiaIntegral>

const getFondosEstrategiaIntegral = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getFondosEstrategiaIntegralDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_MERCADO, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    //console.log("url saga fondos est integral");
    //console.log(apiCall.GET_API_MERCADO+action.payload.message);
    //console.log(config);
    try{
        const fondosEstrategiaIntegralGet: FondosEstrategiaIntegralGet = yield call(getFondosEstrategiaIntegral, action.payload.message, config);
        const fondosEstrategiaIntegralObj = fondosEstrategiaIntegralGet.data.response;

        if(fondosEstrategiaIntegralObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosEstrategiaIntegralRecieve({ fondosEstrategiaIntegralRespuesta: fondosEstrategiaIntegralObj }) );
        }           
        
    } catch (e: any) {

        yield put( getFondosEstrategiaIntegralError({ error: e.message }));

    }
}

function* fondosEstrategiaIntegralSaga() {

    yield all([takeLatest(GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST, getFondosEstrategiaIntegralDataSaga)]);

}

export default fondosEstrategiaIntegralSaga;