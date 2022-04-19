import React, { useEffect, useState } from 'react';

//Containers
import { Dropdown } from "../containers/Dropdown";

//Mocks
import { DropdownDataMostrar } from "../mocks/DropdownData";

//Icons
import { MdModeEdit } from "react-icons/md";
import { MdClose } from "react-icons/md";

const OrdenesFondos: React.FC = () => {
    
    const [mostrar, setMostrar] = useState("5");

    const sendMostrar = (data: string) => {
        setMostrar(data);
    };

    return(
        <div>
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
            <div className="flex w-full justify-between pb-2 border-b-2 mt-2">
                <div>
                    <p className="font-semibold text-sm">Venta Limitada</p>
                    <p className="uppercase text-sm">equity</p>
                </div>

                <div>
                    <div className="text-right">
                        <p className="font-semibold text-sm">$ 4,000.00</p>
                        <p className="text-sm">12/01/21</p>
                        <p className="text-xs">Parcialmente completada</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between pb-2 border-b-2 mt-2">
                <div>
                    <p className="font-semibold text-sm">Venta Limitada</p>
                    <p className="uppercase text-sm">equity</p>
                </div>

                <div>
                    <div className="text-right">
                        <p className="font-semibold text-sm">$ 4,000.00</p>
                        <p className="text-sm">12/01/21</p>
                        <p className="text-xs">Parcialmente completada</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between pb-2 border-b-2 mt-2">
                <div>
                    <p className="font-semibold text-sm">Venta Limitada</p>
                    <p className="uppercase text-sm">equity</p>
                </div>

                <div>
                    <div className="text-right">
                        <p className="font-semibold text-sm">$ 4,000.00</p>
                        <p className="text-sm">12/01/21</p>
                        <p className="text-xs">Parcialmente completada</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between pb-2 border-b-2 mt-2">
                <div>
                    <p className="font-semibold text-sm">Venta Limitada</p>
                    <p className="uppercase text-sm">equity</p>
                </div>

                <div>
                    <div className="text-right">
                        <p className="font-semibold text-sm">$ 4,000.00</p>
                        <p className="text-sm">12/01/21</p>
                        <p className="text-xs">Parcialmente completada</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdenesFondos;