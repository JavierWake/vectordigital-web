import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postBuyIssuerReceive, postBuyIssuerError } from '../actions/buyIssuerAction';
import { POST_BUY_ISSUER_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostBuyIssuerData = SagaReturnType<typeof postBuyIssuer>

const postBuyIssuer = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,bodyString, params);

function* postBuyIssuerSaga(action: any) {
    try{

        let ejemplo = {
            "request" : {
                "tradeinput" : {
                    "dsTradeInput" : {
                        "tdsTradeInput" : action.payload.data
                    }
                }
            }
        }

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_OPERACION,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
            data: ejemplo
        }

        const buyIssuerPost: PostBuyIssuerData = yield call(postBuyIssuer, action.payload.message, config, JSON.stringify(ejemplo));
        const resp = buyIssuerPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postBuyIssuerReceive({ response: resp }) );
        }  

        
        
    } catch (e : any) {

        yield put( postBuyIssuerError({ error: e.message }));

    }
}

function* buyIssuerSaga() {

    yield all([takeLatest(POST_BUY_ISSUER_REQUEST, postBuyIssuerSaga)]);

}

export default buyIssuerSaga;