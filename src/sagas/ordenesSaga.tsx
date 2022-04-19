import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getDsOrdenesRecieve, getDsOrdenesError } from '../actions/ordenesAction';
import { GET_ORDENES_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type OrdenesGet = SagaReturnType<typeof getOrdenes>

const getOrdenes = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getOrdenesDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
            'canal': action.payload.params[1],
            'cuentasesion': action.payload.params[2],
            'token': action.payload.params[3],
            'id': action.payload.params[4],
        },
    }
    try{

        const ordenesGet: OrdenesGet = yield call(getOrdenes, action.payload.message, config);

        if(ordenesGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            
            let capitales = [];
            if(ordenesGet.data.response.dsOrdenes.tdsOrdenes[0].estatusCap){
                capitales = ordenesGet.data.response.dsOrdenes.dsOrdenesCap.tdsOrdenesCap
            } else {
                capitales = [];
            }
            let ordenesMD = [];
            if(ordenesGet.data.response.dsOrdenes.tdsOrdenes[0].estatusMD){
                ordenesMD = ordenesGet.data.response.dsOrdenes.tdsOrdenesMd
            } else {
                ordenesMD = [];
            }
            yield put( getDsOrdenesRecieve({ 
                tdsOrdenesFd: ordenesGet.data.response.dsOrdenes.tdsOrdenesFd, 
                tdsOrdenesCap: capitales, 
                tdsOrdenesEstado:  ordenesGet.data.response.dsOrdenes.tdsOrdenes}) );
        }   
        
    } catch (e:any) {

        yield put( getDsOrdenesError({ error: e.message }));

    }
}

function* ordenesSaga() {

    yield all([takeLatest(GET_ORDENES_REQUEST, getOrdenesDataSaga)]);

}

export default ordenesSaga;