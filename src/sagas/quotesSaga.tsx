import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest, delay } from 'redux-saga/effects';
import { getQuotesError, getQuotesRecieve } from '../actions/quotesAction';
import { QUOTES_DATA_REQUEST } from '../actions/actionTypes';
import { IQuotesData } from '../types/QuotesTypes';
import * as apiCall from '../constants';

type QuotesListData = SagaReturnType<typeof getQuote>

const getQuote = (data: string, params: any) =>
    axios.get<IQuotesData[]>(apiCall.GET_QUOTES+data, params);

function* getQuoteSaga(action: any) {
    try{

        let config = {
            params: {
                token: apiCall.token,
                companies: action.payload[1],
            },
        }

        //while(true){
            //delay(5000)
            const quotes: QuotesListData = yield call(getQuote, action.payload[0], config);
            yield put( getQuotesRecieve({ quotesList: quotes.data }) );
        //}
        
        
    } catch (e:any) {

        yield put( getQuotesError({ error: e.message }));

    }
}

function* quotesSaga() {

    yield all([takeLatest(QUOTES_DATA_REQUEST, getQuoteSaga)]);

}

export default quotesSaga;