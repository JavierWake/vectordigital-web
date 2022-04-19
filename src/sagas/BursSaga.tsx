import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest, delay } from 'redux-saga/effects';
import { getBursError, getBursRecieve } from '../actions/bursAction';
import { GET_BURS_REQUEST } from '../actions/actionTypes';
import { IBurs } from '../types/BursType';
import * as apiCall from '../constants';

type QuotesListData = SagaReturnType<typeof getBurs>

const getBurs = (data: string, params: any) =>
    axios.get<IBurs[]>(apiCall.GET_BURS+data, params);

function* getBursSaga(action: any) {
    try{

        let config = {
            params: {
                tenencia: action.payload[1],
            },
        }

        //while(true){
            //delay(5000)
            const quotes: QuotesListData = yield call(getBurs, action.payload[0], config);
            yield put( getBursRecieve({ listTicker: quotes.data }) );
        //}
        
        
    } catch (e:any) {

        yield put( getBursError({ error: e.message }));

    }
}

function* BursSaga() {

    yield all([takeLatest(GET_BURS_REQUEST, getBursSaga)]);

}

export default BursSaga;