import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getListIssuerRecieve, getListIssuerError } from '../actions/ListIssuerAction';
import { GET_LIST_ISSUER_REQUEST } from '../actions/actionTypes';
import { IListIssuer } from '../types/ListIssuer';
import * as apiCall from '../constants';

type ListIssuerGet = SagaReturnType<typeof getListIssuer>

const getListIssuer = (data: string, params: any) =>
    axios.get<IListIssuer>(apiCall.LISTAS_API+data, params);

function* getListIssuerSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
            'id': action.payload.id
        },
    }

    try{
        const issuerListGet: ListIssuerGet = yield call(getListIssuer, action.payload.message, config);

        let arrayTrading: any = [];
        let arrayTradingProf:any = [];
        let ricName: any;
        
        issuerListGet.data.bmv.map((row:any, i:any) => {
            ricName = row.split(".");
            arrayTrading.push({
                ISSUER: ricName[0],
                BID: 0,
                ASK: 0,
                BIDSIZE: 0,
                ASKSIZE: 0,
                TRDPRC_1: 0,
                ADJUST_CLS: 0,
                HIGH_1: 0,
                LOW_1: 0,
                NETCHNG_1: 0,
                PCTCHNG: 0,
                TRDVOL_1: 0,
                ASK_TIM_NS: "",
                BID_TIM_NS: "",
                NUM_MOVES: 0,
            });
            arrayTradingProf.push({
                ISSUER: ricName[0],
                BEST_BID1: 0, BEST_BID2: 0, BEST_BID3: 0, BEST_BID4: 0, BEST_BID5: 0, BEST_BID6: 0, BEST_BID7: 0, BEST_BID8: 0, BEST_BID9: 0, BEST_BID10: 0, 
                BEST_BSIZ1: 0, BEST_BSIZ2: 0, BEST_BSIZ3: 0, BEST_BSIZ4: 0, BEST_BSIZ5: 0, BEST_BSIZ6: 0, BEST_BSIZ7: 0, BEST_BSIZ8: 0, BEST_BSIZ9: 0, BEST_BSIZ10: 0, 
                BEST_ASK1: 0, BEST_ASK2: 0, BEST_ASK3: 0, BEST_ASK4: 0, BEST_ASK5: 0, BEST_ASK6: 0, BEST_ASK7: 0, BEST_ASK8: 0, BEST_ASK9: 0, BEST_ASK10: 0, 
                BEST_ASIZ1: 0, BEST_ASIZ2: 0, BEST_ASIZ3: 0, BEST_ASIZ4: 0, BEST_ASIZ5: 0, BEST_ASIZ6: 0, BEST_ASIZ7: 0, BEST_ASIZ8: 0, BEST_ASIZ9: 0, BEST_ASIZ10: 0, 
            });
        });
        
        yield put( getListIssuerRecieve({ listIssuer: issuerListGet.data, tradingArray: arrayTrading, profundidadArray: arrayTradingProf }));
        
    } catch (e:any) {

        yield put( getListIssuerError({ error: e.message }));

    }
}


function* listIssuerSaga() {

    yield all([takeLatest(GET_LIST_ISSUER_REQUEST, getListIssuerSaga)]);

}

export default listIssuerSaga;
