import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import Sidebar from '../components/Sidebar';
import { sidebarMockData } from '../mocks/Sidebar';
//import Operations from '../containers/Operations';
import { TradingDatatableData } from "../mocks/Trading";
import { TradingDatatableData2 } from "../mocks/Trading";
import ConsultasTable from "../containers/ConsultasTable";
import ResumenDeCartera from '../containers/ResumenDeCartera'
import { RootState } from '../reducers/rootReducer';
import { LoginObjectState } from '../types/LoginObjectTypes';
import ConsultasHeader from '../containers/ConsultasHeader';
import { FooterComponent } from '../containers/FooterComponent';
import PageLayout from '../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../actions/loginObjectAction'

interface propsFromState {
    loginObject?: LoginObjectState;
    tradingComponents: boolean;
}

type AllProps = propsFromState;

const ResumenCartera: React.FC<AllProps> = ({ loginObject, tradingComponents }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en resumencartera, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                if(loginObject.response.ierror === 92) {
                  dispatch(postLoginObjectLogout());
                  history.push("/");
                } else {
                  //el usuario no esta loggeado, lo mandamos al login
                  console.log("usuario no loggeado en appbar, lo mandamos al login");
                  history.push("/");
                }
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en resumencartera, lo mandamos al login");
            history.push("/");
        }
    },[]);

    let childrenContentPrincipal = (
        <>
            <div className="flex flex-col">
                <ConsultasHeader selectedTab="Resumen de Cartera" />
                <ResumenDeCartera />
            </div>
        </>
    );

    return (
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
    };
};


export default connect(mapStateToProps)(ResumenCartera);