import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getCarteraRecieve, getCarteraError } from '../actions/CarteraAction';
import { GET_CARTERA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type CarteraDataGet = SagaReturnType<typeof getCartera>


const getCartera = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getCarteraSaga(action: any) {

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

        const CarteraGet: CarteraDataGet = yield call(getCartera, action.payload.message, config);
        const resp = CarteraGet.data.response;
        
        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getCarteraRecieve({ response: resp }));
        }             

        
    } catch (e:any) {

        yield put( getCarteraError({ error: e.message }));

    }
}

function* CarteraSaga() {

    yield all([takeLatest(GET_CARTERA_REQUEST, getCarteraSaga)]);

}

export default CarteraSaga;
