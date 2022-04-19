import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getSellTradeDataRecieve, getSellTradeDataError } from '../actions/sellTradeDataAction';
import { GET_SELL_TRADE_DATA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type SellTradeDataGet = SagaReturnType<typeof getSellTradeData>

const getSellTradeData = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getSellTradeDataSaga(action: any) {

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

        const sellTradeDataGet: SellTradeDataGet = yield call(getSellTradeData, action.payload.message, config);

        if(sellTradeDataGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getSellTradeDataRecieve({ tdstradedata: sellTradeDataGet.data.response.dstradedata.tdstradedata, tdsEmisoras: sellTradeDataGet.data.response.dstradedata.tdsEmisoras, ttTipoOrdenes:  sellTradeDataGet.data.response.dstradedata.ttTipoOrdenes}) );
        }   

       
        
    } catch (e : any) {

        yield put( getSellTradeDataError({ error: e.message }));

    }
}

function* sellTradeDataSaga() {

    yield all([takeLatest(GET_SELL_TRADE_DATA_REQUEST, getSellTradeDataSaga)]);

}

export default sellTradeDataSaga;