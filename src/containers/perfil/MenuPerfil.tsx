import React from 'react';
import { NavLink } from "react-router-dom";

interface propsFromState {
    ubicacionDelMenu?: string;
}

type AllProps = propsFromState;

const MenuPerfil: React.FC<AllProps> = ({ ubicacionDelMenu }) => {
    return(
        <div className="w-full">
            <ul>
                <li className="font-sans text-red-600 text-sm font-bold my-4">
                    <NavLink to="/perfil">
                        <div className="hover:text-red-600">
                            <p>Perfil</p>
                        </div>
                    </NavLink>
                </li>
                <li className="mb-3">
                    <NavLink to="/perfil#clabe-vector">
                        <div className="font-sans text-sm">
                            <p>Datos Personales</p>
                        </div>
                    </NavLink>
                </li>
                <li className="font-sans text-red-600 text-sm font-bold mb-3">Avisos</li>
                <li className="mb-3">
                    <NavLink to="/notificaciones">
                        <div className="font-sans text-sm">
                            <p>Notificaciones</p>
                        </div>
                    </NavLink>
                </li>
                <li className="mb-3">
                    <NavLink to="/perfil-alertas">
                        <div className="font-sans text-sm">
                            <p>Alertas Emisora</p>
                        </div>
                    </NavLink>
                </li>
                <li className="mb-3">
                    <NavLink to="/vector-analisis">
                        <div className="font-sans text-sm">
                            <p>Vector Análisis</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
export default MenuPerfil