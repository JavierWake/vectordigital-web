import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getPoderCompraRecieve, getPoderCompraError } from '../actions/poderCompraAction';
import { GET_PODER_COMPRA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PoderCompraGet = SagaReturnType<typeof getPoderCompra>

const getPoderCompra = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getPoderCompraSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const poderCompraGet: PoderCompraGet = yield call(getPoderCompra, action.payload.message, config);

        if(poderCompraGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getPoderCompraRecieve({ tdsSaldo: poderCompraGet.data.response.dsCapCpaFlujos.tdsSaldo, tdsDetalleFlujos: poderCompraGet.data.response.dsCapCpaFlujos.tdsDetalleFlujos }) );
        }  
        
    } catch (e : any) {

        yield put( getPoderCompraError({ error: e.message }));

    }
}

function* poderCompraSaga() {

    yield all([takeLatest(GET_PODER_COMPRA_REQUEST, getPoderCompraSaga)]);

}

export default poderCompraSaga;