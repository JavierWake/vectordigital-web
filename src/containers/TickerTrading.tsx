import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Emisora } from '../types/GetCatalogoListaEmisorasType';
// BORRAR ESTE PAQUETE DEL PACKAGE.JSON import Ticker from 'react-ticker'; //si no lo vamos a usar, borrarlo del package.json
// BORRAR ESTE PAQUETE DEL PACKAGE.JSON import Ticker from 'nice-react-ticker';//npmjs.com/package/nice-react-ticker
import TickerBox, { ElementoConMiniGrafico, EmisoraConMover } from './TickerBox';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdPause } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";
import * as apiCall from '../constants';
import RefinitivMiniGraph from './RefinitivMiniGraph';

import '../styles/tickerStyles.css';
import { IMoversData } from '../types/MoversType';
import { IndicesArray } from '../types/CommoditiesType';

/*const TickerBox = (emisoraMG: EmisoraConMiniGrafico) => (
    <div key={emisoraMG.emisora.RIC} className="m-1 p-2 flex flex-row border-r-2 border-gray-300">
        <div className="datos mx-2">
            <div className="nombreEmisora py-1">
                <h1 className="text-red-600 font-bold">
                    {emisoraMG.emisora.Emisora + "." + emisoraMG.emisora.Serie}
                </h1>
            </div>
            <div className="valorNegro">

            </div>
            <div className="valoresVerdes">

            </div>
        </div>
        <div className="miniGraf mx-2">

        </div>
    </div>
);
 */

function crearUrlMiniGraficoParaIFrame (ric: string, tipoActualizacionInfo = "REALTIME", tokenRef: string){
    const primeraParteDelUrl = apiCall.REFINITIV_GRAFICA_COMPLEJA; // es el secret que termina en .com/
        
    const typeChart = "mini-chart";
    
    const authToken = tokenRef; // aqui va el promiseSsoToken, cuando integre esa lógica
    
    const tipoActualParam = tipoActualizacionInfo !== undefined ? 
        tipoActualizacionInfo === "REALTIME" ? 
            "RT" : "DELAY" 
        : "RT"; 
    //const url: string = `${primeraParteDelUrl}${typeChart}/${encodeURIComponent(ric)}/${tipoActualParam}`;
    const url: string = `${primeraParteDelUrl}${typeChart}/${authToken}/${encodeURIComponent(ric)}/${tipoActualParam}`;
    return url;
} //metodo crearUrlMiniGraficoParaIFrame

/*async function llamarApiConRIC (ric: string, tipoActualizacionInfo = "REALTIME"){
    let config = {
        headers: {
            'Content-type': "application/x-www-form-urlencoded; charset=UTF-8",
            //'Content-type': "application/json",
            'Authorization': "SSOTOKEN", //SSO TOKEN
            'Symbol': ric, //ric
            'UserType': "RT", //ej. RT
            'X-Frame-Options': "SAMEORIGIN",
        },
    };

    let refinitivMiniGrafica: string = "";

    try{
        //en el correo con el ejemplo de mini Graficos WEB, no se especifica si la llamada lleva algun header
        //const url = apiCall.REFINITIV_GRAFICA_COMPLEJA + "mini-chart/" + encodeURIComponent(ric);
        
        const primeraParteDelUrl = apiCall.REFINITIV_GRAFICA_COMPLEJA; // es el secret que termina en .com/
        
        const typeChart = "mini-chart";
        
        const authToken = "auth"; // aqui va el promiseSsoToken, cuando integre esa lógica
        
        const tipoActualParam = tipoActualizacionInfo !== undefined ? 
            tipoActualizacionInfo === "REALTIME" ? 
                "RT" : "DELAY" 
            : "RT"; 
        const url: string = `${primeraParteDelUrl}/${typeChart}/${authToken}/${ric}/${tipoActualParam}`;

        / *console.log("url llamada minichart: " + url);
        console.log(config);* /

        const responseApi = await axios.get<any>(url, config);

        refinitivMiniGrafica = responseApi.data == undefined ?
                "ND"
            :
                responseApi.data.replace('<head>', `<head><base href="${url}" />`);
    }
    catch(error: any){
        refinitivMiniGrafica = "ND error: " + error.toString(); 
    }

    return refinitivMiniGrafica;
}*/

async function convertirListaParaTicker (listaEmisoras: Emisora[], listaMovers: IMoversData[], listaIndices: IndicesArray[], tipoActualizacionInfo = "REALTIME", tokenRefinitiv: string) {

    //ESTA ES LA LISTA QUE TENDRA TODOS LOS COMPONENTES (INFO) QUE SE PONDRAN EN EL TICKER
    let listaConEmisorasIndicesCommTC: ElementoConMiniGrafico[] = [];

    //--------- LISTA CON EmisoraConMover
    let listaEmisoraConMover: EmisoraConMover[] = listaEmisoras.map((itemE: Emisora) => {
        let moverSeleccionadoFilter: IMoversData[] = listaMovers.filter((itemM: IMoversData) => {
            return itemM.emisora === itemE.Emisora && itemM.serie === itemE.Serie;
            ;
        });
        
        let moverSeleccionado: IMoversData = {
            idfiltro: "",
            tendencia: "",
            itemTableLS: "",
            itemLS: "",
            emisora: "",
            serie: "",
            descripcion: "",
            precioactual: 0,
            precioInicial: 0,
            Precio_Minimo: 0,
            Precio_Maximo: 0,
            ptjevar: 0,
            ptsvar: 0,
            hora: "",
            volumen: 0,
            operado: 0,
            Precio_Compra: 0,
            Precio_Venta: 0,
        };
        if(moverSeleccionadoFilter.length > 0){
            moverSeleccionado = moverSeleccionadoFilter[0];
        }

        return {
            tipo: "EmisoraConMover",
            emisora: itemE,
            mover: moverSeleccionado,
        };
    });
    
    let listaEmisorasConvertida: ElementoConMiniGrafico[] = listaEmisoraConMover.map((item: EmisoraConMover) => {
            
            if(item.emisora.RIC.trim() == ""){
                return {
                    elemento: item,
                    srcMiniGrafico: "ND RIC vacio",
                    componenteMiniGrafico: <div></div>,
                };
            }

            const urlParaMiniGraf: string = crearUrlMiniGraficoParaIFrame(item.emisora.RIC, tipoActualizacionInfo, tokenRefinitiv);

            //let src: string = await llamarApiConRIC(item.emisora.RIC, tipoActualizacionInfo);
            return {
                elemento: item,
                srcMiniGrafico: urlParaMiniGraf,
                //componenteMiniGrafico: <RefinitivMiniGraph url={src} />,
                componenteMiniGrafico: <RefinitivMiniGraph srcUrl={urlParaMiniGraf} />,
            };
        });

    let listaCorrectaDespuesDeResolverEmisoras = listaEmisorasConvertida;

    //--------- LISTA CON Indice
    let listaIndicesConvertida: ElementoConMiniGrafico[] = listaIndices.map((item: IndicesArray) => {
            
            if(item.ric.trim() == ""){
                return {
                    elemento: item,
                    srcMiniGrafico: "ND RIC vacio",
                    componenteMiniGrafico: <div></div>,
                };
            }

            //let src: string = await llamarApiConRIC(item.ric, tipoActualizacionInfo); //le quitamos el . al RIC del indice
            const urlParaMiniGraf: string = crearUrlMiniGraficoParaIFrame(item.ric, tipoActualizacionInfo, tokenRefinitiv);

            return {
                elemento: item,
                srcMiniGrafico: urlParaMiniGraf,
                componenteMiniGrafico: <RefinitivMiniGraph srcUrl={urlParaMiniGraf} />,
            };
        });

    let listaCorrectaDespuesDeResolverIndices = listaIndicesConvertida;

    //AGREGAR LISTAS CON PROMISES A listaConEmisorasIndicesCommTC
    listaConEmisorasIndicesCommTC.push(...listaCorrectaDespuesDeResolverEmisoras);
    listaConEmisorasIndicesCommTC.push(...listaCorrectaDespuesDeResolverIndices);

    return listaConEmisorasIndicesCommTC;
} // metodo async convertirListaParaTicker

const mod = (modulus: number) => (num: number) => ((num % modulus) + modulus) % modulus;

const getModularIndex = (array: ElementoConMiniGrafico[], i: number) => array[mod(array.length)(i)];

//State of the component
interface propsFromState {
    listaEmisoras: Emisora[];
    listaMovers: IMoversData[];
    listaIndices: IndicesArray[];
    tipoActualizacionMiniGraf?: "REALTIME" | "DELAY";
}

type AllProps = propsFromState;

const TickerTrading: React.FC<AllProps> = ({listaEmisoras, listaMovers, listaIndices, tipoActualizacionMiniGraf = "REALTIME"}) =>{

    /*console.log("tipoActualizacionMiniGraf en ticker: ");
    console.log(tipoActualizacionMiniGraf);*/


    let primerEmisoraRIC: string = "";
    let tamanioItemsTotal = listaMovers.length + listaIndices.length;
    if(listaEmisoras.length > 0){
        primerEmisoraRIC = listaEmisoras[0].RIC;
    }

    // HOOKS 
    const [mover, setMover] = useState(true);
    const [direccionIzq, setDireccionIzq] = useState(true);
    const [listaElementosMiniGraf, setListaElementosMiniGraf] = useState<ElementoConMiniGrafico[]>([]);
    const [refToken, setRefToken] = useState("");

    useEffect(() => {    
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

        if(listaEmisoras.length > 0 && refToken.length > 0){
            let elementosConSrcMiniGrafPromise: Promise<ElementoConMiniGrafico[]> = convertirListaParaTicker(listaEmisoras, listaMovers, listaIndices, tipoActualizacionMiniGraf, refToken);

            elementosConSrcMiniGrafPromise.then((lista: ElementoConMiniGrafico[]) => {
                setListaElementosMiniGraf(lista);
            });
        }

    }, [primerEmisoraRIC, tamanioItemsTotal, refToken]);

    const handleCambioDireccion = () => {
        setDireccionIzq(!direccionIzq);
    };

    const handleDetenerOMover = () => {
        setMover(!mover);
    };

    /*console.log("listaElementosMiniGraf");
    console.log(listaElementosMiniGraf);*/
    
    return(
        <div className="w-full flex flex-row py-2 pb-2 mb-4 bg-white">
            <div className="tickerComponent w-22/24">
                {
                    <div className="customTickerComponent w-full">
                        <div className="ticker">
                            <div className={`ticker-list ${mover ? "" : "ticker-list-pause"} ${direccionIzq ? "" : "ticker-list-to-right"}`}>
                                {
                                    listaElementosMiniGraf.length > 0 ? 
                                        listaElementosMiniGraf.map((itemE: ElementoConMiniGrafico) => {
                                            let keyVal: string = "";
                                            if((itemE.elemento as EmisoraConMover).tipo != undefined){
                                                keyVal = (itemE.elemento as EmisoraConMover).emisora.PrimaryRIC;
                                            }
                                            else{
                                                keyVal = (itemE.elemento as IndicesArray).ric;
                                            }
                                            
                                            return <TickerBox key={keyVal} elemento={itemE} />;
                                        })
                                    :
                                        <div>
                                            {/*<p>lista vacía</p>*/}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    /*<Ticker de react-ticker offset="run-in" speed={10} move={mover} direction={direccionIzq ? "toLeft" : "toRight"}>
                        {/*({ index }) => TickerBox(getModularIndex(emisorasConMiniGrafico, index))* /}
                        {({ index }) => <EmisoraEnTicker emisora={getModularIndex(listaElementosMiniGraf, index)} />}
                    </Ticker>*/
                }
                {
                    /*<Ticker de nice-react-ticker>
                        {
                            listaElementosMiniGraf.length > 0 ? 
                                listaElementosMiniGraf.map((item: EmisoraConMiniGrafico) => {
                                    return <EmisoraEnTicker emisora={item} />;
                                })
                            :
                                <div>
                                    <p>lista vacía</p>
                                </div>
                        }
                    </Ticker>*/
                }
            </div>
            <div className="btns w-2/24 flex flex-row justify-between">
                <button className="flechaIzq text-gray-300 hover:text-gray-500 disabled:cursor-not-allowed" onClick={handleCambioDireccion} disabled={!mover || direccionIzq}>
                    <MdKeyboardArrowLeft className="text-xl" />
                </button>
                <button className="pausePlay text-gray-300 hover:text-gray-500" onClick={handleDetenerOMover}>
                    {
                        mover ? 
                            <MdPause className="text-xl" />
                        :
                            <MdPlayArrow className="text-xl" />
                    }
                </button>
                <button className="flechaDer text-gray-300 hover:text-gray-500 disabled:cursor-not-allowed" onClick={handleCambioDireccion} disabled={!mover || !direccionIzq}>
                    <MdKeyboardArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default TickerTrading;