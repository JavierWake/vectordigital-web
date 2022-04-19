import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';

import { RootState } from '../../reducers/rootReducer';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import ConsultasHeader from '../../containers/ConsultasHeader';
import DocumentosLegalesContainer from '../../containers/DocumentosLegalesContainer';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface ModalFolioTarjetaProps {
    loginObject: LoginObjectState;
}

const DocumentosLegales: React.FC<ModalFolioTarjetaProps> = ({ loginObject }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en portfolio, lo mandamos al login");
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
    }, []);

    let childrenContentPrincipal = (
        <>
            <div className="flex flex-col">
                <ConsultasHeader selectedTab="Documentos Legales" />
                <DocumentosLegalesContainer />
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};

export default connect(mapStateToProps)(DocumentosLegales);
