import React from 'react';
import {  NavLink  } from "react-router-dom";
import Loading from "../components/Loading";

//Types
import { ItdsMovimientos } from '../types/HistorialEmisoraTypes';

//State of the component
interface propsFromState {
    movimientos: ItdsMovimientos[];
    cargando: boolean;
    emisora: string;
    serie: string;
}

type AllProps = propsFromState;

const Historial: React.FC<AllProps> = ({ movimientos, cargando, emisora, serie }) =>{

    return(
        <div>
            {
                cargando ?
                    <Loading />
                :
                    (movimientos === null || movimientos === undefined) ? 
                        <div className="h-8">
                            <p>No hay historial de esta emisora</p>
                        </div> 
                    :
                        <table className="table-auto w-3/4 border-separate">
                            <tbody>
                                {
                                    movimientos.slice(0, 5).map((data: any, index: any) => {
                                        return(
                                            <tr className="spaceUnder">
                                                <td className="font-semibold text-sm my-12">{data.DescTransaccion}</td>
                                                <td className="font-medium text-sm my-12">{data.sTitulos +" titulos a " + data.sPrecio}</td>
                                                <td className="font-semibold text-sm my-12">{data.sMonto}</td>
                                                <td className="font-medium text-sm my-12 text-gray-500">{data.FechaOperacion}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
            }
            {
                (movimientos === null || movimientos === undefined) ?
                    ""
                : 
                    <div className="w-full flex justify-end mx pr-4">
                        <NavLink to={"/historial/"+emisora+"."+serie}  >
                            <p className="text-sm text-red-600 cursor-pointer hover:underline">Ver todo</p>
                        </NavLink>
                    </div>
            }
        </div>
    );
 }

export default Historial;