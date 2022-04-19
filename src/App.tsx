import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, RouteProps, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Login from './components/Login';
import IssuerProfile from './components/IssuerProfile';
import Search from './components/Search';
import Trading from './components/Trading';
import Alerts from './components/Alerts';
import Portfolio from './components/Portfolio';
import Lists from './components/Lists';
import Consultas from './components/Consultas';
import Movimientos from './components/Movimientos';
import ResumenCartera from './components/ResumenCartera';
import Operations from './containers/Operations';
import store from './store/index';
import persistorAndStore from './store/index';
import Fondos from './components/Fondos';

import Perfil from './components/perfil/Perfil';
import VectorAnalisis from './components/perfil/VectorAnalisis';
import Alertas from './components/perfil/Alertas';
import Mensajes from './components/perfil/Mensajes';
import CuentaBancaria from './components/perfil/CuentaBancaria';
import Password from './components/perfil/Password';
import Email from './components/perfil/Email';
import Celular from './components/perfil/Celular';
import Beneficiario from './components/perfil/Beneficiario';
import BeneficiarioPorcentaje from './components/perfil/BeneficiarioPorcentaje';
import Notificaciones from './components/perfil/Notificaciones';
import EstadosCuenta from './components/consultas/EstadosCuenta';
import DocumentosLegales from './components/consultas/DocumentosLegales';
import Research from './components/analisis/Research';
import HistorialFull from './containers/HistorialFull';

import rootReducer from './reducers/rootReducer';
import Loading from './components/Loading';
import { AuthProvider } from './Context/authContext';
import { POST_LOGOUT_REQUEST } from './actions/actionTypes';
import { postLoginObjectLogout } from './actions/loginObjectAction';
import TechRules from './components/analisis/TechRules';
import ConstanciasFiscales from './components/consultas/ConstanciasFiscales';
import DocumentosLegalesFirmar from './components/consultas/DocumentosLegalesFirmar';
import PreguntaSecreta from './components/perfil/PreguntaSecreta';
import TestRefinitivGraficas from './components/TestRefinitivGraficas';
import EjemploUsoPageLayout from './components/EjemploUsoPageLayout';
import EjemploPageLayoutTrading from './components/EjemploPageLayoutTrading';
import GraficaAvanzada from './components/GraficaAvanzada';

const PrivateRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
  const history = useHistory();

  /*
    PENDIENTE !!! -> aparte se cicla :( 
    UPDATE 22 dic 2021: se cicla cuando hace login
    AQUI VAMOS A PONER LA LOGICA PARA CUANDO EL 
    USUARIO INTENTA CAMBIAR DE URL DESDE EL NAVEGADOR.
    Para que no se meta a un url cuando no esta loggeado.
  */
  
  console.log('private route component');
  console.log(rest.path);
  /*console.log(history);
  console.log(history.location);
  console.log(history.action);*/

  console.log(persistorAndStore.store.getState().loginObjectState);

  //si se está haciendo el logout
  if(persistorAndStore.store.getState().logoutRespuesta.loading === true && persistorAndStore.store.getState().logoutRespuesta.message.length > 0){
    console.log("logout esta en loading");
    return <Loading />
  }

  if(persistorAndStore.store.getState().loginObjectState.loading === true){
    console.log("loading en private route");
    return <Loading />
  }

  if(persistorAndStore.store.getState().loginObjectState.response.ierror === (-1) && persistorAndStore.store.getState().loginObjectState.response.cerror.length === 0){
    //el usuario SI esta loggeado

    //antes de enviarlo a la route, revisamos si tiene permiso de ver edoctaOnline
    if(rest.path !== undefined){
      if(rest.path.includes("estados-de-cuenta")){
        if(persistorAndStore.store.getState().loginObjectState.response.dsLogin !== undefined){
          if(persistorAndStore.store.getState().loginObjectState.response.dsLogin.tdsServicios !== undefined){
            if(persistorAndStore.store.getState().loginObjectState.response.dsLogin.tdsServicios.length > 0){
              const puedeVerEdoctaOnline = persistorAndStore.store.getState().loginObjectState.response.dsLogin.tdsServicios[0].EdoctaOnline;
              if(puedeVerEdoctaOnline === false){
                //redireccionamos al usuario a que se vaya a la pag anterior
                history.goBack();
                //return; // <Redirect  />
              }
            }
          }
        }
      }
    }

    console.log("usuario loggeado, acceso a private route");
    return <Route component={Component as React.ComponentType} {...rest} />;
  }

  //el usuario NO esta loggeado, lo mandamos a login, osea a "/"
  console.log("regresamos a login con redirect porque no entro a ningun if");
  return <Redirect to="/" />;
  
  //return <PrivateRoute exact path="/" component={() => <Login />} />;
};

function App() {

  console.log("app tsx");

  const dispatch = useDispatch();

  const cleanStorages = () => {
    //POR MIENTRAS NO LIMPIAMOS NADA, HASTA ENTENDER QUE ES LO QUE HACE EL NAVEGADOR
    dispatch(postLoginObjectLogout());
    //asyncSessionStorage.removeItem("persist:root");
    //sessionStorage.clear();
    //localStorage.clear();
  };

  window.onunload = () => {
    console.log("onunload"); //unload se manda llamar SOLO cuando el usuario cierra la ventan

    cleanStorages();

    //limpiamos todo el reducer
    //rootReducer(undefined, { type: POST_LOGOUT_REQUEST, payload: undefined });
  }
  
  window.onbeforeunload = () => {
    console.log("onbeforeunload"); //se ejecuta en refresh

    /* NOTA IMPORTANTE: esta funcionalidad NO funciona en 
        Internet Explorer, en ninguna version */
    let performanceNavEntries = performance.getEntriesByType("navigation");

    let performanceNavEntriesQueHicieronReload = performanceNavEntries.filter((item: any) => {
      return item.type === "reload";
    });
   // console.log("performanceNavEntries en app");
    //console.log(performanceNavEntriesQueHicieronReload);

    if(performanceNavEntriesQueHicieronReload.length > 0){
      //hubo un reload/refresh
      //no limpiamos storages
    }
    else{
      //no hubo reload/refresh
      //limpiamos storages
      //cleanStorages();
    }

  };

  return (

    <AuthProvider>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Login />} />
            <PrivateRoute path="/ejemplo-layout" exact component={ EjemploUsoPageLayout } />
            <PrivateRoute path="/ejemplo-layout-trading" exact component={ EjemploPageLayoutTrading } />
            <PrivateRoute path="/" exact component={ Portfolio } />
            <Route exact path="/test-graficas" component={() => <TestRefinitivGraficas />} />
            <PrivateRoute exact path="/trading" component={() => <Trading tradingComponents={true} />} />
            <PrivateRoute path="/emisora/:ticker" exact component={ IssuerProfile } />
            <PrivateRoute path="/avanzada/:ticker" exact component={ GraficaAvanzada } />
            <PrivateRoute path="/search" exact component={ Search } />
            <PrivateRoute exact path="/ListasVector" component={() => <Trading tradingComponents={false} />} />
            <PrivateRoute exact path="/Alertas" component={() => <Alerts alertsComponents={false} />} />
            <PrivateRoute path="/portafolio" exact component={ Portfolio } />
            <PrivateRoute exact path="/Fondos" component={() => <Fondos />} />
            <PrivateRoute path="/perfil" exact component={ Perfil } />
            <PrivateRoute path="/vector-analisis" exact component={ VectorAnalisis } />
            <PrivateRoute path="/perfil-alertas" exact component={ Alertas } />
            <PrivateRoute path="/agregar-cuenta-bancaria" exact component={ CuentaBancaria } />
            <PrivateRoute path="/cambiar-contrasena" exact component={ Password } />
            <PrivateRoute path="/pregunta-secreta" exact component={ PreguntaSecreta } />
            <PrivateRoute path="/cambiar-email" exact component={ Email } />
            <PrivateRoute path="/cambiar-celular" exact component={ Celular } />
            <PrivateRoute path="/agregar-beneficiario" exact component={ Beneficiario } />
            <PrivateRoute path="/agregar-porcentaje" exact component={ BeneficiarioPorcentaje } />
            <PrivateRoute path="/notificaciones" exact component={ Notificaciones } />
            <PrivateRoute path="/estados-de-cuenta" exact component={ EstadosCuenta } />
            <PrivateRoute path="/documentos-legales" exact component={ DocumentosLegales } />
            <PrivateRoute path="/documentos-legales/:id/:version" exact component={ DocumentosLegalesFirmar } />


            <PrivateRoute path="/constancias-fiscales" exact component={ ConstanciasFiscales } />
            <PrivateRoute path="/research" exact component={ Research } />
            <PrivateRoute path="/tech-rules" exact component={ TechRules } />
            
            <PrivateRoute path="/mensajes" exact component={ Mensajes } />
            <PrivateRoute path="/listas" exact component={ Lists} />
            <PrivateRoute path="/historial/:ticker" exact component= { HistorialFull } />
            <PrivateRoute path="/posiciones" exact component={ Consultas } />
            <PrivateRoute path="/movimientos" exact component={ Movimientos } />
            <PrivateRoute path="/resumen" exact component={ ResumenCartera } />
          </Switch>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;