import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getCommoditiesReceive, getCommoditiesError } from '../actions/commoditiesAction';
import { GET_COMMODITIES_REQUEST } from '../actions/actionTypes';
import { IResponse } from '../types/CommoditiesType';
import * as apiCall from '../constants';

type CommoditiesGet = SagaReturnType<typeof getCommodities>

const getCommodities = (data: string, config: any) =>
    axios.get<IResponse>(apiCall.NEWS_API+data, config);

function* getCommoditiesSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
        },
    };

    try{

        const commGet: CommoditiesGet = yield call(getCommodities, action.payload.message, config);
        yield put( getCommoditiesReceive({ response: commGet.data, error: ""})  );
        
    } catch (e:any) {

        yield put( getCommoditiesError({ error: e.message }));

    }
}

function* commoditiesSaga() {

    yield all([takeLatest(GET_COMMODITIES_REQUEST, getCommoditiesSaga)]);

}

export default commoditiesSaga;