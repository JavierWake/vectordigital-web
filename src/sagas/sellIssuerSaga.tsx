import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postSellIssuerReceive, postSellIssuerError } from '../actions/sellIssuerAction';
import { POST_SELL_ISSUER_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostSellIssuerData = SagaReturnType<typeof postSellIssuer>

const postSellIssuer = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,bodyString, params);

function* postSellIssuerSaga(action: any) {
    try{

        // console.log("entra a la saga venta");
        // console.log(action.payload.data);
        
        let ejemplo2 = {
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
            data: ejemplo2
        }

        // console.log("ejemplo");
        // console.log(config);

        const sellIssuerPost: PostSellIssuerData = yield call(postSellIssuer, action.payload.message, config, JSON.stringify(ejemplo2));
        const resp = sellIssuerPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postSellIssuerReceive({ response: resp }) );
        }  


        
    } catch (e : any) {

        yield put( postSellIssuerError({ error: e.message }));

    }
}

function* sellIssuerSaga() {

    yield all([takeLatest(POST_SELL_ISSUER_REQUEST, postSellIssuerSaga)]);

}

export default sellIssuerSaga;