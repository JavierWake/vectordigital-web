import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getAlertRecieve, getAlertError } from '../actions/alertGet';
import { GET_ALERT_REQUEST } from '../actions/actionTypes';
import { IAlertGet } from '../types/AlertGet';
import * as apiCall from '../constants';

type AlertsGet = SagaReturnType<typeof getAlerts>

const getAlerts = (data: string) =>
    axios.get<IAlertGet[]>(apiCall.GET_ALERT+data);

function* getAlertListSaga(action: any) {
    //console.log("holaaa", action.payload);
    try{

        const alertsGet: AlertsGet = yield call(getAlerts, action.payload);
        yield put( getAlertRecieve({ alertGet: alertsGet.data }) );
        
    } catch (e:any) {

        yield put( getAlertError({ error: e.message }));

    }
}

function* getAlertSaga() {

    yield all([takeLatest(GET_ALERT_REQUEST, getAlertListSaga)]);

}

export default getAlertSaga;
