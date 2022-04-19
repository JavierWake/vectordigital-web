import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import {
    persistReducer,
    persistStore,
} from 'redux-persist';
//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import  asyncSessionStorage from 'redux-persist/lib/storage'; // usamos mejor el sessionStorage para guardar el store ahi

import rootReducer from '../reducers/rootReducer';
import { rootSaga } from '../sagas/rootSaga';

//https://github.com/rt2zz/redux-persist/blob/master/docs/api.md#type-persistconfig
const persistConfig = {
    key: 'root',
    storage: asyncSessionStorage,
    whitelist: ['loginObjectState'], // only persist these keys dentro del store
    //manualPersist: true, 
};
/*
    EXPLICACION de este persistConfig:
    del state con key "loginObject", se va a persistir el atributo loginObject
        es decir: store.loginObject.loginObject (del tipo LoginObjectResponse) 
*/

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, undefined, applyMiddleware(sagaMiddleware, logger));

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const persistorAndStore = {
    store: store,
    persistor: persistor,
};

export default persistorAndStore; //aqui viene el store con loginObject persistiendo
//export default store;



/*
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';
import { rootSaga } from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store; 
*/