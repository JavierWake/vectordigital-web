import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getInfoEmisoraError, getInfoEmisoraRecieve } from '../actions/infoEmisoraAction';
import { GET_INFO_EMISORA_REQUEST } from '../actions/actionTypes';
import { IInfoEmisoraResponse } from '../types/InfoEmisoraTypes';
import { initialState } from '../reducers/infoEmisoraReducer';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type InfoEmisoraa = SagaReturnType<typeof getInfo>



const getInfo = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getInfoSaga(action: any) {
    
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
        
        const infoporEmisora: InfoEmisoraa = yield call(getInfo, action.payload.message, config);
        
        if(infoporEmisora.data.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getInfoEmisoraRecieve({ infoEmisoraResponse: infoporEmisora.data }) );
        }   

        

    } catch (e:any) {

        yield put( getInfoEmisoraError({ error: e.message, 
                                        infoEmisoraResponse: initialState.infoEmisoraResponse, }));

    }
}

function* infoEmisoraSaga() {

    yield all([takeLatest(GET_INFO_EMISORA_REQUEST, getInfoSaga)]);

}

export default infoEmisoraSaga;