import React, { useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';

import '../../styles/research.css';

import { BLOCKS, MARKS, INLINES, Document } from "@contentful/rich-text-types"


import {
    documentToReactComponents,
    Options,
    RenderMark,
    RenderNode,
  } from '@contentful/rich-text-react-renderer';
import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { FooterComponent } from '../../containers/FooterComponent';

import { 
    MdMic,
    MdKeyboardArrowRight,
    MdShare,
    MdBookmark,
    MdFiberManualRecord,
    MdPlayCircleFilled,
    MdPause,
    MdHeight
} from "react-icons/md";

import { 
    IoSunnyOutline
} from "react-icons/io5";
import { GiMexico, GiEarthAmerica } from "react-icons/gi";
import { FaFlagUsa, FaRegFlag, FaTwitter } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { Link } from 'react-router-dom';
import { compareByDepth } from 'framer-motion/types/render/utils/compare-by-depth';
import PageLayout from '../../containers/layout/PageLayout';



const Bold = ({ children }:RenderMark) => <span className="bold">{children}</span>
const Text = ({ children }:RenderNode) => <p className="mb-1">{children}</p>
const website_url = 'http://localhost:3000';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text:any) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node:any, children:any) => 
        <Text>{children}</Text>
    ,
    [BLOCKS.EMBEDDED_ASSET]: (node:any) => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
    [INLINES.HYPERLINK]: ({ data }, children:any) => (
        <a
            className="font-bold text-red-600"
            href={data.uri}
            target={`${data.uri.startsWith(website_url) ? '_self' : '_blank'}`}
        >{children}</a>
      )
  },
}


const parseDate = (date: string): string => {
    let formattedDate: string = format(new Date(date), 'MMMM dd, yyyy', {
        locale: es,
    });

    const hoursDiff = differenceInHours(new Date(date), Date.now()) * -1;
    const minutesDiff = differenceInMinutes(new Date(date), Date.now()) * -1;

    if (minutesDiff < 1) {
        formattedDate = `hace menos de un minuto`;
    }

    if (minutesDiff === 1) {
        formattedDate = `hace un minuto`;
    }

    if (hoursDiff === 0 && minutesDiff > 1) {
        formattedDate = `hace ${minutesDiff} minutos`;
    }
    if (hoursDiff === 1) {
        formattedDate = `hace ${hoursDiff} hora`;
    }

    if (hoursDiff > 1 && hoursDiff < 24) {
        formattedDate = `hace ${hoursDiff} horas`;
    }

    return formattedDate;
};

const comparte = (link:string) =>{
    console.log("comparte")
    if (navigator.share) {
        navigator
        .share({
            title: "Vector Analisis",
            // text: "Hello, please come visit my website",
            url: link,
        })
        .then(() => {
            console.log("Successfully shared");
        })
        .catch((error) => {
            console.error("Something went wrong", error);
        });
    }    
}

const Research: React.FC = ({  }) => {

    const [showMenu, setShowMenu] = useState(false);

    const space_id = "rmz81tjgnatt";
    const access_token = "C8oMOx_DUPRr2BbTdEC4Cg3zgXjWVPDlpcfDVt1pyiE";


    const [dataPosts, setPosts] = useState([]);
    const [dataMercados, setMercados] = useState(Object);
    const [fechaMercados, setFechaMercados] = useState("");

    //autor
    const [autorComentario, setAutorComentario] = useState(Object);
    const [fotoAutorComentario, setFotoAutorComentario] = useState("");

    //semanario financiero
    const [semanarioFinanciero, setSemanarioFinanciero] = useState(Object);

    //flash
    const [flashEmisora, setFlashEmisora] = useState(Object);
    const [flashEco, setFlashEco] = useState(Object);
    const [flashTecnico, setFlashTecnico] = useState(Object);
    const [flashInter, setFlashInter] = useState(Object);

    //opinan
    const [diarioTecnico, setDiarioTecnico] = useState(Object);
    const [diarioEco, setDiarioEco] = useState(Object);
    const [estraInv, setEstraInv] = useState(Object);
    const [temasMoment, setTemasMoment] = useState(Object);
    const [presAnalisis, setPresAnalisis] = useState(Object);
    
    
    const [assetApertura, setAssetApertura] = useState("");
    const [dataComentario, setComentario] = useState(Object);

    //renta variable
    const [carteraModelo, setcarteraModelo] = useState(Object);
    const [expectativaTrimestal, setexpectativaTrimestal] = useState(Object);
    const [financierasAnuales, setfinancierasAnuales] = useState(Object);
    const [inicioCobertura, setinicioCobertura] = useState(Object);
    const [reporteTrimestral, setreporteTrimestral] = useState(Object);


    

    useEffect(() => {

        const api = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=mercadosApertura";
        fetch(api)
        .then(response => response.json())
        .then((jsonData) => {

            // console.log("mercados")
            // console.log(jsonData)
            setPosts(jsonData.items)
            setMercados(jsonData.items[0].fields)
            setFechaMercados(parseDate(jsonData.items[0].sys.createdAt))

            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset


            const resultAutor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id )
            // console.log(resultAutor.fields)
            setAutorComentario(resultAutor.fields)

            const resultFotoAutor = assets.find(fotoAutor => fotoAutor.sys.id == resultAutor.fields.foto.sys.id )
            // console.log(resultFotoAutor.fields.file.url)
            setFotoAutorComentario(resultFotoAutor.fields.file.url)

            // console.log(parseDate(jsonData.items[0].sys.createdAt))
            
            
            const api_assets = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/assets/"+jsonData.items[0].fields.imagenApertura.sys.id+"?access_token="+access_token
    
            // console.log(api_assets)
            fetch(api_assets)
            .then(response => response.json())
            .then((jsonData) => {
                // console.log("asset")
                setAssetApertura(jsonData.fields.file.url)
            })

            const api_comentario = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries/"+jsonData.items[0].fields.comentarioDiario.sys.id+"?access_token="+access_token
            fetch(api_comentario)
            .then(response => response.json())
            .then((jsonData) => {
                // console.log("Comentario Diario")
                // console.log(jsonData.fields)
                setComentario(jsonData.fields)
            })

        })

        const api_semanario = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=semanarioFinanciero";
        fetch(api_semanario)
        .then(response => response.json())
        .then((jsonData) => {
            const semanario =  { titulo : "", link : "" }
            semanario.titulo = jsonData.items[0].fields.titulo
            semanario.link = "https://vectoranalisis.mx/semanario-financiero/"+jsonData.items[0].fields.slug
            setSemanarioFinanciero(semanario)
        })

        const api_flashEmisora = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=flashEmisora";
        fetch(api_flashEmisora)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log("Flash Emisora")
            // console.log(jsonData)
            const flashEmisora = {titulo:"", resumen:"", link:"", fecha:""}    
            flashEmisora.titulo =  jsonData.items[0].fields.titulo
            flashEmisora.resumen =  jsonData.items[0].fields.resumen
            flashEmisora.link =  "https://vectoranalisis.mx/renta-variable/"+jsonData.items[0].fields.slug
            flashEmisora.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            setFlashEmisora(flashEmisora)  
        })

        const api_flashEco = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=flashEconomico";
        fetch(api_flashEco)
        .then(response => response.json())
        .then((jsonData) => {
            const flashEco = {titulo:"", resumen:"", link:"", fecha:""}
            flashEco.titulo =  jsonData.items[0].fields.titulo
            flashEco.resumen =  jsonData.items[0].fields.resumen
            flashEco.link =  "https://vectoranalisis.mx/economico/"+jsonData.items[0].fields.slug
            flashEco.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            setFlashEco(flashEco) 
        })
        const api_flashTecnico = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=flashTecnico";
        fetch(api_flashTecnico)
        .then(response => response.json())
        .then((jsonData) => {
            const flashTecnico = {titulo:"", resumen:"", link:"", fecha:""}
            flashTecnico.titulo =  jsonData.items[0].fields.titulo
            flashTecnico.resumen =  jsonData.items[0].fields.resumen
            flashTecnico.link =  "https://vectoranalisis.mx/tecnico/"+jsonData.items[0].fields.slug
            flashTecnico.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            setFlashTecnico(flashTecnico)
        })

        const api_flashInter = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=flashInternacional";
        fetch(api_flashInter)
        .then(response => response.json())
        .then((jsonData) => {
            const flashInter = {titulo:"", resumen:"", link:"", fecha:""}
            flashInter.titulo =  jsonData.items[0].fields.titulo
            flashInter.resumen =  jsonData.items[0].fields.resumen
            flashInter.link =  "https://vectoranalisis.mx/internacional/"+jsonData.items[0].fields.slug
            flashInter.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            setFlashInter(flashInter)
        })

        const api_diarioTecnico = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=pulsoTecnico";
        fetch(api_diarioTecnico)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log(jsonData)
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const diarioTecnico = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:"", tags: [""] }

            diarioTecnico.titulo =  jsonData.items[0].fields.titulo
            diarioTecnico.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            diarioTecnico.resumen =  jsonData.items[0].fields.resumen
            diarioTecnico.link =  "//vectoranalisis.mx/tecnico/"+jsonData.items[0].fields.slug
            diarioTecnico.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            diarioTecnico.image = assets.find(image => image.sys.id == jsonData.items[0].fields.heroImage.sys.id ).fields.file.url

            if(jsonData.items[0].fields.tags !== undefined){
                for (let index = 0; index < jsonData.items[0].fields.tags.length; index++) {                
                    diarioTecnico.tags[index] = entrys.find(tag => tag.sys.id == jsonData.items[0].fields.tags[index].sys.id )
                }
            }
            else{
                diarioTecnico.tags = [];
            }
            

            // console.log(diarioTecnico)
            setDiarioTecnico(diarioTecnico)
        })
        const api_diarioEco = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=diarioEconomico";
        fetch(api_diarioEco)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log(jsonData)
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const diarioEco = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:"", tags: [""] }

            diarioEco.titulo =  jsonData.items[0].fields.titulo
            diarioEco.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            diarioEco.resumen =  jsonData.items[0].fields.resumen
            diarioEco.link =  "//vectoranalisis.mx/economico/"+jsonData.items[0].fields.slug
            diarioEco.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            diarioEco.image = assets.find(image => image.sys.id == jsonData.items[0].fields.fotoDePortada.sys.id ).fields.file.url

            if(jsonData.items[0].fields.tags !== undefined){
                for (let index = 0; index < jsonData.items[0].fields.tags.length; index++) {                
                    diarioEco.tags[index] = entrys.find(tag => tag.sys.id == jsonData.items[0].fields.tags[index].sys.id )
                }
            }
            else{
                diarioEco.tags = [];
            }
            

            // console.log(diarioEco)
            setDiarioEco(diarioEco)
        })
        const api_estrategia = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=estrategiaDeInversion";
        fetch(api_estrategia)
        .then(response => response.json())
        .then((jsonData) => {
            console.log("jsonData api estrategia");
            console.log(jsonData);
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const estraInv = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:"", tags: [""] }

            estraInv.titulo =  jsonData.items[0].fields.titulo
            estraInv.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            estraInv.resumen =  jsonData.items[0].fields.resumen
            estraInv.link =  "//vectoranalisis.mx/estrategia-de-inversion/"+jsonData.items[0].fields.slug
            estraInv.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            estraInv.image = assets.find(image => image.sys.id == jsonData.items[0].fields.heroImage.sys.id ).fields.file.url

            if(jsonData.items[0].fields.tags !== undefined){
                for (let index = 0; index < jsonData.items[0].fields.tags.length; index++) {                
                    estraInv.tags[index] = entrys.find(tag => tag.sys.id == jsonData.items[0].fields.tags[index].sys.id );
                }
            }
            else{
                estraInv.tags = [];
            }

            // console.log(estraInv)
            setEstraInv(estraInv)
        })

        const api_temas = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=generico";
        fetch(api_temas)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log(jsonData)
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const temasMoment = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:""}

            temasMoment.titulo =  jsonData.items[0].fields.titulo
            temasMoment.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            temasMoment.resumen =  jsonData.items[0].fields.resumen
            temasMoment.link =  "//vectoranalisis.mx/temas-del-momento/"+jsonData.items[0].fields.slug
            temasMoment.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            temasMoment.image = assets.find(image => image.sys.id == jsonData.items[0].fields.heroImage.sys.id ).fields.file.url

            // console.log(temasMoment)
            setTemasMoment(temasMoment)
        })

        const api_pres = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=presentacionAnalisis";
        fetch(api_pres)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log(jsonData)
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const presAnalisis = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:"", tags: [""] }

            presAnalisis.titulo =  jsonData.items[0].fields.titulo
            presAnalisis.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            presAnalisis.resumen =  jsonData.items[0].fields.resumen
            presAnalisis.link =  "//vectoranalisis.mx/presentacion-analisis/"+jsonData.items[0].fields.slug
            presAnalisis.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            // presAnalisis.image = assets.find(image => image.sys.id == jsonData.items[0].fields.heroImage.sys.id ).fields.file.url

            if(jsonData.items[0].fields.tags !== undefined) {
                for (let index = 0; index < jsonData.items[0].fields.tags.length; index++) {                
                    presAnalisis.tags[index] = entrys.find(tag => tag.sys.id == jsonData.items[0].fields.tags[index].sys.id )
                }
            }
            else{
                presAnalisis.tags = [];
            }

            // console.log(presAnalisis)
            setPresAnalisis(presAnalisis)
        })

        const api_cartera = "https://cdn.contentful.com/spaces/"+space_id+"/environments/master/entries?access_token="+access_token+"&limit=1&content_type=carteraModelo";
        fetch(api_cartera)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData)
            const entrys =  jsonData.includes.Entry
            const assets = jsonData.includes.Asset
            const carteraModelo = {titulo:"", image:"", autor:"", resumen:"", link:"", fecha:"", tags: [""]}

            carteraModelo.titulo =  jsonData.items[0].fields.titulo
            carteraModelo.autor = entrys.find(autor => autor.sys.id ==  jsonData.items[0].fields.autor.sys.id ).fields.nombre
            carteraModelo.resumen =  jsonData.items[0].fields.resumen
            carteraModelo.link =  "//vectoranalisis.mx/renta-variable/"+jsonData.items[0].fields.slug
            carteraModelo.fecha =  parseDate(jsonData.items[0].sys.createdAt)
            // carteraModelo.image = assets.find(image => image.sys.id == jsonData.items[0].fields.heroImage.sys.id ).fields.file.url

            if(jsonData.items[0].fields.tags !== undefined){
                for (let index = 0; index < jsonData.items[0].fields.tags.length; index++) {                
                    carteraModelo.tags[index] = entrys.find(tag => tag.sys.id == jsonData.items[0].fields.tags[index].sys.id )
                }
            }
            else{
                carteraModelo.tags = [];
            }
            

            console.log(carteraModelo)
            setcarteraModelo(carteraModelo)
        })

        

    },[]);

    let classesContentPrincipal = "my-10 pl-10 pr-10";
    let childrenContentPrincipal = (
        <>
            <div className="content">

                <div className="my-10">
                    <ul className="border-b-2 border-gray-300 pb-2">
                        <li className="inline"><a href="/research" className="border-b-2 border-red-600 pb-2.5 pr-16 text-sm text-red-600 font-medium hover:text-red-600">Lo del momento</a></li>
                        <li className="inline"><a href="/tech-rules" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Tech Rules</a></li>
                    </ul>
                </div>

                <div className="subtile pb-2 mb-4">
                    <p className="text-xl font-medium">Mercados a la apertura</p>
                    <p className="text-xs text-gray-400">
                    {
                        dataMercados && fechaMercados
                    }
                    </p>   
                </div>

                <div className="flex flex-wrap pr-14">

                    <div className="w-8/12 flex flex-wrap justify-between">
                        
                        <div className="w-6/12 pr-4 flex flex-col">
                            <div className="flex-1">
                                <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                                    <div className="p-4 rounded-lg bg-white shadow-md hover:shadow-xl h-100">
                                        <div className="flex">
                                            <div className="">
                                                <GiEarthAmerica className="icon my-0 mr-4 text-red-600" style={{height:"24px", width:"24px"}} />
                                            </div>
                                            <p className="font-bold text-sm mb-2 flex items-end">
                                                { dataComentario && dataComentario.titulo }
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xs text-justify">
                                                { dataComentario.texto && documentToReactComponents(dataComentario.texto, options) }
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="w-6/12 pr-4 flex flex-col">
                            <div className="flex-1">
                                <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                                    <div className="p-4 rounded-lg bg-white shadow-md h-100 hover:shadow-xl">
                                        <div>
                                            <p className="font-bold text-sm mb-2 flex items-end">
                                                <GiEarthAmerica  className="icon my-0 mr-4 text-red-600" style={{height:"auto", width:"24px"}} />
                                                Mercados en el Mundo
                                            </p>
                                        </div>
                                        <div>
                                            
                                            <div className="text-xs pb-2 text-justify">
                                                {
                                                    dataMercados.mercadosEnElMundo && documentToReactComponents(dataMercados.mercadosEnElMundo, options)
                                                    // dataMercados.mercadosEnElMundo.content[0].content[0].value
                                                }
                                            </div>
                                            {/* <p className="text-xs pb-2 text-justify">
                                                {
                                                    dataMercados.mercadosEnElMundo == null ? "No hay info" :
                                                    // documentToReactComponents(dataMercados.mercadosEnElMundo, options)
                                                    dataMercados.mercadosEnElMundo.content[1].content[0].value
                                                }
                                            </p> */}
                                            <div className="mt-2">
                                                {/* <p className="font-mono text-xxs inline py-1 px-2 rounded-md tag-azul-light">Internacional</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="w-full pr-4 mt-4">
                            <div className="">
                                <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                                    <div className="p-4 rounded-lg bg-white shadow-md hover:shadow-xl">
                                        <div>
                                            <p className="font-bold text-sm mb-2 flex items-end">
                                                <ImNewspaper className="icon icon-azul my-0 mr-4" style={{height:"30px", width:"auto"}} />
                                                Noticas y Eventos
                                            </p>
                                        </div>
                                        <div className="text-xs">
                                            {
                                                dataMercados.noticias == null ? "No hay info" :
                                                documentToReactComponents(dataMercados.noticias, options)
                                            }
                                        </div>
                                        <div className="flex mt-3">
                                            {/* <p className="font-mono text-xxs tag-azul inline py-1 px-2 rounded-md mr-3">Alimento</p>
                                            <p className="font-mono text-xxs tag-azul inline py-1 px-2 rounded-md mr-3">Alimento</p>
                                            <p className="font-mono text-xxs tag-azul inline py-1 px-2 rounded-md">Alimento</p> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                    </div>

                    <div className="w-4/12">
                        <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                            <div className="rounded-lg bg-white shadow-md h-full hover:shadow-xl">
                                <div className="w-full rounded-lg overflow-hidden h-40">
                                    <img src={assetApertura == null ? ""  : assetApertura} alt="" className="object-cover object-center" />
                                </div>
                                <div className="p-4">
                                    <div>
                                        <p className="text-sm font-bold flex items-end">
                                            <IoSunnyOutline  className="icon my-0 mr-2" style={{width:"28px", color:"#FF5000"}} /> 
                                            Expectativa de Apertura
                                        </p>
                                    </div>
                                    <div className="py-4">
                                        {/* <p className="text-xs text-justify mb-1">
                                            {
                                                dataMercados.expecativaDeApertura == null ? "No day datos" :
                                                dataMercados.expecativaDeApertura.content[0].content[0].value
                                            }
                                        </p> */}
                                        <div className="text-xs text-justify mb-1">
                                            {
                                                dataMercados.expecativaDeApertura && documentToReactComponents(dataMercados.expecativaDeApertura, options)
                                            }
                                        </div>
                                        {/* <p className="text-xs text-justify">
                                            {
                                                dataMercados.expecativaDeApertura == null ? "No day datos" :
                                                dataMercados.expecativaDeApertura.content[1].content[0].value
                                            }
                                        </p> */}
                                        
                                    </div>
                                    <div className="flex justify-between">
                                        {/* <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-verde">Internacional</p>
                                        <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-verde">Salud</p> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="mt-4 w-12/12 flex flex-wrap items-stretch">
                        {/* <div className="w-4/12 pr-4">
                            <div className="h-full">
                                <div className="p-4 rounded-lg bg-white shadow-md h-full flex flex-column justify-between">
                                    <div>
                                        <p className="font-bold text-sm mb-2 flex items-end">
                                            <GiEarthAmerica  className="icon my-0 mr-4 text-red-600" style={{height:"24px", width:"auto"}} />
                                            México
                                        </p>
                                        <p className="text-xs">Los Emiratos Árabes Unidos rechazaron el domingo un plan del cartel petrolero de la OPEP y los países productores aliados para extender el pacto global para recortar la producción de petróleo más allá de abril de 2022.</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-naranja">Internacional</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="w-4/12 pr-4">
                            <div className="h-full">
                                <div className="p-4 rounded-lg bg-white shadow-md h-full flex flex-column justify-between">
                                    <div>
                                        <p className="font-bold text-sm mb-2 flex items-end">
                                            <FaRegFlag  className="icon my-0 mr-4 icon-azul-light" style={{height:"24px", width:"auto"}} />
                                            Asia
                                        </p>
                                        <p className="text-xs">Las bolsas asiáticas cerraron en terreno mixto, destacando el retroceso de los índices en Japón y Hong Kong.</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-azul-light">Salud</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="w-4/12">
                            <div className="h-full">
                                <div className="p-4 rounded-lg bg-white shadow-md h-full flex flex-column justify-between">
                                    <div>
                                        <p className="font-bold text-sm mb-2 flex items-end">
                                            <GiEarthAmerica  className="icon my-0 mr-4 text-red-600" style={{height:"24px", width:"auto"}} />
                                            Eurozona
                                        </p>
                                        <p className="text-xs">Las bolsas observan ganancias casi generalizadas después de que el PMI de servicios superara las expectativas en junio. En Alemania el PMI de servicios mejoró fuertemente.</p>
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-naranja">Internacional</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                        <div className="w-12/12 flex mt-1">
                            
                            <div className="w-6/12 pr-2">
                                <div className="h-full">
                                    <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                                        <div className="p-4 rounded-lg bg-white shadow-md h-full flex flex-column justify-between hover:shadow-xl">
                                            <div>
                                                <p className="font-bold text-sm mb-2 flex items-end">
                                                    <MdMic className="icon my-0 mr-4 icon-verde" style={{height:"24px", width:"auto"}} />
                                                    Capitales - Opinión
                                                </p>
                                                <p className="text-xs text-justify">
                                                {
                                                    dataMercados.lasMesasOpinanCapitales == null ? "No hay datos" :
                                                    dataMercados.lasMesasOpinanCapitales.content[0].content[0].value
                                                }
                                                </p>
                                            </div>
                                            <div>
                                                {/* <div className="mt-2">
                                                    <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-verde">Alimento</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            { dataMercados.lasMesasOpinanDivisas == null ? "" : 
                            <div className="w-6/12 pl-2">
                                <div className="h-full">
                                    <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                                        <div className="p-4 rounded-lg bg-white shadow-md h-full flex flex-column justify-between hover:shadow-xl">
                                            <div>
                                                <p className="font-bold text-sm mb-2 flex items-end">
                                                    <MdMic className="icon my-0 mr-4 icon-verde" style={{height:"24px", width:"auto"}} />
                                                    Divisas - Opinión
                                                </p>
                                                <p className="text-xs text-justify">
                                                {
                                                    dataMercados.lasMesasOpinanDivisas == null ? "No hay datos" :
                                                    dataMercados.lasMesasOpinanDivisas.content[0].content[0].value
                                                }
                                                </p>
                                            </div>
                                            <div>
                                                {/* <div className="mt-2">
                                                    <p className="font-mono text-xxs inline py-1 px-2 rounded-2xl tag-verde">Alimento</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="flex w-full flex justify-end mt-4">
                        <div>
                            <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} target="_blank" className="text-sm text-red-600 font-bold flex items-end">
                                Ver todo 
                                <MdKeyboardArrowRight className="icon my-0 text-red-600" style={{height:"auto", width:"24px"}} />
                            </a>
                        </div>
                    </div>
                </div>



                <div className="subtile my-10 border-b-2 border-gray-300 pb-2 flex justify-between">
                    <p className="text-xl font-medium">Nuestros Analistas Opinan</p>
                </div>

                <div className="mb-10">
                    <ul className="pb-2">
                        <li className="inline"><a href="#" className="border-b-2 border-red-600 pb-2.5 pr-16 text-sm text-red-600 font-medium hover:text-red-600">Estrategía</a></li>
                        <li className="inline"><a href="#" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Renta Variable</a></li>                                 
                        <li className="inline"><a href="#" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Técnico</a></li>
                        <li className="inline"><a href="#" className="border-b-2 border-gray-300 pb-2.5 pr-16 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Internacional</a></li>
                    </ul>
                </div>

                <div className="news-analistas pr-14">

                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={diarioTecnico.link != null ? diarioTecnico.link: ""} target="_blank" >
                                        {diarioTecnico.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{diarioTecnico.autor}</span>
                                    <span className="text-xs">{diarioTecnico.fecha}</span>
                                </p>
                                <p className="text-xs text-gray-400">{diarioTecnico.resumen}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                    {diarioTecnico.tags && diarioTecnico.tags.map(( node ) => {
                                        const {fields} = node
                                        return(
                                            <NavLink to={"//vectoranalisis.mx/tags/"+fields.slug} target="_blank">
                                                <div className="text-xxs text-red-600 rounded-2xl border-1 border-red-600 px-3 py-1">
                                                    <p>
                                                        {fields.nombre}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(diarioTecnico.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden" style={{height:"140px"}}>
                                    <img src={diarioTecnico.image} alt="" className="object-cover object-center" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={diarioEco.link != null ? diarioEco.link: ""} target="_blank" >
                                        {diarioEco.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{diarioEco.autor}</span>
                                    <span className="text-xs">{diarioEco.fecha}</span>
                                </p>
                                <div className="text-xs text-gray-400">
                                    {documentToReactComponents(diarioEco.resumen)}

                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                    {diarioEco.tags && diarioEco.tags.map(( node ) => {
                                        const {fields} = node
                                        return(
                                            <NavLink to={"//vectoranalisis.mx/tags/"+fields.slug} target="_blank" key={fields.nombre}>
                                                <div className="text-xxs text-red-600 rounded-2xl border-1 border-red-600 px-3 py-1">
                                                    <p>
                                                        {fields.nombre}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(diarioEco.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden" style={{height:"140px"}}>
                                    <img src={diarioEco.image} alt="" className="object-cover object-center"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={temasMoment.link != null ? temasMoment.link: ""} target="_blank" >
                                        {temasMoment.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{temasMoment.autor}</span>
                                    <span className="text-xs">{temasMoment.fecha}</span>
                                </p>
                                <div className="text-xs text-gray-400">
                                    {temasMoment.resumen}

                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(temasMoment.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden" style={{height:"140px"}}>
                                    <img src={temasMoment.image} alt="" className="object-cover object-center"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={presAnalisis.link != null ? presAnalisis.link: ""} target="_blank" >
                                        {presAnalisis.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{presAnalisis.autor}</span>
                                    <span className="text-xs">{presAnalisis.fecha}</span>
                                </p>
                                <div className="text-xs text-gray-400">
                                    {presAnalisis.resumen}

                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                    {presAnalisis.tags && presAnalisis.tags.map(( node ) => {
                                        const {fields} = node
                                        return(
                                            <NavLink to={"//vectoranalisis.mx/tags/"+fields.slug} target="_blank" key={fields.nombre}>
                                                <div className="text-xxs text-red-600 rounded-2xl border-1 border-red-600 px-3 py-1">
                                                    <p>
                                                        {fields.nombre}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(presAnalisis.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden bg-gray-300" style={{height:"140px"}}>
                                    <img src={presAnalisis.image} alt="" className="object-cover object-center"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={estraInv.link != null ? estraInv.link: ""} target="_blank" >
                                        {estraInv.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{estraInv.autor}</span>
                                    <span className="text-xs">{estraInv.fecha}</span>
                                </p>
                                <div className="text-xs text-gray-400">
                                    {estraInv.resumen}

                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                    {estraInv.tags && estraInv.tags.map(( node ) => {
                                        const {fields} = node
                                        return(
                                            <NavLink to={"//vectoranalisis.mx/tags/"+fields.slug} target="_blank" key={fields.nombre}>
                                                <div className="text-xxs text-red-600 rounded-2xl border-1 border-red-600 px-3 py-1">
                                                    <p>
                                                        {fields.nombre}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(estraInv.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden" style={{height:"140px"}}>
                                    <img src={estraInv.image} alt="" className="object-cover object-center"/>
                                </div>
                            </div>
                        </div>
                    </div>                               
                </div>

                {/* <div className="news-analistas pr-14">
                    <div className="new-analista flex justify-between border-b-2 border-gray-300 pb-4 mb-10">
                        <div className="w-7/12">
                            <div className="mb-3">
                                <p className="text-sm font-bold">
                                    <NavLink to={carteraModelo.link != null ? carteraModelo.link: ""} target="_blank" >
                                        {carteraModelo.titulo}
                                    </NavLink>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">
                                    <span className="text-sm mr-2">{carteraModelo.autor}</span>
                                    <span className="text-xs">{carteraModelo.fecha}</span>
                                </p>
                                <p className="text-xs text-gray-400">{carteraModelo.resumen}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="tags-wrap flex flex-wrap items-center">
                                    {carteraModelo.tags && carteraModelo.tags.map(( node ) => {
                                        const {fields} = node
                                        return(
                                            <NavLink to={"//vectoranalisis.mx/tags/"+fields.slug} target="_blank">
                                                <div className="text-xxs text-red-600 rounded-2xl border-1 border-red-600 px-3 py-1">
                                                    <p>
                                                        {fields.nombre}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </div>
                                <div className="flex">
                                    <MdShare  className="icon my-0 text-gray-400 cursor-pointer hover:text-red-600" style={{height:"24px", width:"auto"}} onClick={() => comparte(carteraModelo.link)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="">
                                <div className="w-full rounded-lg overflow-hidden bg-gray-300" style={{height:"140px"}}>
                                    <img src={carteraModelo.image} alt="" className="object-cover object-center" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}

            </div>
        </>
    );

    let classesContentDerecha = "w-6/24 mt-40 pr-10";
    let childrenContentDerecha = (
        <>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">Comentario Diario</p>
                </div>
                { autorComentario ? 
                <a href={dataMercados == null ? "#" : "//vectoranalisis.mx/mercados-a-la-apertura/"+dataMercados.slug} className="hover:text-black" target="_blank">
                    <div className="bg-white p-4 rounded-lg flex justify-between shadow-md hover:shadow-xl">
                        <div className="w-2/12">
                            <img src={(fotoAutorComentario)+"?w=200&q=50"} alt="" className="" />
                        </div>
                        <div className="w-10/12">
                            <div className="head flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold">{autorComentario.nombre}</p>
                                </div>
                                <div>
                                    <p className="text-xxs text-gray-400">{autorComentario.twitter}</p>
                                </div>
                                <div>
                                    <FaTwitter className="icon my-0 mr-4" style={{height:"25px", width:"auto", color:"#5FA9DC"}} />
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs font-bold">
                                    {
                                        dataComentario == "null" ? "No hay datos" :
                                        dataComentario.titulo
                                    }
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <p className="text-xs text-gray-400">
                                {
                                    dataMercados == "null" ? "No hay datos" :
                                    fechaMercados
                                }
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
                : "No hay data" }
            </div>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">Semanario Financiero</p>
                </div>
                <a href={semanarioFinanciero.link} target="_blank" className="hover:text-black">
                <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-xl">
                    <div className="w-3/12">
                        <img src="/semanario.jpg" alt="" className="" />
                    </div>
                    <div className="w-9/12 pl-4">
                        <p className="text-xs">{semanarioFinanciero.titulo}</p>
                    </div>
                </div>
                </a>
            </div>
            <div className="mb-10">
            <div className="mb-3">
                <p className="font-bold text-xl">Podcast</p>
            </div>
            <a href="https://open.spotify.com/show/247lnwxXr5BTShaknkAbwZ" target="_blank" className="hover:text-black">

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl">
                    <div className="w-12/12 flex justify-between items-center mb-2">
                        <div className="w-4/12">
                            <img src="https://i.scdn.co/image/ab6765630000ba8a90425257a0932fc70ee8332d" alt="" className="" style={{width:"100px"}} />
                        </div>
                        <div className="w-8/12 pl-2">
                            <div>
                                <p className="text-xs font-bold mb-1">Ve y escucha nuestros podcasts</p>
                            </div>
                            <div>
                                <img src="/spotify_logo.png" alt="" className="" style={{width:"100px"}} />
                            </div>
                        </div>
                    </div>
                    <div className="w-12/12">
                        <div>
                            {/* <p className="text-xs font-bold mb-1">Ve y escucha nuestros podcasts</p> */}
                        </div>
                        {/* <div>
                            <p className="text-xs font-bold mb-1">Los datos más recientes de crecimiento para la economía mexicana han mostrado una desaceleración significativa.</p>
                            <p className="text-xs">Los datos más recientes de crecimiento para la economía mexicana han mostrado una desaceleración significativa. Hemos revisado a la baja nuestra estimación de crecimiento económico a 5.8 por ciento en 2021. En 2022 la economía se desacelerará también.</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-xs text-gray-400">20 de noviembre 2021</p>
                        </div> */}
                    </div>
                </div>
            </a>
            </div>
            <div className="mb-10">
                <div className="mb-3">
                    <p className="font-bold text-xl">Flash</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="border-b-2 pb-2">
                        <p className="text-xs font-bold mb-2 flex items-center">
                            <MdFiberManualRecord  className="icon my-0 mr-2 text-red-600" style={{width:"10px", height:"10px"}} />
                            Flash Emisora
                        </p>
                        <a href={flashEmisora.link} target="_blank">
                            <p className="text-xs mb-1">{flashEmisora.titulo}</p>
                        </a>
                        <p className="text-xs text-gray-400">{flashEmisora.resumen}</p>
                        <div className="w-full flex justify-end mt-2">
                            <p className="text-xxs text-gray-400">{flashEmisora.fecha}</p>
                        </div>
                    </div>
                    <div className="border-b-2 py-2">
                        <p className="text-xs font-bold mb-2 flex items-center">
                            <MdFiberManualRecord  className="icon my-0 mr-2" style={{width:"10px", height:"10px", color:"#CEDE22"}} />
                            Flash Económico
                        </p>
                        <a href={flashEco.link} target="_blank">
                            <p className="text-xs mb-1">{flashEco.titulo}</p>
                        </a>
                        <p className="text-xs text-gray-400">{flashEco.resumen}</p>
                        <div className="w-full flex justify-end mt-2">
                            <p className="text-xxs text-gray-400">{flashEco.fecha}</p>
                        </div>
                    </div>
                    <div className="border-b-2 py-2">
                        <p className="text-xs font-bold mb-2 flex items-center">
                            <MdFiberManualRecord  className="icon my-0 mr-2" style={{width:"10px", height:"10px", color:"#B2E3DE"}} />
                            Flash Técnico
                        </p>
                        <a href={flashTecnico.link} target="_blank">
                            <p className="text-xs mb-1">{flashTecnico.titulo}</p>
                        </a>
                        <p className="text-xs text-gray-400">{flashTecnico.resumen}</p>
                        <div className="w-full flex justify-end mt-2">
                            <p className="text-xxs text-gray-400">{flashTecnico.fecha}</p>
                        </div>
                    </div>
                    <div className="py-2">
                        <p className="text-xs font-bold mb-2 flex items-center">
                            <MdFiberManualRecord  className="icon my-0 mr-2" style={{width:"10px", height:"10px", color:"#172A56"}} />
                            Flash Internacional
                        </p>
                        <a href={flashInter.link} target="_blank">
                            <p className="text-xs mb-1">{flashInter.titulo}</p>
                        </a>
                        <p className="text-xs text-gray-400">{flashInter.resumen}</p>
                        <div className="w-full flex justify-end mt-2">
                            <p className="text-xxs text-gray-400">{flashInter.fecha}</p>
                        </div>
                    </div>
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
            scrollEnContentDerecha={false}
            titulo="Lo del momento"
        />
    );
}


export default Research