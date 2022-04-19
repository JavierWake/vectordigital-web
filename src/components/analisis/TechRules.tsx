import React, { useState, useEffect } from 'react';
import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';
import Operations from '../../containers/Operations';
import { Input } from 'reactstrap';
import axios from 'axios';
import Rating from 'react-rating-system';


import '../../styles/analisis.css';

import {
    MdExpandMore,
    MdFileDownload,
    MdUnfoldMore,
    MdExpandLess
} from "react-icons/md";
import { GiMexico } from "react-icons/gi";
import { BiWorld } from "react-icons/bi";

import PageLayout from '../../containers/layout/PageLayout';


const TechRules: React.FC = ({ }) => {

    const [dataSic, setDataSic] = useState([]);
    const [dataMex, setDataMex] = useState([]);
    const [dataEtf, setDataEtf] = useState([]);
    const [dataModel, setDataModel] = useState(Object);
    const [dataModelSic, setDataModelSic] = useState(Object);
    const [dataTable, setDataTable] = useState([]);


    //Mercado
    useEffect(() => {
        const api = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/toppicks/1319992`;
        fetch(api)
        .then(response => response.json())
        .then((jsonData) => {
            // jsonData is parsed json object received from url
            //console.log(jsonData)
            setDataSic(jsonData);
        })
      },[])

    useEffect(() => {
        const api_top_mex = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/toppicks/1319991`;
        fetch(api_top_mex)
        .then(response => response.json())
        .then((jsonData) => {
            // jsonData is parsed json object received from url
            //console.log(jsonData)
            setDataMex(jsonData);
        })
    },[])

    useEffect(() => {
        const api_top_etf = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/toppicks/1319995`;
        fetch(api_top_etf)
        .then(response => response.json())
        .then((jsonData) => {
            // jsonData is parsed json object received from url
            //console.log(jsonData)
            setDataEtf(jsonData);
        })
    },[])

    // BMV 
    useEffect(() => {
        const api_model = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/modelo/1319991`;
        fetch(api_model)
        .then(response => response.json())
        .then((jsonData) => {
            // jsonData is parsed json object received from url
            // console.log("modelo")
            // console.log(jsonData[0])
            setDataModel(jsonData[0]);
        })
    },[])
    //SIC
    useEffect(() => {
        const api_model_sic = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/modelo/1319992`;
        fetch(api_model_sic)
        .then(response => response.json())
        .then((jsonData) => {
            // jsonData is parsed json object received from url
            // console.log("modelo sic")
            // console.log(jsonData[0])
            setDataModelSic(jsonData[0]);
        })
    },[])

    //enviar mercado //201592
    // Mis posiciones
    //liquidez
    //buscar
    //mercado watch list

    //filtro
    //reomendacion
    //bolsa ocultar

    useEffect(() => {
        const api_table = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/watchlist/1319991`;
        fetch(api_table)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData)
            setDataTable(jsonData);
        })
    },[])

    const [mercado, setMercado] = useState()


    const getMercado = async () => {
        console.log("Obtener mercado ")
        const data = await fetch("https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/watchlist/1319992")
        const tabla = await data.json()
        console.log(tabla)
        setMercado(tabla)

        // let api_table = `https://666runvuo6.execute-api.us-east-1.amazonaws.com/dev/techrules/watchlist/1319992`;
        // fetch(api_table)
        // .then(response => response.json())
        // .then((jsonData) => {
        //     console.log(jsonData)
        //     setDataTable(jsonData);
        // })
    }




    const [openTab, setOpenTab] = useState("u1");
    const [openTab2, setOpenTab2] = useState("d2-u1");

    const sendOpenTab = (data: string) => {
        setOpenTab(data);
    }
    const sendOpenTab2 = (data: string) => {
        setOpenTab2(data);
    }

    const [openRowId, setOpenRowId] = useState("");

    const openRow = (data:string) => {
        console.log(data)
        
        setOpenRowId(data)
    }

    const [shownMore, setShownMore] = useState({});
    const toggleMore = id => {
        setShownMore(prevShownMore => ({
            ...prevShownMore,
            [id]: !prevShownMore[id]
        }));
    };

    let classesContentPrincipal = "pl-10";
    let childrenContentPrincipal = (
        <>
            <div className="content w-full mt-4 pr-10">

                <div className="nav-alertas mb-10">
                    <ul className="border-b-2 border-gray-300 pb-2">
                        <li className="inline"><a href="/research" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Lo del momento</a></li>                                 
                        {/* <li className="inline"><a href="/fundamental" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Fundamental</a></li>
                        <li className="inline"><a href="/tecnico" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Técnico</a></li> */}
                        <li className="inline"><a href="/tech-rules" className="border-b-2 border-red-600 pb-2.5 pr-16 text-sm text-red-600 font-medium hover:text-red-600">Tech Rules</a></li>
                    </ul>
                </div>


                <div className="Grafica w-full bg-gray-300 flex items-center justify-center" style={{height:"50vh"}}>
                    <iframe style={{width:"100%", height:"100%"}} src="https://vector.techrules.com/SOA20/treport/IndexChart?BusinessArea=VECTOR&Language=es-ES&ProductCode=1_HOMEX_&UserId=1" frameBorder="0"></iframe>
                </div>

                <div className="subtile pb-2 mb-4 mt-12 border-b-2 border-gray-300 pb-4 flex justify-between">
                    <p className="text-xl font-medium">Análisis cuantitativo</p>
                    <MdExpandMore  className="icon my-0" />
                </div>

                <div>
                    <p className="text-sm mb-3">Te compartimos las decisiones de inversión de un modelo cuantitativo construidas por Tech Rules</p>
                </div>

                <div className="bg-white w-full shadow-md rounded p-12">
                    <div className="w-full text-center mb-12">
                        <p className="font-bold">Señal del modelo</p>
                    </div>
                    <div className="w-full flex">
                        <div className="w-50 border-r-2">
                            <div className="mb-4">
                                <p className="inline px-4 py-1 rounded text-sm font-bold" style={{color:"#04B700",background:"rgba(4, 183, 0, 0.2)"}} >Largo</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-xs">El modelo actualmente tiene posisción en esta emisora</p>
                            </div>
                            <div className="flex mb-8">
                                <div className="mr-16">
                                    <p className="text-sm text-red-600 font-bold mb-2 flex items-center">
                                        <GiMexico className="mr-2" style={{width:"22px", height:"22px"}} />
                                        México
                                    </p>
                                    <p className="text-sm font-bold">{dataModel && dataModel.largo} emisoras</p>
                                    <p><span className="text-xs">de</span> <span className="text-sm font-bold">{dataModel && dataModel.total_emisoras}</span></p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold mb-2 flex items-center" style={{color:"#172A56"}}>
                                        <BiWorld className="mr-2" style={{width:"24px", height:"24px"}} />
                                        SIC
                                    </p>
                                    <p className="text-sm font-bold">{dataModelSic && dataModelSic.largo} emisoras</p>
                                    <p><span className="text-xs">de</span> <span className="text-sm font-bold">{dataModelSic && dataModelSic.total_emisoras}</span></p>
                                </div>
                                
                            </div>
                            <div>
                                <div className="mb-4">
                                    <p className="text-sm font-bold mb-2">Señales disponibles</p>
                                    <p className="text-xs italic mb-2"><strong>Vender</strong> si precio baja de cierto nivel</p>
                                    <p className="text-xs italic"><strong>Mantener</strong> precio de entrada </p>
                                </div>
                                <div className="">
                                    <p className="text-sm font-bold mb-2">Precio de entrada</p>
                                    <p className="text-xs">Nivel de precio en el que el modelo va a elegir tener valores de la emisora</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-50 pl-12">
                            <div className="mb-4">
                                <p className="inline px-4 py-1 rounded text-sm font-bold" style={{color:"#D70000",background:"rgba(215, 0, 0, 0.2)"}} >Fuera</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-xs">El modelo actualmente NO tiene posisción en esta emisora</p>
                            </div>
                            <div className="flex mb-8">
                                <div className="mr-16">
                                    <p className="text-sm text-red-600 font-bold mb-2 flex items-center">
                                        <GiMexico className="mr-2" style={{width:"22px", height:"22px"}} />
                                        México
                                    </p>
                                    <p className="text-sm font-bold">{dataModel && dataModel.fuera} emisoras</p>
                                    <p><span className="text-xs">de</span> <span className="text-sm font-bold">{dataModel && dataModel.total_emisoras}</span></p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold mb-2 flex items-center" style={{color:"#172A56"}}>
                                        <BiWorld className="mr-2" style={{width:"24px", height:"24px"}} />
                                        SIC
                                    </p>
                                    <p className="text-sm font-bold">{dataModelSic && dataModelSic.fuera} emisoras</p>
                                    <p><span className="text-xs">de</span> <span className="text-sm font-bold">{dataModelSic && dataModelSic.total_emisoras}</span></p>
                                </div>
                                
                            </div>
                            <div>
                                <div className="mb-4">
                                    <p className="text-sm font-bold mb-2">Señales disponibles</p>
                                    <p className="text-xs italic mb-2"><strong>Comprar</strong> si precio sube de cierto nivel</p>
                                    <p className="text-xs italic"><strong>Esperar</strong> precio de activación</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm font-bold mb-2">Precio de activación</p>
                                    <p className="text-xs">Nivel de precio en el que el modelo va a elegir tener valores de la emisora</p>
                                </div>
                                <div className="">
                                    <p className="text-sm font-bold mb-2">STOP LOSS</p>
                                    <p className="text-xs">Nivel del precio en el que el modelo va a elegir vender valores de la emisora</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="subtile pb-2 mb-4 mt-12 border-b-2 border-gray-300 pb-4 flex justify-between">
                    <p className="text-xl font-medium">Guía</p>
                    <MdExpandMore  className="icon my-0" />
                </div>

                <div className="w-full flex mb-4">

                    <div className="card-guia bg-white rounded-md shadow-md mr-4">
                        <div className="card-guia-wrap p-6 flex flex-col justify-between">
                            <div>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-2">
                                            <div className="flex items-start">
                                                <img className="mt-1" src="1.png" alt="" style={{width:"10px"}} />
                                                <img className="mt-1" src="1.png" alt="" style={{width:"10px"}} />
                                                <img className="mt-1" src="1.png" alt="" style={{width:"10px"}} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xxs text-gray-400">Alcista</p>
                                            <p className="text-xs font-bold">0.04%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400">
                                        Muy Alcista: La dirección de la tendencia es totalmente alcista.
                                    </p>
                                    <p className="text-xxs text-gray-400">
                                        Alcista: La dirección de la tendencia a mediano plazo es claramente alcista.
                                    </p>
                                    <p className="text-xxs text-gray-400">
                                        Neutra: La dirección de la tendencia no está definida y no es clara.
                                    </p>
                                    <p className="text-xxs text-gray-400">
                                        Bajista: En este caso la tendencia es bajista.
                                    </p>
                                    <p className="text-xxs text-gray-400">
                                        Muy Bajista: La dirección de la tendencia es totalmente bajista.
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="card-guia bg-white rounded-md shadow-md mr-4">
                        <div className="card-guia-wrap p-4 flex flex-col justify-between">
                            <div className={openTab == "u1" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Up1.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400">Fase inicial del ciclo alcista. Se considera que estamos en una “fase xpansiva del precio “ y no ha hecho más ue comenzar. </p>
                                    
                                    <p className="text-xxs text-gray-400">Se espera que su comportamiento sea alcista a mediano plazo.</p>
                                    <p className="text-xxs text-gray-400">Debemos estar atentos a la recomendación de compra , ya que puede marcarnos una buena oportunidad.</p>
                                </div>
                            </div>
                            <div className={openTab == "u2" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Up2.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400">Fase inicial del ciclo alcista. Si bien el valor es alcista , se comienza a observar una disminución en la fortaleza de ese avance. Nos encontramos en un momento de desaceleración del ciclo alcista.</p>
                                    <p className="text-xxs text-gray-400">Debemos evitar comprasa que o normal es tener en ese momento beneficios acumulados. Estar atentos a la aparición  recomendaciones del tipo venta.</p>
                                </div>
                            </div>
                            <div className={openTab == "d1" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Down1.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400">Fase inicial del ciclo bajista. El valor viene de una fase alcista y recientemente se ha dado la vuelta. Significa que la fase bajista acaba de comenzar.</p>
                                    <p className="text-xxs text-gray-400">Se trata de valores ntereseantes para vender y recoger beneficios o iniciar posiciones cortas</p>
                                </div>
                            </div>
                            <div className={openTab == "d2" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Down2.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400">Fase final del ciclo bajista. No encontramos en un estado avanzado del ciclo bajista.</p>
                                    <p className="text-xxs text-gray-400">Por lo general no es aconsejable vender en este momento. Es posible que el precio se dé a vuelta y comience una senda alcista.</p>
                                </div>
                            </div>
                            <div className="card-guia-foot flex justify-evenly items-center">
                                <div className="flex">
                                    <p className={openTab == "u1" ? "active":""} onClick={()=> sendOpenTab("u1")}>U1</p>
                                    <p className={openTab == "u2" ? "active":""} onClick={()=> sendOpenTab("u2")}>U2</p>
                                </div>
                                <div className="flex">
                                    <p className={openTab == "d1" ? "active":""} onClick={()=> sendOpenTab("d1")}>D1</p>
                                    <p className={openTab == "d2" ? "active":""} onClick={()=> sendOpenTab("d2")}>D2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-guia bg-white rounded-md shadow-md mr-4">
                        <div className="card-guia-wrap p-6 flex flex-col justify-between">

                            <div className={openTab2 == "d2-u1" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Down2Up1.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs font-bold">Down 2-Up 1</p>
                                    <p className="text-xxs text-gray-400">Cambio de final de un ciclo descendente (semana anterior a inicio de un ciclo ascendente (semana actual).</p>
                                    <p className="text-xxs font-bold">RECOMENDACIÓN DE COMPRA</p>
                                </div>
                            </div>
                            <div className={openTab2 == "u1-u2" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Up1Up2.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs font-bold">Up1-Up2</p>
                                    <p className="text-xxs text-gray-400">Cambio de inicio de un ciclo ascendente (semana anterior) a final de un ciclo ascendente (semana actual).</p>
                                    <p className="text-xxs font-bold">RECOMENDACIÓN DE MANTENER</p>
                                    <p className="text-xxs text-gray-400">(mantenerse dentro del valor).</p>

                                </div>
                            </div>
                            <div className={openTab2 == "u2-d1" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Up2Down1.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs font-bold">Down 2-Up 1</p>
                                    <p className="text-xxs text-gray-400">Cambio de final de un ciclo descendente (semana anterior a inicio de un ciclo ascendente (semana actual).</p>
                                    <p className="text-xxs font-bold">RECOMENDACIÓN DE COMPRA</p>

                                </div>
                            </div>

                        
                            <div className={openTab2 == "d1-d2" ? "":"hidden"}>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <img className="" src="/Down1Down2.jpg" alt="" style={{width:"42px"}} />
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs font-bold">Up1-Up2</p>
                                    <p className="text-xxs text-gray-400">Cambio de inicio de un ciclo ascendente (semana anterior) a final de un ciclo ascendente (semana actual).</p>
                                    <p className="text-xxs font-bold">RECOMENDACIÓN DE MANTENER</p>
                                    <p className="text-xxs text-gray-400">(mantenerse dentro del valor).</p>
                                </div>
                            </div>

                            <div className="card-guia-foot flex justify-evenly items-center">
                                <div className="flex">
                                    <p className={openTab2 == "d2-u1" ? "active":""} onClick={()=> sendOpenTab2("d2-u1")}>D2-U1</p>
                                    <p className={openTab2 == "u1-u2" ? "active":""} onClick={()=> sendOpenTab2("u1-u2")}>U1-U2</p>
                                </div>
                                <div className="flex">
                                    <p className={openTab2 == "u2-d1" ? "active":""} onClick={()=> sendOpenTab2("u2-d1")}>D2-U1</p>
                                    <p className={openTab2 == "d1-d2" ? "active":""} onClick={()=> sendOpenTab2("d1-d2")}>U1-U2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-guia bg-white rounded-md shadow-md mr-4">
                        <div className="card-guia-wrap p-6 flex flex-col justify-between">
                            <div>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        <div className="relative">
                                            <img className="mb-1" src="/score-10.png" alt="" style={{width:"52px"}} />
                                            <p className="text-xxs text-score">9.81</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400 mb-1">El Score es una potente medida para encontrar oportunidades en el mercado. EL score esta basado en conocidos indicadores técnicos y de rendimiento/riesgo.</p>
                                    <ul className="text-xxs list-inside	list-disc text-gray-400">
                                        <li>El Score oscila entre <strong className="text-black">0 a 10 puntos.</strong></li>
                                        <li>Los Scores se <strong className="text-black">actualizan cada semana.</strong></li>
                                        <li>Los Scores permiten hacer <strong className="text-black">ranking de las oportunidades.</strong></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-guia-foot flex justify-evenly">
                            </div>
                        </div>
                    </div>

                    <div className="card-guia bg-white rounded-md shadow-md mr-4">
                        <div className="card-guia-wrap p-6 flex flex-col justify-between">
                            <div>
                                <div className="card-guia-grafic flex justify-center mb-2">
                                    <div className="flex items-start p-2">
                                        {/* <img className="" src="/score-10.png" alt="" style={{width:"42px"}} /> */}
                                        <div className="relative">
                                            <img className="mb-1" src="/TRALG07.png" alt="" style={{width:"52px"}} />
                                            <p className="text-xxs text-score">7</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-guia-content">
                                    <p className="text-xxs text-gray-400 mb-1">El grado de liquidez es muy importante porque determina si un active puede convertirse rápidamente en dinero en efectivo.</p>

                                    <p className="text-xxs text-gray-400">El grado de Liquidez es un promedio del volumen negociado de una acción en un periodo de tiempo de medio plazo. <strong className="text-black">Oscila entre 0 a 10. Cuanto mayor es el Grado de Liquidez, mas alto su valor.</strong></p>
                                    
                                </div>
                            </div>
                            <div className="card-guia-foot flex justify-evenly">
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-full flex justify-end mb-20">
                    <a href="#" className="flex text-xs text-red-600 font-bold">
                        <MdFileDownload className="icon my-0" style={{height:"auto", width:"14px"}} /> Descargar guía
                    </a>
                </div>

                <div className="subtile pb-2 mb-4 border-b-2 border-gray-300 pb-4 flex justify-between">
                    <p className="text-xl font-medium">Seguimiento de activos</p>
                    {/* <BsArrowsAngleExpand  className="icon my-0" style={{height:"18px", color:"#FF5000"}} /> */}
                </div>

                <div className="search-emisora text-right">
                    <input type="text" placeholder="Buscar emisora" className="font-sans text-sm py-1 pl-8 pr-4 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"  />
                </div>

                <div className="head-table-activos flex w-full justify-between items-end my-4">
                    {/* <div className="flex items-center mb-1">
                        <div className="text-red-600">
                            <MdFiberManualRecord  className="icon my-0" style={{width:"14px", height:"14px"}} />
                        </div>
                        <p className="ml-2 text-sm font-medium text-red-600">Mis posiciones</p>
                    </div> */}
                    <div className="flex">
                        <div className="mr-8">
                            <p className="text-sm mb-2">Mercado</p>
                            <select name="" id="" onChange={getMercado} className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="1319991">Acciones de la BMV</option>
                                <option value="1319992">Acciones del SIC</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Mis Listas</p>
                            <select name="" id="" className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="">Selecciona</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* <div>
                        <p className="text-sm mb-2">Bolsa</p>
                        <select name="" id="" className="font-sans text-sm py-1 px-2 w-24 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                            <option value="">BMV</option>
                        </select>
                    </div> */}
                    <div className="flex">
                        <div className="mr-8">
                            <p className="text-sm mb-2">Recomendación</p>
                            <select name="" id="" className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="">Selecciona</option>
                                <option value="">Largo</option>
                                <option value="">Fuera</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Mostrar</p>
                            <select name="" id="" className="font-sans text-sm py-1 px-2 w-24 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="">Todas</option>
                                <option value="">10</option>
                            </select>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full bg-white">
                    <div className="head-table-activos flex justify-between items-center pt-4 pb-2 border-b-2 border-gray-300 ">
                        <div className="w-1/12">

                        </div>
                        <div className="w-1/12">
                            <p className="text-xs font-bold">Emisora</p>
                        </div>
                        <div className="flex items-center w-1/12">
                            <p className="text-xs font-bold">Posición</p>
                            <div>
                                <MdUnfoldMore  className="icon my-0" style={{height:"auto", width:"18px"}} />
                            </div>
                        </div>
                        <div className="flex items-center w-1/12">
                            <p className="text-xs font-bold">Señal del modelo</p>
                            <div>
                                <MdUnfoldMore  className="icon my-0" style={{height:"auto", width:"18px"}} />
                            </div>
                        </div>
                        <div className="w-1/12"><p className="text-xs font-bold">Último precio</p></div>
                        <div className="flex justify-center items-center w-1/12">
                            <p className="text-xs font-bold">Tendencia</p>
                            <div>
                                <MdUnfoldMore  className="icon my-0" style={{height:"auto", width:"18px"}} />
                            </div>
                        </div>
                        <div className="w-1/12"><p className="text-xs font-bold">Fase de ciclo</p></div>
                        <div className="flex justify-center items-center w-1/12">
                            <p className="text-xs font-bold">Score</p>
                            <div>
                                <MdUnfoldMore  className="icon my-0" style={{height:"auto", width:"18px"}} />
                            </div>
                        </div>
                        {/* <div className="w-1/12"><p className="text-xs font-bold">Liquidez</p></div> */}
                        <div className="w-1/12"><p className="text-xs font-bold">T- Report</p></div>
                    </div>

                    {dataTable.map(( node ) => {
                        const { isin, stockname,emisora, posicion, senal, ultimo_precio,score,fase,fortaleza_tendencia,tendencia,tendencia1, tendencia2, tendencia3, rentabilidad_1,rentabilidad_3, rentabilidad_5,media_rentabilidad,media_volatilidad,ratio,moving_average,macd_crossver,linear_regresion,rsi_reversal,channel_breakout,stochastic_crossover,bollinger_bands,ranking} = node

                        let score_img = Math.round(score).toString()
                        let color_pos = posicion == "LARGO" ? "#04B700" : "rgba(215, 0, 0, 0.3)";
                        let color_sa = moving_average == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)";

                        let ft = fortaleza_tendencia
                        let score_text = score
                        let ultimo_precio_text =  ultimo_precio
                        let rank = parseInt(ranking)


                        // const product_code = isin.replace("*","")
                        let t_report = "https://vector.techrules.com/SOA20/TReport/Index?BusinessArea=VECTOR&Language=es-ES&ProductCode="+isin+"&UserId=266563"


                        if( node !== null ) {
                            return (

                                <div key={emisora}>
                                    
                                    <div className="row-table-activos flex justify-between items-center border-b-2 border-gray-300">
                                        <div className="flex items-center w-1/12 justify-between px-3">
                                            <Input type="checkbox" className="mt-0 border-2 focus:border-red-600 ring-0 shadow-none checked:bg-red-600"/>
                                            {/* <a href="#" className="font-bold ml-2 underline" style={{fontSize:"9px", color:"#FF5000"}}>Comparar</a> */}
                                        </div>
                                        <div className="flex justify-between items-center w-1/12">
                                            <p className="text-xs font-bold">{emisora}</p>
                                            <div onClick={() => toggleMore(isin)}>
                                                {shownMore[isin] ?
                                                    <MdExpandMore className="icon cursor-pointer text-red-600" style={{height:"auto", width:"24px"}}  />
                                                    : <MdExpandLess className="icon cursor-pointer" style={{height:"auto", width:"24px"}}  />
                                                }
                                            </div>
                                        </div>
                                        <div className="text-xs w-1/12 capitalize" style={{ color:color_pos}}>{posicion}</div>
                                        <div className="text-xs w-1/12">{senal}</div>
                                        <div className="text-right text-xs w-1/12 pr-5">{ultimo_precio_text}</div>
                                        <div className="flex justify-evenly w-1/12">
                                            <div className="flex items-start">
                                                <img className="mt-1" src={tendencia1+".png"} alt="" style={{width:"10px"}} />
                                                <img className="mt-1" src={tendencia2+".png"} alt="" style={{width:"10px"}} />
                                                <img className="mt-1" src={tendencia3+".png"} alt="" style={{width:"10px"}} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs" style={{fontSize:"9px", color:"#888682"}}>{tendencia}</p>
                                                <p className="text-xs">{ft}</p>
                                            </div>
                                        </div>

                                        <div className="w-1/12">
                                            <img className="mt-1" src={fase+".jpg"} alt="" style={{width:"42px"}} />
                                        </div>
                                        <div className="w-1/12 flex justify-center">
                                            <div className="relative">
                                                <img className="mt-1" src={"/score-"+score_img+".png"} alt="" style={{width:"42px"}} />
                                                <p className="text-center text-xxs text-score">{ score_text }</p>
                                            </div>
                                        </div>
                                        {/* <div className="w-1/12">
                                            <img className="mt-1" src="/nivel.png" alt="" style={{width:"42px"}} />
                                        </div> */}
                                        <div className="w-1/12">
                                            <a href={t_report} target="_blank" className="text-xs font-bold" style={{color:"#172A56"}}>Ver</a>
                                        </div>

                                    </div>
                                    {shownMore[isin] ?
                                        <div className="py-4 border-l-2 border-red-600">
                                            <div className="border-b-2 border-gray-300 pb-4 px-4">
                                                <div className="flex justify-between w-100">
                                                    <div className="w-1/12"></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>1 año</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>3 años</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>5 años</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Media Rentabilidad</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Media volatilidad</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Radio</p></div>
                                                </div>
                                                <div className="flex justify-between w-100">
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Rentabilidad</p></div>
                                                    <div className="text-center w-1/12 text-xs"><p>{rentabilidad_1}</p></div>
                                                    <div className="text-center w-1/12 text-xs"><p>{rentabilidad_3}</p></div>
                                                    <div className="text-center w-1/12 text-xs"><p>{rentabilidad_5}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-red-600"><p>{media_rentabilidad}</p></div>
                                                    <div className="text-center w-1/12 text-xs"><p>{media_volatilidad}</p></div>
                                                    <div className="text-center w-1/12 text-xs"><p>{ratio}</p></div>
                                                </div>
                                            </div>
                                            <div className="my-4 px-4">
                                                <div className="flex justify-between w-100 mb-2">
                                                    <div className="w-1/12"></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>1</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>2</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>3</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>4</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>5</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>6</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>7</p></div>
                                                    <div className="w-1/12"></div>
                                                </div>
                                                <div className="flex justify-between w-100 items-center mb-2">
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Modelos Técnicos</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Moving<br></br>Average</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>MACD<br></br>Crossover</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Lineal regression<br></br>midpoint</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>RSI<br></br>Reversal</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Channel<br></br>Breakout</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Stochastic<br></br>Crossover</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Bollinger Bands<br></br>Breakout</p></div>
                                                    <div className="text-center w-1/12 text-xxs text-red-600"><p>Ranking</p></div>
                                                </div>
                                                <div className="flex justify-between w-100 items-center">
                                                    <div className="text-center w-1/12 text-xxs text-gray-400"><p>Semana Actual</p></div>
                                                    <div className="text-center w-1/12 text-xs" style={{color:color_sa}}><p>{moving_average}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:macd_crossver == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{macd_crossver}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:linear_regresion == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{linear_regresion}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:rsi_reversal == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{rsi_reversal}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:channel_breakout == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{channel_breakout}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:stochastic_crossover == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{stochastic_crossover}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-gray-400" style={{color:bollinger_bands == "Largo" ? "#04B700" : "rgba(215, 0, 0, 0.3)"}}><p>{bollinger_bands}</p></div>
                                                    <div className="text-center w-1/12 text-xs text-red-600">
                                                        <Rating image="/star.png" fillBG="#172A56" editable={false} initialBG="#ccc" numberStars={7} initialValue={rank} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ""
                                    }
                                </div>
                            )
                        } else { return false }
                    
                    })}

                    
                                            

                </div>

                <div className="w-full flex justify-end mb-20 mt-4">
                    <a href="" className="flex text-xs text-red-600 font-bold">
                        <MdFileDownload className="icon my-0" style={{height:"auto", width:"14px"}} /> Descargar tabla</a>
                </div>

            </div>
        </>
    );

    let classesContentDerecha = "w-6/24 mt-40 py-10 px-2";
    let childrenContentDerecha = (
        <>
            <div className="mb-10">
                {/* <Operations issuer={"AMXL.MX"} /> */}
            </div>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">México Top picks semanal</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="head-card flex items-end justify-between mb-3">
                        <div className="w-4/12">
                            <p className="text-xs text-gray-400">Emisora</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Score</p>
                        </div>
                    </div>

                    {dataMex.map(( node ) => {
                        const { isin, stockname, score, order} = node
                        let score_img = Math.round(score).toString()
                        let score_text = score

                        if( node !== null ) {
                            return (
                                
                                <div className="row-card flex justify-between items-center mb-3">
                                    <div className="w-4/12">
                                        <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs font-bold px-2">{order}</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <div className="relative">
                                            <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                            <p className="text-xxs text-score">{ score_text }</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else { return false }
                    
                    })}
                    

                </div>
            </div>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">SIC Top picks semanal</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="head-card flex items-end justify-between mb-3">
                        <div className="w-4/12">
                            <p className="text-xs text-gray-400">Emisora</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Score</p>
                        </div>
                    </div>

                    {dataSic.map(( node ) => {
                        const { isin, stockname, score, order} = node
                        let score_img = Math.round(score).toString()
                        let score_text = score

                        if( node !== null ) {
                            return (
                                
                                <div className="row-card flex justify-between items-center mb-3">
                                    <div className="w-4/12">
                                        <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs font-bold px-2">{order}</p>
                                    </div>
                                    <div className="flex justify-center flex-wrap w-4/12">
                                        <div className="relative">
                                            <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                            <p className="text-xxs text-score">{ score_text }</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else { return false }
                    
                    })}

                    

                </div>
            </div>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">ETF Top picks semanal</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="head-card flex items-end justify-between mb-3">
                        <div className="w-4/12">
                            <p className="text-xs text-gray-400">Emisora</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                        </div>
                        <div className="flex justify-center w-4/12">
                            <p className="text-center text-xs text-gray-400">Score</p>
                        </div>
                    </div>

                    {dataEtf.map(( node ) => {
                        const { isin, stockname, score, order} = node
                        let score_img = Math.round(score).toString()
                        let score_text = score

                        if( node !== null ) {
                            return (
                                
                                <div className="row-card flex justify-between items-center mb-3">
                                    <div className="w-4/12">
                                        <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs font-bold px-2">{order}</p>
                                    </div>
                                    <div className="flex justify-center flex-wrap w-4/12">
                                        <div className="relative">
                                            <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                            <p className="text-xxs text-score">{ score_text }</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else { return false }
                    
                    })}

                </div>
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
            classesContentPrincipal={classesContentPrincipal}

            childrenContentDerecha={childrenContentDerecha}
            classesContentDerecha={classesContentDerecha}
            scrollEnContentDerecha={true}
            titulo="Tech Rules"
        />
    );

    return(
        <div className="bg-gray-100">
            <Appbar appBarData={appBarMockData}/>

            <div className="flex-auto">
                <div className="flex flex-row">
                    <div className="h-full w-1/24">
                        <Sidebar />
                    </div>
                   
                    <div className="flex w-17/24 flex-wrap my-10 pl-10">
                        

                      
                    </div>
                
                    <div className="w-6/24 mt-40 py-10 px-2 overflow-y-auto h-screen sticky top-0">
                        <div className="mb-10">
                            {/* <Operations issuer={"AMXL.MX"} /> */}
                        </div>
                        <div className="mb-10">
                            <div className="mb-3">
                                <p className="font-bold text-xl">México Top picks semanal</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="head-card flex items-end justify-between mb-3">
                                    <div className="w-4/12">
                                        <p className="text-xs text-gray-400">Emisora</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Score</p>
                                    </div>
                                </div>

                                {dataMex.map(( node ) => {
                                    const { isin, stockname, score, order} = node
                                    let score_img = Math.round(score).toString()
                                    let score_text = score

                                    if( node !== null ) {
                                        return (
                                            
                                            <div className="row-card flex justify-between items-center mb-3">
                                                <div className="w-4/12">
                                                    <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                                </div>
                                                <div className="flex justify-center w-4/12">
                                                    <p className="text-center text-xs font-bold px-2">{order}</p>
                                                </div>
                                                <div className="flex justify-center w-4/12">
                                                    <div className="relative">
                                                        <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                                        <p className="text-xxs text-score">{ score_text }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else { return false }
                                
                                })}
                                

                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="mb-3">
                                <p className="font-bold text-xl">SIC Top picks semanal</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="head-card flex items-end justify-between mb-3">
                                    <div className="w-4/12">
                                        <p className="text-xs text-gray-400">Emisora</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Score</p>
                                    </div>
                                </div>

                                {dataSic.map(( node ) => {
                                    const { isin, stockname, score, order} = node
                                    let score_img = Math.round(score).toString()
                                    let score_text = score

                                    if( node !== null ) {
                                        return (
                                            
                                            <div className="row-card flex justify-between items-center mb-3">
                                                <div className="w-4/12">
                                                    <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                                </div>
                                                <div className="flex justify-center w-4/12">
                                                    <p className="text-center text-xs font-bold px-2">{order}</p>
                                                </div>
                                                <div className="flex justify-center flex-wrap w-4/12">
                                                    <div className="relative">
                                                        <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                                        <p className="text-xxs text-score">{ score_text }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else { return false }
                                
                                })}

                                

                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="mb-3">
                                <p className="font-bold text-xl">ETF Top picks semanal</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="head-card flex items-end justify-between mb-3">
                                    <div className="w-4/12">
                                        <p className="text-xs text-gray-400">Emisora</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Comprar si<br></br>sube de</p>
                                    </div>
                                    <div className="flex justify-center w-4/12">
                                        <p className="text-center text-xs text-gray-400">Score</p>
                                    </div>
                                </div>

                                {dataEtf.map(( node ) => {
                                    const { isin, stockname, score, order} = node
                                    let score_img = Math.round(score).toString()
                                    let score_text = score

                                    if( node !== null ) {
                                        return (
                                            
                                            <div className="row-card flex justify-between items-center mb-3">
                                                <div className="w-4/12">
                                                    <p className="text-sm font-bold">{isin}<br></br><span className="text-gray-400" style={{fontSize:"9px"}}>{stockname}</span></p>
                                                </div>
                                                <div className="flex justify-center w-4/12">
                                                    <p className="text-center text-xs font-bold px-2">{order}</p>
                                                </div>
                                                <div className="flex justify-center flex-wrap w-4/12">
                                                    <div className="relative">
                                                        <img className="mb-1" src={"/score-" + score_img +".png"} alt="" style={{width:"52px"}} />
                                                        <p className="text-xxs text-score">{ score_text }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else { return false }
                                
                                })}

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}


export default TechRules