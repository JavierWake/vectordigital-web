import React, { useState } from "react";

import { Dropdown } from "./Dropdown";
import { DropdownDataFrecuency, DropdownDataInfo } from "../mocks/DropdownData";

interface propsFromState {
    alertPriceComponents: any;
}

type AllProps = propsFromState; 

const AlertPrice: React.FC<AllProps> = ({ alertPriceComponents }) => {

    const [frecuency, setFrecuency] = useState("");
    const [info, setInfo] = useState("");
    const [type, setType] = useState("");
    const [emisora, setEmisora] = useState("");

    const sendFrecuency = (data: string) => {
        setFrecuency(data);
    }

    const sendInfo = (data: string) => {
        setInfo(data);
    }

    const sendType = (data: string) => {
        setType(data);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }
    
    var date = new Date();
        
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var month2 = month.toString();
    var day2 = day.toString();

    if (month < 10) month2 = "0" + month;
    if (day < 10) day2 = "0" + day;

    var today = year + "-" + month2 + "-" + day2;

    const [fecha, setFecha] = useState(today);
    
    return(
        <form onSubmit = {handleSubmit}>
            <div className="flex flex-row mt-6">
                <div>
                    <h1 className="text-sm">Emisora</h1>
                    <input type="text" className="relative w-72 h-9 mt-3 px-2 py-2 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm" onChange={e => setEmisora(e.target.value)}/>
                </div>   
                <div className="ml-16">
                    <h1 className="text-sm mb-3">Vigencia</h1>
                    <input type="date" value={fecha} min={today} className="relative w-72 h-9 px-2 py-2 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm" onChange={e => setFecha(e.target.value)}/>
                </div>  
                <div className="ml-14">
                    <h1 className="text-sm mb-3">Frecuencia</h1>
                    {/* <Dropdown sendType={(frecuency) => sendFrecuency(frecuency)} list={true} dropdownData={DropdownDataFrecuency} /> */}
                </div>                 
            </div>
            <div className="flex flex-row mt-10">
                <div>
                    <h1 className="text-sm mb-3">Fuente de información</h1>
                    {/* <Dropdown sendType={(info) => sendInfo(info)} list={true} dropdownData={DropdownDataInfo} /> */}
                </div> 
                <div className="ml-24">
                    <h1 className="text-sm mb-3">Tipo</h1>
                    {/* <Dropdown sendType={(type) => sendType(type)} list={true} dropdownData={DropdownDataFrecuency} /> */}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button type="submit" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"> Crear alerta</button>
            </div>
        </form>
    );

}

export default AlertPrice;