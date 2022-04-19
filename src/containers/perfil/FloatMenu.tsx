import React from 'react';

import { NavLink } from "react-router-dom";

import {
    MdExitToApp,
    MdZoomIn,
    MdNotifications,
    MdMonetizationOn,
    MdTimeline,
    MdDescription,
    MdFolderSpecial,
    MdAccountBalanceWallet
} from "react-icons/md";

import { FaBullhorn } from "react-icons/fa";
import '../../styles/activeClass.css';

type Props = {
    showMenu: boolean;
};

const FloatMenu: React.FC<Props> = ({ showMenu }) => {

    const handleLogout = () => {
        //logout({ returnTo: window.location.origin });
    };

    return (
        <div className={"absolute right-10 shadow-sm bg-white z-50 " + (showMenu ? "" : "hidden")} style={{ top: "66px", width: "309px" }} id="FloatMenu">
            <div className="pt-8 px-8 pb-3 border-b-2 border-gray-300">
                <a href="/perfil" className="font-sans text-red-600 text-sm font-bold hover:text-red-600">Datos Personales</a>
                <ul>
                    <li className="mt-4 font-sans text-red-600 text-sm font-bold">Avisos</li>
                    <li className="ml-3 my-2">
                        <NavLink to="/notificaciones" activeClassName="selected">
                            <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                <FaBullhorn className="icon my-0 mr-3 " style={{ color: "#999", width: "20px" }} />Notificaciones 
                            </div>
                        </NavLink>
                    </li>
                    <li className="ml-3 my-2">
                        <NavLink to="/perfil-alertas" activeClassName="selected">
                            <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                <MdNotifications className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Alertas Emisora
                            </div>
                        </NavLink>
                    </li>
                    <li className="ml-3 my-2">
                        <NavLink to="/vector-analisis" activeClassName="selected">
                            <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                <MdZoomIn className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Vector Análisis
                            </div>
                        </NavLink>
                    </li>
                    <li className="mt-4 font-sans text-red-600 text-sm font-bold">Consultas</li>
                    <li className="ml-3 my-2"><a href="#" className="flex items-center font-sans text-sm hover:text-yellow-600"><MdMonetizationOn className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Posiciones</a></li>
                    <li className="ml-3 my-2"><a href="#" className="flex items-center font-sans text-sm hover:text-yellow-600"><MdTimeline className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Movimientos</a></li>
                    <li className="ml-3 my-2"><a href="#" className="flex items-center font-sans text-sm hover:text-yellow-600"><MdAccountBalanceWallet className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Resumen de Cartera</a></li>
                    <li className="ml-3 my-2"><a href="#" className="flex items-center font-sans text-sm hover:text-yellow-600"><MdFolderSpecial className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Estados de Cuenta y<br></br> Constancias Fiscales</a></li>
                    <li className="ml-3 my-2"><a href="#" className="flex items-center font-sans text-sm hover:text-yellow-600"><MdDescription className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Documentos Legales</a></li>
                </ul>
            </div>
            <div className="p-8 ml-3">
                <a href="#logout" className="flex items-center" onClick={handleLogout}>
                    <MdExitToApp className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                    <span className="font-sans text-sm hover:text-yellow-600">Cerrar Sesión</span>
                </a>
            </div>
        </div>
    );
}
export default FloatMenu