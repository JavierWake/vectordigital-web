import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';
import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import Sidebar from '../components/Sidebar';
import { sidebarMockData } from '../mocks/Sidebar';
import { TradingDatatableData } from "../mocks/Trading";
import { TradingDatatableData2 } from "../mocks/Trading";
import TablaMovimientos from "../containers/Movimientos";
import {getConsultasRequest} from "../actions/consultasAction";
import Navbar from '../containers/Navbar';

import { NavMovimientos } from '../mocks/TabsData';
import { LoginObjectState } from '../types/LoginObjectTypes';
import ConsultasHeader from '../containers/ConsultasHeader';
import { FooterComponent } from '../containers/FooterComponent';
import PageLayout from '../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    loginObject?: LoginObjectState;
    tradingComponents: boolean;

}

type AllProps = propsFromState;
// si se quiere llamar a response de consultas (response.response)
const Movimientos: React.FC<AllProps> = ({ loginObject, tradingComponents }) => {
/*     const dispatch = useDispatch();
    useEffect(() => {
        let message = "/consulta/movimientos?cuenta=266563&anio=2020&mes=12";
        let params = [ "6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10100" ]
        dispatch(getConsultasRequest({message, params}));
    },[]) */

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
                    console.log("usuario no loggeado en movimientos, lo mandamos al login");
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
            console.log("usuario no loggeado en movimientos, lo mandamos al login");
            history.push("/");
        }
    },[]);

    let childrenContentPrincipal = (
        <>
            <div className="flex flex-col">
                <ConsultasHeader selectedTab="Movimientos" />
                <div className = "my-10">
                    <Navbar 
                        navData={["Mes", "Día"]} 
                        data={NavMovimientos()}
                        styleIsButtons={true}
                    /> 
                    <br/>
                </div>
            </div>
        </>
    );

    return (
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}

/* //Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        response: store.consultas
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getConsultasRequest: () => dispatch(getConsultasRequest)
    };
}; */

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState, 
    };
};



export default connect(mapStateToProps)(Movimientos);
