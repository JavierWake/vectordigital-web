import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getStationListRecieve, getStationListError } from '../actions/StationListActions';
import { LIST_STATION_REQUEST } from '../actions/actionTypes';
import { IStationList } from '../types/StationListTypes';
import * as apiCall from '../constants';

type StationListGet = SagaReturnType<typeof getStationList>

const getStationList = (data: string, params: any) =>
    axios.get<IStationList[]>(apiCall.LISTAS_API+data, params);

function* getStationListSaga(action: any) {
    
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
        },
    }

    try{

        const listGet: StationListGet = yield call(getStationList, action.payload, config);
        yield put( getStationListRecieve({ StationList: listGet.data }) );
        
    } catch (e: any) {

        yield put( getStationListError({ error: e.message }));

    }
}


function* StationListSaga() {

    yield all([takeLatest(LIST_STATION_REQUEST, getStationListSaga)]);

}

export default StationListSaga;