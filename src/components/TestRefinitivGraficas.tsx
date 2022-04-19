import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RefinitivGraph from '../containers/RefinitivGraph';
import * as apiCall from '../constants';

const TestRefinitivGraficas: React.FC = () => {

    const urlPruebas = "https://d2qtarn0vt9297.cloudfront.net/simple-chart/";
    //console.log("entro a test ref graf");
    //HOOKS
    const [refToken, setRefToken] = useState("");
    const [respApi, setRespApi] = useState("");
    const [errorApi, setErrorApi] = useState("");
    const [urlSrcMinigrafico, setUrlSrcMinigrafico] = useState("");

    useEffect(() => {

        //sacar token de refinitiv
        axios.get(apiCall.NEWS_API+"token", { headers: { 'x-api-key': apiCall.X_API_KEY_NEWS } }).
            then(respuesta => {
                setRefToken(respuesta.data.token);
            }).
            catch(e => {
                console.log("ERROR API:");
                console.log(e);

                setErrorApi(e.toString());
            });
    }, []);

    useEffect(() => {
        if(refToken !== undefined){
            if(refToken !== ""){

                //para el minigrafico
                const primeraParteDelUrl = apiCall.REFINITIV_GRAFICA_COMPLEJA; //"https://...eul.cloudfront.net/" //ESTE es el url que funciona

                const typeChart = "mini-chart";
                
                const authToken = refToken; // aqui va el promiseSsoToken, cuando integre esa lógica
                
                const tipoActualParam = "RT"; 
                const ricEmisora = "BIMBOA.MX";
                const urlMG: string = `${primeraParteDelUrl}${typeChart}/${ricEmisora}/${tipoActualParam}`;
                //const urlMG: string = `${primeraParteDelUrl}${typeChart}/${authToken}/${ricEmisora}/${tipoActualParam}`;
                console.log("url prueba minig");
                console.log(urlMG);
                setUrlSrcMinigrafico(urlMG);

                //PARA EL AXIOS......

                //1. url del api preparado
                const urlLlamada = urlPruebas + "AMXL.MX";

                //2. hacer el config
                let config = {
                    headers: {
                        'Content-type': "application/x-www-form-urlencoded; charset=UTF-8",
                        //'Content-type': "application/json",
                        'Authorization': "SSO TOKEN",
                        'Symbol': "BIMBOA.MX", //ric
                        'UserType': "RT", //ej. RT
                        'X-Frame-Options': "SAMEORIGIN",
                    },
                };

                console.log("grafica con axios");
                console.log(urlLlamada);
                console.log(config);

                //2 llamar usando axios
                axios.get<any>(urlLlamada, config)
                .then(respuesta => {
                    console.log("resp dev");
                    console.log(respuesta);
                    setRespApi(respuesta.data.replace('<head>', `<head><base href="${urlLlamada}" />`))
                })
                .catch(e => {
                    console.log("ERROR API:");
                    console.log(e);

                    setErrorApi(e.toString());
                });

            }
        }
    }, [refToken])

    return (
        refToken !== undefined && refToken !== "" ?
            <div className="w-auto h-auto">
                <div className="w-full pt-5">
                    <h1 className="py-2">Mini gráfico</h1>
                    <iframe src={urlSrcMinigrafico} height={100} width={150} />
                </div>
                <div className="w-full pt-5">
                    <h1 className="py-2">RefinitivGraphComponent simple RT</h1>
                    <RefinitivGraph ricEmisora="AMXL.MX" /*refinitivToken={refToken}*/ />
                </div>
                <div className="w-full pt-5">
                    <h1 className="py-2">RefinitivGraphComponent simple DELAY</h1>
                    <RefinitivGraph ricEmisora="AMXL.MX" tipoActualizacionInfo="DELAY" /*refinitivToken={refToken}*/ />
                </div>
                <div className="w-full pt-5">
                    <h1 className="py-2">RefinitivGraphComponent advanced RT</h1>
                    <RefinitivGraph ricEmisora="AMXL.MX" tipoGrafica="COMPLEJA" /*refinitivToken={refToken}*/ />
                </div>
                <div className="w-full pt-5">
                    <h1 className="py-2">RefinitivGraphComponent advanced DELAY</h1>
                    <RefinitivGraph ricEmisora="AMXL.MX" tipoGrafica="COMPLEJA" tipoActualizacionInfo="DELAY" /*refinitivToken={refToken}*/ />
                </div>
                <div>
                    <hr className="solid bg-gray-500 my-3"/>
                    <h1 className="py-3">Gráfica Refinitiv con url de pruebas </h1>
                    <div className="w-full flex flex-col">
                        {
                            respApi.includes("<head>") && <iframe srcDoc={respApi} height={500} />
                        }
                        {
                            !respApi.includes("<head>") && <p className="py-2">{respApi}</p>
                        }
                        {
                            errorApi.length > 0 && <p className="text-red-500 font-bold">{errorApi}</p>
                        }
                    </div>
                </div>
            </div>
        :
            <p>Error: {errorApi}</p>
    );

}



export default TestRefinitivGraficas;