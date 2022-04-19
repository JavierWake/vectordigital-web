import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

//import getRefinitivToken from '../utils/getRefinitivToken';
import * as apiCall from '../constants';

interface propsFromState {
    tipoGrafica?: "SIMPLE" | "COMPLEJA";
    //refinitivToken?: string;
    ricEmisora: string;
    tipoActualizacionInfo?: "REALTIME" | "DELAY";
}

type AllProps = propsFromState; 

const RefinitivGraph: React.FC<AllProps> = ({ ricEmisora, tipoGrafica = "SIMPLE", tipoActualizacionInfo = "REALTIME" }) =>{
    /*console.log("ricEmisora refGraph");
    console.log(ricEmisora);*/

    //HOOKS
    const [urlRefinitiv, setUrlRefinitiv] = useState("");
    const [refToken, setRefToken] = useState("");

    //const [promiseSsoToken, setPromiseSsoToken] = useState<Promise<string>>(getRefinitivToken());
    //const [ssoToken, setSsoToken] = useState<string>("");
    // console.log('ric emisora');
    // console.log(ricEmisora);

    const sendUrlRefinitiv = (data: string) => {
        if(urlRefinitiv === data){
            return;
        }
        setUrlRefinitiv(data);
    };

    /*useEffect(() => {
        //cuando cambia promiseSsoToken, quiere decir que se 
        //hizo una llamada a getRefinitivToken()

        //sacamos el token del promiseSsoToken asi:
        promiseSsoToken.then((tk: string) => setSsoToken(tk));
        
    }, [promiseSsoToken]);*/

    useEffect(() => {
        //hacerUrlParaLaGrafica();
        //sacar token de refinitiv
        axios.get(apiCall.NEWS_API + "token", { headers: { 'x-api-key': apiCall.X_API_KEY_NEWS } }).
            then(respuesta => {
                setRefToken(respuesta.data.token);
            }).
            catch(e => {
                console.log("ERROR API:");
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if(ricEmisora === ""){
            //el ric esta vacio por alguna razon, no hacemos el nuevo url
            return;
        }
        /*let message = tipoGrafica !== undefined ? tipoGrafica.toString() : "SIMPLE"; //cuando es COMPLEJA (grafico avanzado) regresa este error: Request failed with status code 404
        
        let tipoActualParam = tipoActualizacionInfo !== undefined ? 
            tipoActualizacionInfo === "REALTIME" ? 
                "RT" : "DELAY" 
            : "RT"; 
        
        let params = ["auth"/ *ssoToken* /, ricEmisora, tipoActualParam];
        let a = { message, params }
        // console.log('ref graf a');
        // console.log(a);
        dispatch(getRefinitivGraficaRequest(a)); */
        
        hacerUrlParaLaGrafica();

    }, [ricEmisora, tipoGrafica, tipoActualizacionInfo, refToken/*, ssoToken*/]);

    const hacerUrlParaLaGrafica = () => {
        if(ricEmisora === ""){
            sendUrlRefinitiv("");
            return;
        }

        if(refToken === ""){
            sendUrlRefinitiv("");
            return;
        }

        const primeraParteDelUrl = apiCall.REFINITIV_GRAFICA_COMPLEJA; // es el secret que termina en .com/
        //const primeraParteDelUrl = "https://...eul.cloudfront.net/"

        const typeChart = tipoGrafica !== undefined ? 
            tipoGrafica === "SIMPLE" ? 
                "simple-chart" : "advanced-chart" 
            : "simple-chart";
        
        const authToken = refToken; // aqui va el promiseSsoToken, cuando integre esa lógica
        
        const tipoActualParam = tipoActualizacionInfo !== undefined ? 
            tipoActualizacionInfo === "REALTIME" ? 
                "RT" : "DELAY" 
            : "RT"; 
        const url: string = `${primeraParteDelUrl}${typeChart}/${authToken}/${ricEmisora}/${tipoActualParam}`;
        /*console.log("url refinitiv grafica component");
        console.log(url);
        console.log(tipoActualizacionInfo);*/
        sendUrlRefinitiv(url);
    };

    /*useEffect(() => {
        if(refinitivGrafica !== undefined){
            if(refinitivGrafica.message.length > 0 && refinitivGrafica.loading === false){

            }
        }
    }, [refinitivGrafica?.loading, refinitivGrafica?.message]);*/

    console.log('info grafica refinitiv');
    console.log(urlRefinitiv);

    //console.log("token refinitv en refinitivGraph");
    //console.log(ssoToken);

    return(
        <div className="w-full flex flex-col">
            {
                //refinitivGrafica && refinitivGrafica.refinitivGrafica && <iframe srcDoc={refinitivGrafica.refinitivGrafica} height={500} />
                (urlRefinitiv === "" || ricEmisora === "") ?
                    <div className="flex flex-col justify-content center w-full">
                        {/*<p className="text-center text-sm text-gray-800">Selecciona una emisora</p>*/}
                        <Loading />
                    </div>
                : 
                    <iframe src={urlRefinitiv} height={500} />
            }
        </div>
    );
}

export default RefinitivGraph;