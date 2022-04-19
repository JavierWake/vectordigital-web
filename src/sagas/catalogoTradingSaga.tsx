import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { catalogoTradingRecieve, catalogoTradingError } from '../actions/catalogoTradingAction';
import { GET_CATALOGO_TRADING_REQUEST } from '../actions/actionTypes';
import { ITradingArray, IProfundidadArray    } from '../types/CatalogoTradingTypes';
import * as apiCall from '../constants';

type CatalogoTradingGet = SagaReturnType<typeof getCatalogoTrading>

const getCatalogoTrading = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CATALOGO_EMISORAS+data, params);

function* catalogoTradingDataSaga(action: any) {

    let config = {
        headers: {
            'X-Api-Key': apiCall.X_API_KEY_CATALOGO_EMISORAS, //action.payload.params[0],
        },
    }
    
    try{
        const catalogoTradingGet: CatalogoTradingGet = yield call(getCatalogoTrading, action.payload.message, config);
        
        let posicionTradingMX1: any = [];
        let posicionTradingBIV1: any = [];
        let posicionTradingMCO1: any = [];
        let tradingData1: any = action.payload.emisorasCatalogo;
        let profundidadArray1: any = [];
        let tradingArray1: ITradingArray[] = [];
        let indexIssuerD:number = 0;
        let ricName: any;

        catalogoTradingGet.data.map((row:any, i:any) => {
            
            ricName = row.RIC.split(".");
            posicionTradingMX1.push(row.RIC,row.RIC+"O");
            posicionTradingBIV1.push(ricName[0] +".BIV", ricName[0] +".BIVd");
            posicionTradingMCO1.push(ricName[0] + ".MCO", ricName[0] +".MCOd");
            indexIssuerD = tradingData1.findIndex((i:any) => i.descripcion === row.Emisora);
            tradingArray1.push({
                ISSUER: ricName[0],
                descripcion: tradingData1[indexIssuerD].descripcion,
                titulos: tradingData1[indexIssuerD].titulos,
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
            profundidadArray1.push({
                ISSUER: ricName[0],
                BEST_BID1: 0,
                BEST_BID2: 0,
                BEST_BID3: 0,
                BEST_BID4: 0,
                BEST_BID5: 0,
                BEST_BID6: 0,
                BEST_BID7: 0,
                BEST_BID8: 0,
                BEST_BID9: 0,
                BEST_BID10: 0,
                BEST_BSIZ1: 0,
                BEST_BSIZ2: 0,
                BEST_BSIZ3: 0,
                BEST_BSIZ4: 0,
                BEST_BSIZ5: 0,
                BEST_BSIZ6: 0,
                BEST_BSIZ7: 0,
                BEST_BSIZ8: 0,
                BEST_BSIZ9: 0,
                BEST_BSZ10: 0,
                BEST_ASK1: 0,
                BEST_ASK2: 0,
                BEST_ASK3: 0,
                BEST_ASK4: 0,
                BEST_ASK5: 0,
                BEST_ASK6: 0,
                BEST_ASK7: 0,
                BEST_ASK8: 0,
                BEST_ASK9: 0,
                BEST_ASK10: 0,
                BEST_ASIZ1: 0,
                BEST_ASIZ2: 0,
                BEST_ASIZ3: 0,
                BEST_ASIZ4: 0,
                BEST_ASIZ5: 0,
                BEST_ASIZ6: 0,
                BEST_ASIZ7: 0,
                BEST_ASIZ8: 0,
                BEST_ASIZ9: 0,
                BEST_ASZ10: 0,
            });
        });

        tradingArray1.sort(function(a, b) {
            var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
            var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            
            // names must be equal
            return 0;
        });

        profundidadArray1.sort(function(a, b) {
            var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
            var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            
            // names must be equal
            return 0;
        });

        yield put( catalogoTradingRecieve({ 
            posicionTradingMX: posicionTradingMX1.sort(), 
            posicionTradingBIV: posicionTradingBIV1.sort(), 
            posicionTradingMCO: posicionTradingMCO1.sort(),
            tradingArray: tradingArray1,
            profundidadArray: profundidadArray1,
         }) );
        
    } catch (e: any) {

        yield put( catalogoTradingError({ error: e.message }));

    }
}

function* catalogoTradingSaga() {

    yield all([takeLatest(GET_CATALOGO_TRADING_REQUEST, catalogoTradingDataSaga)]);

}

export default catalogoTradingSaga;