import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postEditOrdenReceive, postEditOrdenError } from '../actions/EditOrdenAction';
import { POST_ORDEN_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostOrdenData = SagaReturnType<typeof postOrden>

const postOrden = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,null, params);

function* postEditOrdenSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_OPERACION,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
        }

        const editOrdenPost: PostOrdenData = yield call(postOrden, action.payload.message, config);
        const resp = editOrdenPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postEditOrdenReceive({ response: resp }) );
        }  
        
        
    } catch (e : any) {

        yield put( postEditOrdenError({ error: e.message }));

    }
}

function* editOrdenSaga() {

    yield all([takeLatest(POST_ORDEN_REQUEST, postEditOrdenSaga)]);

}

export default editOrdenSaga;