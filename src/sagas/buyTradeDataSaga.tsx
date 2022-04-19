import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getBuyTradeDataRecieve, getBuyTradeDataError } from '../actions/buyTradeDataAction';
import { GET_BUY_TRADE_DATA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type BuyTradeDataGet = SagaReturnType<typeof getBuyTradeData>

const getBuyTradeData = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getBuyTradeDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const buyTradeDataGet: BuyTradeDataGet = yield call(getBuyTradeData, action.payload.message, config);

        if(buyTradeDataGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            if(!("dstradedata" in buyTradeDataGet.data.response)){
                buyTradeDataGet.data.response["dstradedata"] = {
                    "tdstradedata": [],
                    "tdsEmisoras": [],
                    "ttTipoOrdenes": []
                }
            }
            
            yield put( getBuyTradeDataRecieve({ errorTextoApi: buyTradeDataGet.data.response.cerror, errorNumApi: buyTradeDataGet.data.response.ierror, tdstradedata: buyTradeDataGet.data.response.dstradedata.tdstradedata, tdsEmisoras: buyTradeDataGet.data.response.dstradedata.tdsEmisoras, ttTipoOrdenes:  buyTradeDataGet.data.response.dstradedata.ttTipoOrdenes}) );
        }   

        
        
    } catch (e : any) {

        yield put( getBuyTradeDataError({ error: e.message }));

    }
}

function* buyTradeDataSaga() {

    yield all([takeLatest(GET_BUY_TRADE_DATA_REQUEST, getBuyTradeDataSaga)]);

}

export default buyTradeDataSaga;