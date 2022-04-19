import React, { useState, useEffect, useRef } from 'react';
import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { useHistory } from 'react-router-dom';
import { getFolioDataRequest } from '../../actions/folioDataAction';
import { RootState } from '../../reducers/rootReducer';
import { connect, useDispatch } from 'react-redux';
import { MdAccessTime } from 'react-icons/md';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

import * as apiCall from '../../constants';
import PageLayout from '../../containers/layout/PageLayout';

const getColors = ( index ) => {
    const colors = [ "#CEDE22", "#B2E3DE", "#002E63", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1"]
    let color = colors[(index % 7)]
    return color
}

interface ComponentProps {
    loginObject: LoginObjectState;
}

const Mensajes: React.FC<ComponentProps> = ({ loginObject }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [ paramsDispatch, setParamsDispatch ] = useState<string[]>([]);
    const [ ctaCtoDispatch, setCtaCtoDispatch ] = useState("");
    const [ idDispatch, setIdDispatch ] = useState("");

    const [ listaMensajes, setListaMensajes ] = useState([]);
    const [ detalleMensajes, setDetalleMensajes ] = useState([]);
    const [ detalleSuscriptor, setDetalleSuscriptor ] = useState({});

    

    useEffect(() => {

        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
        
                    if(paramsDispatch.length === 0){
                        setParamsDispatch(params); 
                        setCtaCtoDispatch(cuentaLO);
                        setIdDispatch(idLO.toString());
                    }

                    const api_ = apiCall.API_MENSAJES + "mensajes/" + cuentaLO;
                    console.log("llamada api mensajes");
                    console.log("url: ", api_);
                    console.log(params);
                    fetch(
                        api_,
                        {
                            method: "GET",
                            headers: {
                                "id": idLO.toString(),
                                "x-api-key": apiCall.X_API_KEY_MENSAJES,
                            }
                        }
                    )
                    .then(response => response.json())
                    .then((jsonData) => {
                        // console.log("mensajes")
                        // console.log(jsonData)
                        setListaMensajes(jsonData)

                        //muestra el primner mensaje de la respuesta
                        getMsg(null, 0, jsonData[0].suscriptor, jsonData[0].suscriptor.includes("vector") ? "#ff5000": getColors(0), cuentaLO, idLO.toString());
                    })
                    .catch((e)=>{
                        console.log(e.message)
                    });
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en portfolio, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            if(loginObject.response.ierror === 92) {
              dispatch(postLoginObjectLogout());
              history.push("/");
            } else {
              //el usuario no esta loggeado, lo mandamos al login
              console.log("usuario no loggeado en appbar, lo mandamos al login");
              history.push("/");
            }
        }
    },[]);


    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [activeSusc, setActiveSusc] = useState({});


    const filterSearch=(searchValue)=>{
        // console.log(searchValue)
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listaMensajes.filter((item) => {
                return (Object.values(item["ultimo_mensaje"]).join(' ') + Object.values(item).join(' ')).toLowerCase().includes(searchValue.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(listaMensajes)
        }    
    }

    const getMsg = (e:any, index:any, suscriptor:any, color:any, cuentaCto: string, idLO: string) =>{
        
        if(cuentaCto.length > 0 && idLO.length > 0){
            const api_ = apiCall.API_MENSAJES + "mensajes/" + cuentaCto + "/" + suscriptor;
            console.log("llamada api getMsg");
            console.log("url: ", api_);
            console.log(idLO);
            fetch(
                api_,
                {
                    method: "GET",
                    headers: {
                        "id": idLO,
                        "x-api-key": apiCall.X_API_KEY_MENSAJES,
                    }
                }
            )
            .then(response => response.json())
            .then((jsonData) => {
                // console.log("mensajes suscriptor")
                // console.log(jsonData)

                let data = jsonData[0].listado_mensajes
                let sort_data = data.sort((a, b) =>{
                    // console.log(a.id - b.id)
                    return a.id - b.id
                })
                // sort_data = data.sort((a, b) =>b.fecha - a.fecha)

                // console.log("data sort")
                // console.log(sort_data)
                //muestra los mensajes de forma ascendente y scroll bottom
                setDetalleMensajes(sort_data)
                if(divRef.current) {
                    divRef.current.scrollIntoView(false) 
                }
                // muestra los mensajes de forma normal descendente
                // setDetalleMensajes(jsonData[0].listado_mensajes)
                
                setActiveSusc({
                    [index] : [true]
                });
                    
                let detalle = {
                    color: color,
                    suscriptor: suscriptor,
                    avatar: suscriptor.includes("vector") ? (suscriptor.split("-")[0][0]+suscriptor.split("-")[1][0]).toUpperCase() : suscriptor.split(".")[0]
                };
                setDetalleSuscriptor(detalle)
            })
            .catch((e)=>{
                console.log(e.message)
            });
        } // if cuentaCto.length > 0 && idLO.length > 0
    }

    const divRef = useRef<HTMLDivElement>(null);

    let childrenContentPrincipal = (
        <>
            <div className="flex my-8 pl-10 xl:pl-0">
                <div className="xl:w-4/12 w-6/12">
                    <p className='text-2xl font-medium mb-4'>Mensajes</p>
                    <div className='px-6 w-full mb-2'>
                        <div className="relative w-full ">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button type="submit" className="p-1  focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </span>
                            <input onChange={(e)=>filterSearch(e.target.value)} type="text" name="q" className="py-1 text-xs font-medium rounded pl-10 w-full border-1 border-gray-300 focus:text-red-600 focus:border-red-600" placeholder="Buscar mensaje" />
                        </div>
                    </div>
                    <div className='lista-mensajes wrap-mensajes overflow-y-scroll' style={{height: "calc(100vh - 14rem)"}}>

                        {searchInput.length > 1 ? (
                            filteredResults.map((node, index) => {
                                const {fecha, hora, suscriptor, ultimo_mensaje} = node

                                let fecha_completa = fecha + " " + hora
                                let susc = (suscriptor as string)
                                let avatar =  susc.includes("vector") ? (susc.split("-")[0][0]+susc.split("-")[1][0]).toUpperCase() : susc.split(".")[0]
                                
                                return (
                                    <div key={index} className={'px-6 hover:bg-white hover:shadow-md '+ (activeSusc[index] ? "bg-white shadow-md" : "")}>
                                        <div className='flex flex-wrap mr-12 w-full items-center border-b border-gray-300 py-3 cursor-pointer ' onClick={(e) => getMsg(e, index, suscriptor,susc.includes("vector") ? "#ff5000":getColors(index), ctaCtoDispatch, idDispatch)}>
                                            <div className='md:w-3/12 w-full'>
                                                <div className='avatar relative rounded-full border-3 flex items-center justify-center w-16 h-16 mr-4 sm:mb-2' style={{borderColor: (susc.includes("vector") ? "#ff5000":getColors(index))}}>
                                                    {
                                                        activeSusc[index] ?
                                                        <div className='avatar-point absolute' style={{background:(susc.includes("vector") ? "#ff5000":getColors(index)),position: "absolute", width: "7px", height: "7px", top: "50%", left: "-30%", marginTop: "-3.5px", borderRadius: "50%" }}></div>
                                                        : ""
                                                    }
                                                    <p className='text-xs font-bold'>{avatar}</p>
                                                </div>
                                            </div>
                                            <div className='md:w-9/12 w-full'>
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-sm font-medium mr-8'>{suscriptor}</p>
                                                    <p className='text-xxs flex flex-wrap justify-between items-center' style={{color:"#888682"}}><MdAccessTime className='mr-1' style={{width:"10px", height:"10px"}}/> {fecha_completa}</p>
                                                </div>
                                                <p className='text-xs'>{ultimo_mensaje["titulo"]}</p>
                                                <p className='text-xs' style={{color:"#888682"}}>{ultimo_mensaje["mensaje"]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            listaMensajes && listaMensajes.map((node, index)=> {
                                const {fecha, hora, suscriptor, ultimo_mensaje} = node

                                let fecha_completa = fecha + " " + hora
                                let susc = (suscriptor as string)
                                let avatar =  susc.includes("vector") ? (susc.split("-")[0][0]+susc.split("-")[1][0]).toUpperCase() : susc.split(".")[0]
                                
                                return (
                                    <div key={index} className={'px-6 hover:bg-white hover:shadow-md '+ (activeSusc[index] ? "bg-white shadow-md" : "")}>
                                        <div className='flex flex-wrap mr-12 w-full items-center border-b border-gray-300 py-3 cursor-pointer ' onClick={(e) => getMsg(e, index, suscriptor, susc.includes("vector") ? "#ff5000":getColors(index), ctaCtoDispatch, idDispatch)}>
                                            <div className='md:w-3/12 w-full'>
                                                <div className='avatar relative rounded-full border-3 flex items-center justify-center w-16 h-16 mr-4 sm:mb-2' style={{borderColor: (susc.includes("vector") ? "#ff5000":getColors(index))}}>
                                                    {
                                                        activeSusc[index] ?
                                                        <div className='avatar-point absolute' style={{background:(susc.includes("vector") ? "#ff5000":getColors(index)),position: "absolute", width: "7px", height: "7px", top: "50%", left: "-30%", marginTop: "-3.5px", borderRadius: "50%" }}></div>
                                                        : ""
                                                    }
                                                    <p className='text-xs font-bold'>{avatar}</p>
                                                </div>
                                            </div>
                                            <div className='md:w-9/12 w-full'>
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-sm font-medium mr-8'>{suscriptor}</p>
                                                    <p className='text-xxs flex flex-wrap justify-between items-center' style={{color:"#888682"}}><MdAccessTime className='mr-1' style={{width:"10px", height:"10px"}}/> {fecha_completa}</p>
                                                </div>
                                                <p className='text-xs'>{ultimo_mensaje["titulo"]}</p>
                                                <p className='text-xs' style={{color:"#888682"}}>{ultimo_mensaje["mensaje"]}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                        }

                        
                    </div>
                </div>
                {
                    detalleMensajes.length > 0 ? 
                    <div className='w-6/12 pl-10 pr-2'>
                        {
                            detalleSuscriptor && 

                            (
                                <div className='flex items-center border-b-2 border-gray-300 pb-3 mb-3'>
                                    <div className='relative rounded-full border-3 flex items-center justify-center w-12 h-12 mr-4' style={{borderColor:detalleSuscriptor["color"] }}>
                                        <p className='text-xxs font-bold'>{detalleSuscriptor["avatar"]}</p>
                                    </div>
                                    <div className=''>
                                        <p className="text-xl font-medium">{detalleSuscriptor["suscriptor"]}</p>
                                    </div>
                                </div>
                            )
                        }
                        <div className="overflow-y-scroll" style={{height: "calc(100vh - 13rem)"}} >
                            {
                                detalleMensajes && detalleMensajes.map((node, index)=>{
                                    const {fecha, hora, id, mensaje, titulo,} = node
                                    return(
                                        <div key={index} className="mb-2 p-3 rounded-md" style={{background: "#EEEEEE", width:"80%", margin:"0 auto"}}>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-sm font-medium'>{titulo}</p>
                                                <p className='text-xs'>{fecha + " " + hora}</p>
                                            </div>
                                            <p className='text-sm'>{mensaje}</p>
                                        </div>
                                    )
                                })
                            }
                            <div ref={divRef}></div>
                        </div>
                    </div>
                    : 
                    ""
                }
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}
//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getFolioDataRequest: () => dispatch(getFolioDataRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mensajes);
