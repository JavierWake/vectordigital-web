import React, { useEffect } from 'react';
import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import Sidebar from '../components/Sidebar';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import ConsultasTable from "../containers/ConsultasTable";
import { LoginObjectState } from '../types/LoginObjectTypes';
import { RootState } from '../reducers/rootReducer';
import ConsultasHeader from '../containers/ConsultasHeader';
import { FooterComponent } from '../containers/FooterComponent';
import PageLayout from '../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    tradingComponents: boolean;
    loginObject?: LoginObjectState;
}

type AllProps = propsFromState;

const Consultas: React.FC<AllProps> = ({ tradingComponents, loginObject }) => {

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
                    console.log("usuario no loggeado en consultas, lo mandamos al login");
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
            console.log("usuario no loggeado en consultas, lo mandamos al login");
            history.push("/");
        }
    },[]);

    let childrenContentPrincipal = (
        <>
            <div className="flex flex-col">
                <ConsultasHeader selectedTab="Posiciones" />
                <ConsultasTable />
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
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};


export default connect(mapStateToProps)(Consultas);