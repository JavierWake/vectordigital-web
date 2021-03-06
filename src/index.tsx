import React from 'react';
import ReactDOM from 'react-dom';
// import "tailwindcss/tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';
import './styles/tailwind.css';
import persistorAndStore from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {persistorAndStore.store}>
      <PersistGate loading={<Loading />} persistor={persistorAndStore.persistor}>
        <App />
      </PersistGate>
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

