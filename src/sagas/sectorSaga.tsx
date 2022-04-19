import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getSectorRecieve, getSectorError } from '../actions/sectorActions';
import { SECTOR_API_REQUEST } from '../actions/actionTypes';
import { ISector } from '../types/SectorTypes';
import * as apiCall from '../constants';

type SectorGet = SagaReturnType<typeof getSector>

let config = {
    params: {
        token: apiCall.token
    },
}


const getSector = (data: string) =>
    axios.get<ISector[]>(apiCall.GET_SECTOR + data, config);

function* getSectorSaga(action: any) {
    try {

        const sectorGet: SectorGet = yield call(getSector, action.payload);
        yield put( getSectorRecieve({ sector: sectorGet.data }) );
        
    } catch (e:any) {

        yield put(getSectorError({ error: e.message }));

    }
}

function* sectorSaga() {

    yield all([takeLatest(SECTOR_API_REQUEST, getSectorSaga)]);

}

export default sectorSaga;