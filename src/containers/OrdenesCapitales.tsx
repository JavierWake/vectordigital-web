import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';

//Containers
import { Dropdown } from "../containers/Dropdown";
import ModalView  from '../containers/ModalView';

//Mocks
import { DropdownDataMostrar } from "../mocks/DropdownData";

//Actions
import { getDsOrdenesRequest } from '../actions/ordenesAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types
import { OrdenesStatus } from '../types/OrdenesTypes';

//Icons
import { MdModeEdit } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';

interface propsFromState {
    loginObject?: LoginObjectState;
    ordenes: OrdenesStatus;
}

type AllProps = propsFromState; 

const OrdenesCapitales: React.FC<AllProps> = ({ loginObject, ordenes }) => {

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
                
                        let message = "/consulta/ordenes?cuenta=" + cuentaLO;
                        let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                        let a = { message, params };
                        dispatch(getDsOrdenesRequest(a));
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en ordenescapitales, lo mandamos al login");
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
            console.log("usuario no loggeado en ordenescapitales, lo mandamos al login");
            history.push("/");
        }
    },[]);


    const [mostrar, setMostrar] = useState("5");

    const sendMostrar = (data: string) => {
        setMostrar(data);
    };

    /*useEffect(() => {
        
        let message = "/consulta/ordenes?cuenta=cuenta&";
        let params = [ "6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "cuentasesion", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10100" ]
        let a = { message, params }
        dispatch(getDsOrdenesRequest(a));

    },[]); */

    return(
        <div>
            {
                !ordenes.tdsOrdenesEstado[0].estatusCap ? "No hay datos" 
                :
                <div className="flex flex-row justify-end items-center mb-4">
                    <p className="text-sm mx-2">Mostrar</p>
                    <Dropdown
                        dropdownData={DropdownDataMostrar}
                        initialOption={"10"}
                        side={false}
                        sendOption={(profundidad:any) => sendMostrar(profundidad)}
                        fondosFamilia={false}
                    />
                </div>
            }
            {
                !ordenes.tdsOrdenesEstado[0].estatusCap ? "" 
                :
                ordenes.tdsOrdenesCap.slice(0,4).map((capital: any, index: any)=> {
                    let titulos = "titulo";
                    if ( capital.titulos > 1 ) {
                        titulos = "titulos"
                    }
                    return(
                        <div className="flex w-full justify-between pb-2 border-b-2 mt-2">
                            <div>
                                <p className="font-semibold text-sm">{capital.Instruccion + " " + capital.tipoorden}</p>
                                <p className="uppercase text-sm">{capital.emisora}</p>
                                {/* <p className="text-xs">{capital.name}</p> */}
                            </div>
                            <div className="flex items-top">
                                <div className="text-right">
                                    <p className="font-semibold text-sm">{capital.precio}</p>
                                    <p className="text-sm">{capital.titulos + " " + titulos +" a "+ capital.precio}</p>
                                    <p className="text-xs text-gray-200">{capital.estatusDesc}</p>
                                </div>
                                <div className="mx-2">
                                    <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"editar"} hora={capital.Hora} issuer={false}/>
                                </div>
                                <div className="">
                                    <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"delete"} issuer={false} />
                                </div>
                            </div>
                        </div>      
                    );
                })
            }
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        ordenes: store.ordenes,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getDsOrdenesRequest: () => dispatch(getDsOrdenesRequest),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdenesCapitales);