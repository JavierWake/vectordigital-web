import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    MdMonetizationOn,
    MdTimeline,
    MdDescription,
    MdFolderSpecial,
    MdAccountBalanceWallet,
    MdClose,
    MdInsertDriveFile,
    MdCardTravel,
    MdReceipt,
    MdLocalPostOffice,
} from "react-icons/md";

import '../../styles/activeClass.css';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { RootState } from '../../reducers/rootReducer';

type Props = {
    loginObject?: LoginObjectState;
};

const ConsultasFloatMenu: React.FC<Props> = ({ loginObject }) => {
    
    const history = useHistory();
  const [showConsultasMenu, setShowConsultasMenu] = useState(false);

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
    
    function useClickOutside(ref) {
        useEffect(() => {
            
            //aqui se da cuenta que dio click afuera
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowConsultasMenu(false)
                }
            }
    
            // se activa el event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // se desactiva el event listener
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef);
    
    return (
        <div  ref={wrapperRef}>
            <button onClick={() => setShowConsultasMenu(!showConsultasMenu)}>
              <div className="consultasBtn px-2 w-full flex flex-col justify-between items-center p-1">
                <MdFolderSpecial className="text-red-600 text-3xl pb-1" />
                <p className="text-red-600 text-xs">Consultas</p>
              </div>
            </button>
            <div className={"w-4/24 absolute right-10 shadow-sm bg-white z-50 " + (showConsultasMenu ? "" : "hidden")} style={{ top: "66px", width: "309px" }} id="ConsultasFloatMenu">
                <div className="w-full pt-4 pl-8 pr-2 pb-3 border-b-2 border-gray-300">
                    <ul>
                        <li className="mt-2 w-full flex flex-row font-sans text-red-600 text-sm font-bold">
                            <p className ="w-22/24 pr-2">Consultas</p>
                        </li>
                        <li className="ml-3 my-2">
                            <NavLink to="/posiciones">
                                <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                    <MdMonetizationOn className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                    <p>Posiciones</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className="ml-3 my-2">
                            <NavLink to="/movimientos">
                                <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                    <MdTimeline className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                    <p>Movimientos</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className="ml-3 my-2">
                            <NavLink to="/resumen">
                                <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                    <MdAccountBalanceWallet className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                    <p>Resumen de Cartera</p>
                                </div>
                            </NavLink>
                        </li>
                        {
                            edoctaOnline === true && <li className="ml-3 my-2">
                                <NavLink to="/estados-de-cuenta">
                                    <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                        <MdFolderSpecial className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                        <p>Estados de Cuenta</p>
                                    </div>
                                </NavLink>
                            </li>
                        }
                        <li className="ml-3 my-2">
                            <NavLink to="/constancias-fiscales">
                                <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                    <MdLocalPostOffice className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                    <p>Constancias Fiscales</p>
                                </div>
                            </NavLink>
                        </li>

                        <li className="ml-3 my-2">
                            <NavLink to="/documentos-legales">
                                <div className="flex flex-row items-center font-sans text-sm hover:text-yellow-600">
                                    <MdInsertDriveFile className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                                    <p>Documentos Legales</p>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};

export default connect(mapStateToProps)(ConsultasFloatMenu);