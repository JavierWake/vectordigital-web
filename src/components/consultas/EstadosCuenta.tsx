import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';

import * as apiCall from '../../constants';
import { FooterComponent } from '../../containers/FooterComponent';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { RootState } from '../../reducers/rootReducer';
import ConsultasHeader from '../../containers/ConsultasHeader';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface propsFromState {
    loginObject: LoginObjectState;
}

type AllProps = propsFromState; 

const EstadosCuenta: React.FC<AllProps> = ({ loginObject }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [dataEstados, setEstados] = useState([]);
    const [dataAnios, setAnios] = useState(new Array<String>());
    const [dataMes, setMes] = useState(new Array<String>());
    
    const fetch_api_download_doc = (e:any, doctype:any, anio:any, mes:any, mesDesc:any)=>{
        
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login.
            
                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                    
                    fetch(
                        apiCall.GET_VECTOR_API + "/consulta/ectaelectronico"+doctype+"?cuenta=" + cuentaLO + "&anio="+anio+"&mes="+mes,
                        {
                            method: "GET",
                            headers:{
                                "canal" : canal,
                                "x-api-key": apiCall.X_API_KEY_CONSULTA,
                                "cuentasesion": cuentaSesionLO.toString(),
                                "token": tokenLO,
                                "id": idLO.toString(),
                            }
                        }
                    )
                    .then(response => response.json())
                    .then((jsonData) => {
                        let link = document.createElement("a")
                        link.href = "data:application/"+doctype+";base64,"+jsonData.response.dsDoc.tdsDoc[0].doc
                        link.download = "EdoCta-"+mesDesc+"-"+anio+"."+doctype
                        link.click()
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

    };

    const ver_archivo_pdf = (anio:any, mes:any) => {

        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
            
                    fetch(
                        apiCall.GET_VECTOR_API + "/consulta/ectaelectronicopdf?cuenta=" + cuentaLO + "&anio="+anio+"&mes="+mes,
                        {
                            method: "GET",
                            headers:{
                                "canal" : canal,
                                "x-api-key": apiCall.X_API_KEY_CONSULTA,
                                "cuentasesion": cuentaSesionLO.toString(),
                                "token": tokenLO,
                                "id": idLO.toString(),
                            }
                        }
                        )
                        .then(response => response.json())
                        .then((jsonData) => {
                            let iframe = document.getElementById((anio+mes).toString())
                            iframe?.setAttribute('src',"data:application/pdf;base64,"+jsonData.response.dsDoc.tdsDoc[0].doc )
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
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en portfolio, lo mandamos al login");
            history.push("/");
        }

        
        
    };
    
    const [showMonth, setShowMonth] = useState({});
    
    const selectMonth = (e) => {
        console.log(e.target.value)
        if(e.target.value == "todos"){

            setShowMonth("todos")
            setShownMore({})
            
        }else{
            setShowMonth(prevShownMore => ({
                [e.target.value]: !prevShownMore[e.target.value]
            }));
            setShownMore({})
        }
    }

    const [shownMore, setShownMore] = useState({});
    const toggleMore = (id,anio, mes) => {
        setShownMore(prevShownMore => ({
            ...prevShownMore,
            [id]: !prevShownMore[id]
        }));
        ver_archivo_pdf(anio,mes)
    };

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
            
                    const api_ = apiCall.GET_VECTOR_API + "/consulta/ectaelectronico?cuenta=" + cuentaLO;
                    fetch(
                        api_,
                        {
                            method: "GET",
                            headers: {
                                "canal" : canal,
                                "x-api-key": apiCall.X_API_KEY_CONSULTA,
                                "cuentasesion": cuentaSesionLO.toString(),
                                "token": tokenLO,
                                "id": idLO.toString(),
                            }
                        }
                    )
                    .then(response => response.json())
                    .then((jsonData) => {

                        console.log(jsonData)

                        let data = jsonData.response.dsEcta.tdsEcta
                        let sort_data = data.sort((a, b) => b.mesDesc - a.mesDesc)
                        sort_data = data.sort((a, b) => b.anio - a.anio)
                        
                        console.log(sort_data)
                        setEstados(sort_data) 

                        let anios = new Array<String>()

                        data.forEach( function(obj) {
                            if (anios.indexOf(obj.anio) === -1) anios.push(obj.anio);
                        });

                        console.log(anios + "anios")
                        setAnios(anios)


                        const mes = new  Array<String>()
                        
                        data.forEach( function(obj) {
                            if (mes.indexOf(obj.mesDesc) === -1) mes.push(obj.mesDesc);
                            console.log(obj);           
                            
                        });
                        console.log(mes + "meses")
                        setMes(mes)

                        setShowMonth("todos")
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
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en portfolio, lo mandamos al login");
            history.push("/");
        }

    }, []);

    let childrenContentPrincipal = (
        <>
            <div className="content w-full">
                <ConsultasHeader selectedTab="Estados de Cuenta" />
                <div className="controls mb-7">

                    <div className="select flex items-center">
                        <div className="flex items-center mr-4">
                            <p className="mr-4">Mes</p>
                            <select name="" id="" onChange={(e)=>selectMonth(e)} className="w-24 border-2 border-gray-300 text-xs text-gray-400 py-1 pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="todos">Todos</option>
                                {dataMes && dataMes.map((node, index)=>{
                                    return(
                                        <option key={index} value={node.toString()} >{node}</option>
                                    )
                                })}
                            </select>
                        </div>
                        
                        <div className="flex items-center">
                            <p className="mr-4">Año</p>
                            <select name="" id="" onChange={(e)=>selectMonth(e)} className="w-24 border-2 border-gray-300 text-xs text-gray-400 py-1 pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                                <option value="todos">Todos</option>
                                {dataAnios && dataAnios.map((node, index)=>{
                                    return(
                                        <option key={index} value={node.toString()} >{node}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-17/24'>

                    {dataEstados && dataEstados.map(( node, index ) => {
                        const {anio, mes, mesDesc} = node
                        
                        return(
                                showMonth == "todos" || showMonth[anio] || showMonth[mesDesc] ?
                            
                            
                                <div key={index} className="border-b border-gray-300 flex flex-wrap justify-between items-center py-3">
                                    <p className="text-sm ">{mesDesc}, {anio}</p>
                                    <div className="flex items-center">
                                        <a onClick={(e)=>fetch_api_download_doc(e, "xml",anio, mes, mesDesc)} className="text-xs text-white rounded-full py-1 px-2 bg-red-600 mr-3 cursor-pointer">XML</a>
                                        <a onClick={(e)=>fetch_api_download_doc(e, "pdf",anio, mes, mesDesc)} className="text-xs text-white rounded-full py-1 px-2 bg-red-600 mr-3 cursor-pointer">PDF</a>
                                        <a onClick={()=>toggleMore(anio+mesDesc,anio,mes)} className="text-sm text-red-600 cursor-pointer hover:underline">Ver Archivo</a>
                                    </div>
                                    <div className="w-full flex justify-center">
                                    { 
                                        shownMore[anio+mesDesc] ? 

                                            <iframe src="" frameBorder="0" style={{width:"100%", height:"50vh", padding:"2rem 0"}} id={(anio+mes).toString()}></iframe>
                                        :


                                        ""
                                        
                                    }
                                    </div>
                                </div>
                                : ""
                                
                        )
                    })}

                </div>
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
};

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
    };
};

export default connect(mapStateToProps)(EstadosCuenta);
