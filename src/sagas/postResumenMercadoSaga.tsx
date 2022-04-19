import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postResumenMercadoRecieve, postResumenMercadoError } from '../actions/postResumenMercadoAction';
import { POST_RESUMEN_MERCADO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostResumenMercadoData = SagaReturnType<typeof postResumenMercado>

const postResumenMercado = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.API_CONFIGURA+data,bodyString, params);

function* postResumenMercadoDataSaga(action: any) {
    try{

        let ejemplo = {
            "request" : {
                "inputdata" : {
                    "dsConfiguracion" : action.payload.data
                }
            }
        }

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            }
        }

        const resumenMercadoPost: PostResumenMercadoData = yield call(postResumenMercado, action.payload.message, config, JSON.stringify(ejemplo));
        const resp = resumenMercadoPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postResumenMercadoRecieve({ response: resp }) );
        }  
        
        
    } catch (e : any) {

        yield put( postResumenMercadoError({ error: e.message }));

    }
}

function* postResumenMercadoSaga() {

    yield all([takeLatest(POST_RESUMEN_MERCADO_REQUEST, postResumenMercadoDataSaga)]);

}

export default postResumenMercadoSaga;