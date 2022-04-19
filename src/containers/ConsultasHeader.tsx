import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { RootState } from '../reducers/rootReducer';
import { LoginObjectState } from '../types/LoginObjectTypes';

//State of the component
interface propsFromState {
    selectedTab: string;
    loginObject?: LoginObjectState;
}

type AllProps = propsFromState;

const ConsultasHeader: React.FC<AllProps> = ({ selectedTab, loginObject }) =>{
    const history = useHistory();

    //HOOKS
    const [edoctaOnline, setEdoctaOnline] = useState(true);

    const sendEdoctaOnline = (data: boolean) => {
        if(edoctaOnline === data){
            return;
        };
        setEdoctaOnline(data);
    };

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                        
                        //revisamos servicios/permisos del usuario
                        if(loginObject.response.dsLogin.tdsServicios.length > 0){
                            sendEdoctaOnline(loginObject.response.dsLogin.tdsServicios[0].EdoctaOnline);
                        }
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en consultas, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en consultas, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en consultas, lo mandamos al login");
            history.push("/");
        }
    },[]);
    
    return(
        <div className="w-full flex flex-col pb-3">
            <div className="encabezado w-full py-2">
                <h1 className="font-sans text-2xl font-medium">Consultas</h1>
            </div>
            <div className="tabs w-full flex flex-row flex-wrap border-b border-gray-300">
                <NavLink to="/posiciones">
                    <div className={`pr-4 ${selectedTab === "Posiciones" ? "border-b-2 border-red-600" : ""}`}>
                        <p className={`py-2 px-1 text-sm ${selectedTab === "Posiciones" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Posiciones</p>
                    </div>
                </NavLink>
                <NavLink to="/movimientos">
                    <div className={`pr-4 ${selectedTab === "Movimientos" ? "border-b-2 border-red-600" : ""}`}>
                        <p className={`py-2 px-1 text-sm ${selectedTab === "Movimientos" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Movimientos</p>
                    </div>
                </NavLink>
                <NavLink to="/resumen">
                    <div className={`pr-4 ${selectedTab === "Resumen de Cartera" ? "border-b-2 border-red-600" : ""}`}>
                        <p className={`py-2 px-1 text-sm ${selectedTab === "Resumen de Cartera" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Resumen de Cartera</p>
                    </div>
                </NavLink>

                {
                    edoctaOnline === true && <NavLink to="/estados-de-cuenta">
                        <div className={`pr-4 ${selectedTab === "Estados de Cuenta" ? "border-b-2 border-red-600" : ""}`}>
                            <p className={`py-2 px-1 text-sm ${selectedTab === "Estados de Cuenta" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Estados de Cuenta</p>
                        </div>
                    </NavLink>
                }

                <NavLink to="/constancias-fiscales">
                    <div className={`pr-4 ${selectedTab === "Constancias" ? "border-b-2 border-red-600" : ""}`}>
                        <p className={`py-2 px-1 text-sm ${selectedTab === "Constancias" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Constancias Fiscales</p>
                    </div>
                </NavLink>
                <NavLink to="/documentos-legales">
                    <div className={`pr-4 ${selectedTab === "Documentos Legales" ? "border-b-2 border-red-600" : ""}`}>
                        <p className={`py-2 px-1 text-sm ${selectedTab === "Documentos Legales" ? "text-red-600" : "text-gray-500"} hover:text-red-600`}>Documentos Legales</p>
                    </div>
                </NavLink>
            </div>
            {/*<div className="encabezadoSeccion w-full pt-5">
                <h1 className="font-sans text-xl text-gray-800 font-medium">{selectedTab}</h1>
                <hr className="solid bg-gray-500 my-3"/>
            </div>*/}
        </div>
    );
};


//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};

export default connect(mapStateToProps)(ConsultasHeader);