import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { SimpleTableTabs } from './SimpleTableTabs';
import { TableTabs } from '../mocks/TabsData';
import { PortfolioStatus } from '../types/PortfolioTypes';
import { getDsPortafolioRequest } from '../actions/portfolioAction';
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    loginObject?: LoginObjectState;
    portfolio: PortfolioStatus;
    selectedTabTitle?: string;
    sendFondoSeleccionado?: (data: string) => void;
}

type AllProps = propsFromState; 

const Positions: React.FC<AllProps> = ({ loginObject, portfolio, selectedTabTitle, sendFondoSeleccionado }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                
                        //el estado esta en initial state, hacemos el dispatch a portfolio
                        let message = "/consulta/portafolio?cuenta=" + cuentaLO.toString();
                        let params = ["", canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                        let a = { message, params }
                        dispatch(getDsPortafolioRequest(a));
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en positions, lo mandamos al login");
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
            console.log("usuario no loggeado en positions, lo mandamos al login");
            history.push("/");
        }
    },[]);


    return (
        <div>
            <SimpleTableTabs title="Posiciones" color="red" selectedTabTitle={selectedTabTitle} tabsData={TableTabs(portfolio?.dsPortafolio.tdsPortafolioFd, portfolio?.dsPortafolio.tdsPortafolioMd, portfolio?.dsPortafolio.tdsPortafolioCap, sendFondoSeleccionado)} />
        </div>
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        portfolio: store.portfolio,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getDsPortafolioRequest: () => dispatch(getDsPortafolioRequest(dispatch))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Positions);