import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { postPasswordPostRecieve, postPasswordPostError } from '../actions/PasswordPostAction';
import { POST_PASSWORDPOST_SEND } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostPasswordPostData = SagaReturnType<typeof postPasswordPost>

const postPasswordPost = (data: string, params: any) =>
    axios.post<any>(apiCall.API_CONFIGURA+data,null, params);

function* postPasswordPostDataSaga(action: any) {
    try{
        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
                'anterior': action.payload.params[4],
                'nueva': action.payload.params[5],
                'confirma': action.payload.params[6]
            },
        };

        // console.log("post password saga");
        // console.log("config");
        // console.log(config);
        // console.log("url: ", apiCall.API_CONFIGURA + action.payload.message);

        const quotes: PostPasswordPostData = yield call(postPasswordPost, action.payload.message, config);
        // console.log("resp");
        // console.log(quotes.data);

        if(quotes.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postPasswordPostRecieve({respuesta: quotes.data.response}) );
        }  

        
    } catch (e: any) {

        yield put( postPasswordPostError({ error: e.message }));

    }
}

function* postPasswordPostSaga() {

    yield all([takeLatest(POST_PASSWORDPOST_SEND, postPasswordPostDataSaga)]);

}

export default postPasswordPostSaga;