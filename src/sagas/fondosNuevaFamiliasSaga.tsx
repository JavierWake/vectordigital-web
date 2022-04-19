import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosNuevaFamiliasRecieve, getFondosNuevaFamiliasError } from '../actions/fondosNuevaFamiliasAction';
import { GET_FONDOS_NUEVA_FAMILIAS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosNuevaFamiliaGet = SagaReturnType<typeof getFondosNuevaFamilias>

const getFondosNuevaFamilias = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getFondosNuevaFamiliasDataSaga(action: any) {

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
        const fondosNuevaFamiliasGet: FondosNuevaFamiliaGet = yield call(getFondosNuevaFamilias, action.payload.message, config);
        const fondosNuevaFamiliasObj = fondosNuevaFamiliasGet.data.response;

        if(fondosNuevaFamiliasObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getFondosNuevaFamiliasRecieve({ fondosNuevaFamiliasRespuesta: fondosNuevaFamiliasObj }) );
        } 
        
    } catch (e: any) {

        yield put( getFondosNuevaFamiliasError({ error: e.message }));

    }
}

function* fondosNuevaFamiliasSaga() {

    yield all([takeLatest(GET_FONDOS_NUEVA_FAMILIAS_REQUEST, getFondosNuevaFamiliasDataSaga)]);

}

export default fondosNuevaFamiliasSaga;