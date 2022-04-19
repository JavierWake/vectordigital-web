import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux';

import { createAlertRequestVariacion } from '../actions/createAlertAction';
import { Dropdown } from "./Dropdown";
import { DropdownData, DropdownDataFrecuency, DropdownDataTipo1 } from "../mocks/DropdownData";

import { getAlertRequest } from '../actions/alertGet';

interface propsFromState {
    alertPriceComponents: any;
}

type AllProps = propsFromState; 

const AlertPrice: React.FC<AllProps> = ({ alertPriceComponents }) => {

    const dispatch = useDispatch();

    const [type, setType] = useState("");
    const [frecuency, setFrecuency] = useState("");
    const [typeData, setTypeData] = useState("");

    const [price, setPrice] = useState(true);
    const [range, setRange] = useState(false);
    const [variacion, setVariacion] = useState(false);

    const [valor, setValor] = useState("");
    const [emisora, setEmisora] = useState("");
    const [inferior, setInferior] = useState("");
    const [superior, setSuperior] = useState("");

    const sendType = (data: string) => {
        setType(data);
        if(data === "Precio fijo"){
            setPrice(true);
            setRange(false);
            setVariacion(false);
        }
        if(data === "En rango"){
            setRange(true);
            setPrice(false);
            setVariacion(false);
        }
        if(data === "Variación"){
            setVariacion(true);
            setPrice(false);
            setRange(false);
        }
    }

    const sendFrecuency = (data: string) => {
        setFrecuency(data);
        // console.log(data);
    }

    const sendTypeData = (data: string) => {
        setTypeData(data);
        // console.log(data);
    }

    const enviaDatos = (event: any) => {
        event.preventDefault();
        // console.log(type);
        // console.log("sdsd",emisora);
        // console.log(fecha);
        // console.log(frecuency);
        // console.log(valor);
        // console.log(typeData);

        let params={tipo: "variacion", ticker:"AAPL", vigencia: fecha, frecuencia: 0, fecha_creada: today, valor: valor, tipo_v: 0, movimiento: 1}
        let message = "22f94cb4-67d6-4f29-9248-ff7f32657cfa"
        let a = [message, params]
        dispatch(createAlertRequestVariacion(a));
                
    }

    // useEffect(() => {
    //     dispatch(getAlertRequest("22f94cb4-67d6-4f29-9248-ff7f32657cfa"));
    // },[])
    
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
        <form onSubmit = {enviaDatos}>
            <div className="flex-grow-0">
                <span className="text-sm mr-4 py-2">Tipo de Alerta</span>
                {/* <Dropdown sendType={(type) => sendType(type)} list={true} dropdownData={DropdownData} /> */}
            </div>
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
                    <h1 className="text-sm">Valor</h1>
                    <input type="text" className="relative w-72 h-9 mt-3 px-2 py-2 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm" onChange={e => setValor(e.target.value)}/>
                </div> 
                {
                    price? <div></div> :
                    variacion? 
                <div className="ml-16">
                    <h1 className="text-sm mb-3">Tipo</h1>
                    {/* <Dropdown sendType={(typeData) => sendTypeData(typeData)} list={true} dropdownData={DropdownDataTipo1} /> */}
                </div>  : 
                <div className="ml-16">
                    <h1 className="text-sm">Limite inferior</h1>
                    <input type="text" className="relative w-72 h-9 mt-3 px-2 py-2 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm" onChange={e => setSuperior(e.target.value)}/>
                </div>}{
                range? 
                    <div className="ml-14">
                        <h1 className="text-sm">Limite Superior</h1>
                        <input type="text" className="relative w-72 h-9 mt-3 px-2 py-2 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm" onChange={e => setInferior(e.target.value)}/>
                    </div> : <div></div>
                }         
            </div>
            { price? <div></div> :

                <div className="flex-grow-0 justify-between mt-12">
                    <span className="text-sm mr-4 py-2">Mandar alerta cuando la emisora se encuentre por</span>
                    <input type="checkbox" className="ml-8 checked:bg-red-600 checked:border-red-600"/>
                    <span className="text-sm ml-6 py-2"> {variacion? "Encima del valor indicado" : "Dentro del rango indicado"}</span>
                    <input type="checkbox" className="ml-8 checked:bg-red-600 checked:border-red-600"/>
                    <span className="text-sm ml-6 py-2">{variacion? "Debajo del valor indicado" : "Fuera del rango indicado"} </span>
                </div>
            
            }  
            <div className="flex justify-end mt-4">
                <button type="submit" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"> Crear alerta</button>
            </div>
        </form>
    );

}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createAlertRequestVariacion: () => dispatch(createAlertRequestVariacion(dispatch)),
        getAlertRequest: () => dispatch(getAlertRequest(dispatch))
    };
};

export default connect(null, mapDispatchToProps)(AlertPrice);