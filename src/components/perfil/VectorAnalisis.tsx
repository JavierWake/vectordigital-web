import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../reducers/rootReducer';
import parse from "html-react-parser";

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { BsTrash } from "react-icons/bs";

import { LoginObjectState } from "../../types/LoginObjectTypes";
import { getConfigVARequest } from "../../actions/configVAAction";
import { ConfigVAStatus } from '../../types/ConfigVAType';
import Loading from '../Loading';
import { CustomMUISwitch } from '../../containers/CustomMuiSwitch';
import { getResumenMercadoRequest } from '../../actions/getResumenMercadoAction';
import { GetResumenMercadoStatus } from '../../types/GetResumenMercadoType';
import { Dropdown } from '../../containers/Dropdown';
import { DropdownDataFrecuencia, DropdownDataHorario } from '../../mocks/DropdownData';

import { CatalogoEmisorasState, Emisora } from '../../types/GetCatalogoEmisotasType';

import { getCatalogoEmisorasRequest } from '../../actions/getCatalogoEmisorasAction';
import { postConfigVARequest } from '../../actions/postConfigVAAction';
import { PostConfigVAState } from '../../types/PostConfigVAType';
import { SearchConfigVA } from '../../containers/SearchConfigVA';
import { DataSearchAppbar } from '../../containers/SearchAppbar';
import { postAllConfigVARequest } from '../../actions/postAllConfigVAAction';
import { PostAllConfigVAState } from '../../types/PostAllConfigVAType';
import { postResumenMercadoRequest } from '../../actions/postResumenMercadoAction';
import { PostResumenMercadoState } from '../../types/PostResumenMercadoType';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

import Alert from '../../containers/Alert';

import PageLayout from '../../containers/layout/PageLayout';
import { putServicioRequest } from '../../actions/putServicioAction';
import { PutServicioState } from '../../types/PutServicioType';

interface VectorAnalisisProps {
    loginObject: LoginObjectState;
    configVA: ConfigVAStatus;
    getResumenMercado: GetResumenMercadoStatus;
    catalogoEmisorasRespuesta: CatalogoEmisorasState;
    postConfigVA: PostConfigVAState;
    postAllConfigVA: PostAllConfigVAState;
    postResumenMercado: PostResumenMercadoState;
    putServicio: PutServicioState;
}

const VectorAnalisis: React.FC<VectorAnalisisProps> = ({ loginObject, configVA, getResumenMercado, postConfigVA, catalogoEmisorasRespuesta, postAllConfigVA, postResumenMercado, putServicio }) => {

    const dispatch = useDispatch();    
    const history = useHistory();
    let cuentaLO = "";

    const [suscrito, setSuscrito] = useState<any>({});
    const [originalSuscrito, setOriginalSuscrito] = useState<any>({});
    const [originalPostSuscrito, setOriginalPostSuscrito] = useState<any>({});
    const [checkMesaAnalisis, setCheckMesaAnalisis] = useState(false);
    const [checkEconomia, setCheckEconomia] = useState(false);
    const [checkRentaVariable, setCheckRentaVariable] = useState(false);
    const [checkFundamental, setCheckFundamental] = useState(false);
    const [checkTecnico, setCheckTecnico] = useState(false);
    const [checkResumen, setCheckResumen] = useState(false);
    const [checkTodo, setCheckTodo] = useState(false);
    const [frecuencia, setFrecuencia] = useState("Diario");
    const [horario, setHorario] = useState("Al cierre");
    const [idFrecuencia, setIdFrecuencia] = useState("Diario");
    const [idHorario, setIdHorario] = useState("Cierre");
    const [posicion, setPosicion] = useState(false);
    const [emisoras, setEmisoras] = useState(false);
    const [listaEmisoras, setListaEmisoras] = useState<any>([]);
    const [postSuscrito, setPostSuscrito] = useState<any>([]);
    const [checkGuardarTodo, setCheckGuardarTodo] = useState(false);
    const [guardarResumen, setGuardarResumen] = useState(false);
    const [guardarIndividual, setGuardarIndividual] = useState(false);
    const [listaEmisorasSearch, setListaEmisorasSearch] = useState<any>([]);
    const [guardarPutResumen, setGuardarPutResumen] = useState(false);

    // Manejo de errores de get y post
    const [alertVAShow, setAlertVAShow] = useState(false);
    const [messageVAAlert, setMessageVAAlert] = useState("");
    const [alertResumenShow, setAlertResumenShow] = useState(false);
    const [messageResumenAlert, setMessageResumenAlert] = useState("");
    const [alertPostVAShow, setAlertPostVAShow] = useState(false);
    const [messagePostVAAlert, setMessagePostVAAlert] = useState("");
    const [alertPostResumenShow, setAlertPostResumenShow] = useState(false);
    const [messagePostResumenAlert, setMessagePostResumenAlert] = useState("");
    const [errorConfigVA, setErrorConfigVA] = useState(false);
    const [errorResumen, setErrorResumen] = useState(false);

    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ready, setReady] = useState(false);

    const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);

    const sendCtaCtoDispatch = (data: string) => {
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const sendParamsDispatch = (data: string[]) => {
        if(paramsDispatch === data){
            return;
        }
        setParamsDispatch(data);
    };

    useEffect(() => {
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO:any = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                    sendCtaCtoDispatch(cuentaLO);
                    sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO.toString() ]);

                    let message = "analisissuscripcion";
                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    let a = { message, params }
                    dispatch(getConfigVARequest(a));

                    message = "resumenmercado";
                    params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    a = { message, params }
                    dispatch(getResumenMercadoRequest(a));

                    // Reiniciar estados
                    setAlertVAShow(false);
                    setMessageVAAlert("");
                    setAlertResumenShow(false);
                    setMessageResumenAlert("");
                    setAlertPostVAShow(false);
                    setMessagePostVAAlert("");
                    setAlertPostResumenShow(false);
                    setMessagePostResumenAlert("");
                    setErrorConfigVA(false);
                    setErrorResumen(false);

                    if(catalogoEmisorasRespuesta != undefined){
                        if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0){
                                //el catalogo de emisoras no ha sido consultado
                                //llamar dispatch para el catalogo de emisoras
                                let message = "catalogo/emisora/catalogo";
                                dispatch(getCatalogoEmisorasRequest({message}));
                            }
                        }
                    }

                    setReady(!ready);

                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en issuerprofile, lo mandamos al login");
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

    useEffect(() => {
        if(ready){
            if(!configVA.loading && configVA.ierror === 0){
                setMessageVAAlert("");
                setAlertVAShow(false);
                setErrorConfigVA(false);
                
                let arraySubs = {...suscrito};
                let aSuscrito: any = [];
                let nuevo;

                configVA.economia.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });
                configVA.mesaAnalisis.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });
                configVA.fundamental.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });
                configVA.internacional.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });
                configVA.rentaFija.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });
                configVA.tecnico.map((a) => {
                    arraySubs[a.idtipo] = a.suscrito;
                    nuevo = {
                        "idtipo": a.idtipo,
                        "suscrito": a.suscrito
                    }

                    aSuscrito.push(nuevo);
                });

                setSuscrito(arraySubs);
                setOriginalSuscrito(arraySubs);
                setPostSuscrito(aSuscrito);
                setOriginalPostSuscrito(aSuscrito);
            }
            else if(!configVA.loading && configVA.ierror !== 0){
                setMessageVAAlert(configVA.cerror);
                setAlertVAShow(true);
                setErrorConfigVA(true);
            }
        }
        
    },[configVA.loading]);

    useEffect(() => {
        if(ready){
            if(!getResumenMercado.loading && getResumenMercado.ierror === 0){
                setMessageResumenAlert("");
                setAlertResumenShow(false);
                setErrorResumen(false);
                setCheckResumen(true);
                
                if(getResumenMercado.tdsEmisoras.length !== 0){
                    setEmisoras(true);

                    let sortEmisoras = getResumenMercado.tdsEmisoras.sort((e1, e2) => (e1.posicion > e2.posicion) ? 1 : -1);
                    setListaEmisoras(sortEmisoras);

                    let nuevaLista = sortEmisoras.map((e) => {
                        return (e["emisora"] + "." + e["serie"]).toUpperCase();
                    });

                    setListaEmisorasSearch(nuevaLista);
                }
                else{
                    setEmisoras(false);
                    setListaEmisoras([]);
                    setListaEmisorasSearch([]);

                }
                if(getResumenMercado.tdsConfiguracion[0].posicion === "NO"){
                    setPosicion(false);
                }
                else{
                    setPosicion(true);
                }
                if(getResumenMercado.tdsConfiguracion[0].horario === "Cierre"){
                    setIdHorario(getResumenMercado.tdsConfiguracion[0].horario);
                    setHorario("Al cierre");
                }
                else{
                    setIdHorario(getResumenMercado.tdsConfiguracion[0].horario);
                    setHorario(getResumenMercado.tdsConfiguracion[0].horario);
                }
                setIdFrecuencia(getResumenMercado.tdsConfiguracion[0].frecuencia);
                setFrecuencia(getResumenMercado.tdsConfiguracion[0].frecuencia);
            }
            else if(!getResumenMercado.loading && getResumenMercado.ierror !== 0){
                setMessageResumenAlert(getResumenMercado.cerror);
                setAlertResumenShow(true);
                setErrorResumen(true);
            }
        }
        
    },[getResumenMercado.loading]);

    useEffect(() => {
        if(ready){
            if(!postConfigVA.loading && postConfigVA.response.ierror !== 0){
                // Error en la api 
                console.log("Entra al if");
                console.log(postConfigVA);
                setMessagePostVAAlert(postConfigVA.response.cerror);
                setAlertPostVAShow(true);
                setPostSuscrito(originalPostSuscrito);
                setSuscrito(originalSuscrito);
                setGuardarIndividual(false);
            }
            else if(!postConfigVA.loading && postConfigVA.response.ierror === 0){
                setMessagePostVAAlert("");
                setAlertPostVAShow(false);
                setGuardarIndividual(false);
            }
        }
        
    },[postConfigVA.loading]);

    useEffect(() => {
        if(ready){
            if(!postAllConfigVA.loading && postAllConfigVA.response.ierror !== 0){
                // Error en la api
                setMessagePostVAAlert(postAllConfigVA.response.cerror);
                setAlertPostVAShow(true);
                setCheckGuardarTodo(false);
                setSuscrito(originalSuscrito);
            }
            else if(!postAllConfigVA.loading && postAllConfigVA.response.ierror === 0){
                setCheckGuardarTodo(false);
                setMessagePostVAAlert("");
                setAlertPostVAShow(false);
            }
        }
        
    },[postAllConfigVA.loading]);

    useEffect(() => {
        if(ready){
            if(!postResumenMercado.loading && postResumenMercado.response.ierror !== 0){
                // Error en la api
                setMessagePostResumenAlert(postResumenMercado.response.cerror);
                setAlertPostResumenShow(true);
                setGuardarResumen(false);
            }
            else if(!postResumenMercado.loading && postResumenMercado.response.ierror === 0){
                setGuardarResumen(false);
                setMessagePostResumenAlert("");
                setAlertPostResumenShow(false);
            }
        }
        
    },[postResumenMercado.loading]);

    useEffect(() => {
        if(catalogoEmisorasRespuesta != undefined){
            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0){
                    //el catalogo ya tiene emisoras en su lista
                    const catEmisorasSorted = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
                    sendListaCatEmisoras(catEmisorasSorted);
                }
            } 
        }
    }, [catalogoEmisorasRespuesta.loading, catalogoEmisorasRespuesta.message]);

    useEffect(() => {
        if(JSON.stringify(suscrito) !== JSON.stringify(originalSuscrito) && !checkGuardarTodo){
            setGuardarIndividual(true);
        }
        else{
            setGuardarIndividual(false);
        }

        if(suscrito[13] && suscrito[17] && suscrito[49] && suscrito[68] && suscrito[118]){
            setCheckMesaAnalisis(true);
        }
        if(suscrito[5] && suscrito[117]){
            setCheckEconomia(true);
        }
        if(suscrito[8] && suscrito[9] && suscrito[10] && suscrito[11] && suscrito[23] && suscrito[32] && suscrito[46] && suscrito[67] && suscrito[108]){
            setCheckRentaVariable(true);
        }
        if(suscrito[8] && suscrito[9] && suscrito[10] && suscrito[11] && suscrito[32] && suscrito[46] && suscrito[67]){
            setCheckFundamental(true);
        }
        if(suscrito[23] && suscrito[108]){
            setCheckTecnico(true);
        }
    },[suscrito]);

    useEffect(() => {
        if(ready && !putServicio.loading){
            if(putServicio.response.ierror === 0){
                setGuardarPutResumen(false);
                
                let message = "resumenmercado";
                let params = paramsDispatch;
                let a = { message, params }
                dispatch(getResumenMercadoRequest(a));
            }
            else{
                setMessageVAAlert(configVA.cerror);
                setAlertVAShow(true);
                setErrorConfigVA(true);
            }
        }
    },[putServicio.loading]);

    const sendChecked = (data: boolean, id: number, tipo: string) => {
        setSuscrito({...suscrito, [id] : data });

        let index = postSuscrito.findIndex(s => s["idtipo"] === id);

        let nuevoSus = [...postSuscrito];

        if(checkGuardarTodo){
            setCheckGuardarTodo(false);
            nuevoSus = nuevoSus.map((s) => {
                if(s["idtipo"] === id){
                    return {
                        "idtipo": id,
                        "suscrito": data
                    };
                }
                else{
                    return {
                        "idtipo": s["idtipo"],
                        "suscrito": checkTodo
                    };
                }
            });
            
            setPostSuscrito(nuevoSus);
        }
        else{
            nuevoSus[index]["suscrito"] = data;
            setPostSuscrito(nuevoSus);
        }
    }

    const sendCheckMesaAnalisis = (data: boolean) => {
        setCheckMesaAnalisis(data);

        let updateA = [13, 17, 49, 68, 118];
        let newPost = [...postSuscrito];
        newPost = newPost.filter(s => !updateA.includes(s["idtipo"]));

        updateA.map((n) => {
            let nuevo = {
                "idtipo": n,
                "suscrito": data
            }

            newPost.push(nuevo);
        });

        setPostSuscrito(newPost);
        setSuscrito({...suscrito, 13 : data, 17: data, 49 : data, 68 : data, 118 : data });
    }

    const sendCheckEconomia = (data: boolean) => {
        setCheckEconomia(data);
        
        let updateA = [5, 117];
        let newPost = [...postSuscrito];
        newPost = newPost.filter(s => !updateA.includes(s["idtipo"]));
        
        updateA.map((n) => {
            let nuevo = {
                "idtipo": n,
                "suscrito": data
            }

            newPost.push(nuevo);
        });

        setPostSuscrito(newPost);
        setSuscrito({...suscrito, 5 : data, 117 : data });
    }

    const sendCheckRentaVariable = (data: boolean) => {
        setCheckRentaVariable(data);
        setCheckFundamental(data);
        setCheckTecnico(data);

        let updateA = [67, 8, 9, 10, 11, 32, 46, 23, 108];
        let newPost = [...postSuscrito];
        newPost = newPost.filter(s => !updateA.includes(s["idtipo"]));
        
        updateA.map((n) => {
            let nuevo = {
                "idtipo": n,
                "suscrito": data
            }

            newPost.push(nuevo);
        });

        setPostSuscrito(newPost);
        setSuscrito({...suscrito, 67 : data, 8 : data, 9 : data, 10 : data, 11 : data, 32 : data, 46 : data, 23 : data, 108 : data });
    }

    const sendCheckFundamental = (data: boolean) => {
        setCheckFundamental(data);

        let updateA = [67, 8, 9, 10, 11, 32, 46];
        let newPost = [...postSuscrito];
        newPost = newPost.filter(s => !updateA.includes(s["idtipo"]));
        
        updateA.map((n) => {
            let nuevo = {
                "idtipo": n,
                "suscrito": data
            }

            newPost.push(nuevo);
        });

        setPostSuscrito(newPost);
        setSuscrito({...suscrito, 67 : data, 8 : data, 9 : data, 10 : data, 11 : data, 32 : data, 46 : data });
    }

    const sendCheckTecnico = (data: boolean) => {
        setCheckTecnico(data);

        let updateA = [23, 108];
        let newPost = [...postSuscrito];
        newPost = newPost.filter(s => !updateA.includes(s["idtipo"]));
        
        updateA.map((n) => {
            let nuevo = {
                "idtipo": n,
                "suscrito": data
            }

            newPost.push(nuevo);
        });

        setPostSuscrito(newPost);
        setSuscrito({...suscrito, 23 : data, 108 : data });
    }

    const sendCheckTodo = (data: boolean) => {
        setCheckGuardarTodo(true);
        setCheckTodo(data);
        setCheckTecnico(data);
        setCheckMesaAnalisis(data);
        setCheckEconomia(data);
        setCheckFundamental(data);
        setCheckRentaVariable(data);

        setSuscrito({...suscrito, 67 : data, 68 : data, 118 : data, 117 : data, 108 : data, 8 : data, 9 : data, 10 : data, 11 : data, 32 : data, 46 : data, 23 : data, 107 : data, 19 : data, 5 : data, 13 : data, 17: data, 49 : data,  });
    }

    const deleteEmisora = (index: number) => {
        sendGuardarResumen(true);
        let nuevaLista = [...listaEmisoras];
        nuevaLista.splice(index, 1);

        nuevaLista = nuevaLista.map((e) => {
            return (e["emisora"] + "." + e["serie"]).toUpperCase();
        });

        setListaEmisorasSearch(nuevaLista);
        setListaEmisoras([...listaEmisoras.slice(0, index), ...listaEmisoras.slice(index + 1)]);
    }

    const guardar = () => {
        // Llamada a post
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            if(checkGuardarTodo){
                let message = "analisissuscripcion?suscripcion=" + checkTodo;            
                let params = paramsDispatch;
                
                let res = { message, params }
                dispatch(postAllConfigVARequest(res));
            }
            if(guardarIndividual){
                let message = "analisissuscripcion";            
                let params = paramsDispatch;
                let data = postSuscrito;
                
                let res = { message, params, data }
                dispatch(postConfigVARequest(res));
            }
            if(guardarPutResumen){
                let message = "servicios?idservicio=100&canalP=100&activo=" + checkResumen;            
                let params = paramsDispatch;
                let res = { message, params };
                
                dispatch(putServicioRequest(res));
            }
            if(guardarResumen && checkResumen){
                let message = "resumenmercado/actualiza";            
                let params = paramsDispatch;

                let p;

                if(posicion){
                    p = "SI";
                }
                else{
                    p = "NO";
                }

                let l;

                if(emisoras){
                    l = listaEmisoras;
                }
                else{
                    l = [];
                }

                let data = {
                    "tdsConfiguracion": [{
                        "frecuencia": idFrecuencia,
                        "horario": idHorario,
                        "posicion": p
                    }],
                    "tdsEmisoras": l
                };
                
                let res = { message, params, data }
                dispatch(postResumenMercadoRequest(res));
            }

            setCheckGuardarTodo(false);
            setGuardarIndividual(false);
            setGuardarPutResumen(false);
            setGuardarResumen(false);
        }
    }

    const sendEmisora = (emisora: string, tipo: string) => {
        sendGuardarResumen(true);
        let listaSearch = [...listaEmisorasSearch];
        let lista = [...listaEmisoras];

        if(tipo === "agregar"){
            listaSearch.push(emisora);
            setListaEmisorasSearch(listaSearch);

            let e = emisora.split(".");

            let nueva = {
                "posicion": lista.length + 1,
                "emisora": e[0],
                "serie": e[1],
            }

            lista.push(nueva);
            setListaEmisoras(lista);
        }
        else{
            let index = listaSearch.indexOf(emisora);
            listaSearch.splice(index, 1);
            setListaEmisorasSearch(listaSearch);

            let emi = emisora.split(".");
            
            lista = lista.filter((e) => (e.emisora !== emi[0] && e.serie !== emi[1]) );
            setListaEmisoras(lista);
        }
    }

    const sendListaCatEmisoras = (data: Emisora[]) => {
        if(listaCatEmisoras === data){
          return;
        }
        setListaCatEmisoras(data);
    };

    const sendGuardarResumen = (data: boolean) => {
        if(guardarResumen === data){
          return;
        }
        setGuardarResumen(data);
    };

    const sendCheckResumen = (data: boolean) => {
        if(checkResumen === data){
            return;
          }
        setCheckResumen(data);
        setGuardarPutResumen(true);
    }

    const searchDataObjectAppbar: DataSearchAppbar[] = [
        {
            id: "searchConfigVA",
            title: "Buscar una emisora",
            optionsEmisoras: listaCatEmisoras,
            noMatch: "No se encontró información",
            placeholder: "Buscar una emisora",
        },
      ];
    
    let childrenContentIzquierda = (
        <>
            <MenuPerfil />
        </>
    );

    let childrenContentPrincipal = (
        <>
            <div className="content">
            { configVA.loading || errorConfigVA ? 
                <div className='section my-4'>
                    <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                        <div className="title">
                            <h2 className="font-medium text-lg">Mesa de Análisis</h2>
                        </div>
                        <div className=''>
                        {
                            !guardarResumen && !guardarPutResumen ? 
                                <button disabled={true} className="bg-gray-350 py-1 px-3 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                    Guardar cambios
                                </button>
                            :
                                <button disabled={false} className="bg-red-600 py-1 px-3 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={guardar}>
                                    Guardar cambios
                                </button>
                        }
                        </div>
                    </div>
                    { configVA.loading && <Loading /> }
                    { alertVAShow && <Alert message={messageVAAlert} isOpen={alertVAShow} sendIsOpen={(open) => setAlertVAShow(open)} /> }
                </div>
                :
                <div>
                    <div className="section">
                        <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                            <div className="title w-1/3">
                                <h2 className="font-medium text-xl">Mesa de análisis</h2>
                            </div>
                            <div className="flex w-2/3">
                                <div className="flex flex-grow items-center ">
                                    <CustomMUISwitch checked={checkTodo} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckTodo(nuevoIsChecked)} 
                                    />
                                    <div className="text-sm text-gray-400 ml-3">Seleccionar todo</div>
                                </div>
                                <div className="flex flex-grow items-center ">
                                    <CustomMUISwitch checked={checkMesaAnalisis} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckMesaAnalisis(nuevoIsChecked)} 
                                    />
                                    <div className="text-sm text-gray-400 ml-3">Seleccionar sección</div>
                                </div>
                                <div className='flex-grow'>
                                    {
                                        !guardarIndividual && !checkGuardarTodo && !guardarResumen ? 
                                            <button disabled={true} className="bg-gray-350 py-1 px-3 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Guardar cambios
                                            </button>
                                        :
                                            <button disabled={false} className="bg-red-600 py-1 px-3 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={guardar}>
                                                Guardar cambios
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <Alert message={messagePostVAAlert} isOpen={alertPostVAShow} sendIsOpen={(open) => setAlertPostVAShow(open)} />
                        <div className="itmes ">
                            {configVA.mesaAnalisis.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "mesaAnalisis")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="section">
                        <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                            <div className="title w-2/3">
                                <h2 className="font-medium text-xl">Economía</h2>
                            </div>
                            <div className="options flex w-1/3">
                                <div className="flex items-center">
                                    <CustomMUISwitch checked={checkEconomia} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckEconomia(nuevoIsChecked)} 
                                    />
                                    <div className="text-sm text-gray-400 ml-3">Seleccionar sección</div>
                                </div>
                            </div>
                        </div>
                        <div className="itmes ">
                            {configVA.economia.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "economia")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="section">
                        <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                            <div className="title w-2/3">
                                <h2 className="font-medium text-xl">Renta Variable</h2>
                            </div>
                            <div className="options flex w-1/3">
                                <div className="flex items-center">
                                    <CustomMUISwitch checked={checkRentaVariable} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckRentaVariable(nuevoIsChecked)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="itmes ">
                            <div className="item-head-selector flex mb-2 items-start">
                                <div className="desc-item w-2/3">
                                    <p className="text-sm mb-2 font-bold">Análisis Fundamental</p>
                                </div>
                                <div className="flex items-center w-1/3">
                                    <CustomMUISwitch checked={checkFundamental} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckFundamental(nuevoIsChecked)} 
                                    />
                                    <div>
                                        <p className="text-sm text-gray-400 ml-3">Seleccionar sección</p>
                                    </div>
                                </div>
                            </div>
                            {configVA.fundamental.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "fundamental")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="item-head-selector flex mb-2 items-start">
                                <div className="desc-item w-2/3">
                                    <p className="text-sm mb-2 font-bold">Análisis Técnico</p>
                                </div>
                                <div className="flex items-center w-1/3">
                                    <CustomMUISwitch checked={checkTecnico} 
                                        disabled={false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendCheckTecnico(nuevoIsChecked)} 
                                    />
                                    <div>
                                        <p className="text-sm text-gray-400 ml-3">Seleccionar sección</p>
                                    </div>
                                </div>
                            </div>
                            {configVA.tecnico.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "tecnico")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                    
                    <div className="section">
                        <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                            <div className="title">
                                <h2 className="font-medium text-xl">Internacional</h2>
                            </div>
                        </div>
                        <div className="itmes ">
                            {configVA.internacional.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "internacional")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="section">
                        <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                            <div className="title">
                                <h2 className="font-medium text-xl">Renta Fija</h2>
                            </div>
                        </div>
                        <div className="itmes ">
                            {configVA.rentaFija.map((a) => {
                                return(
                                    <div className="item flex mb-4 items-start">
                                        <div className="desc-item w-2/3">
                                            <p className="text-sm mb-2">{parse(a["descripcion"])}</p>
                                            <p className="text-xs text-gray-400">{a["desc"]}</p>
                                        </div>
                                        <div className="mr-2">
                                            <CustomMUISwitch checked={suscrito[a["idtipo"]] || false} 
                                                disabled={false}
                                                sendChecked={(nuevoIsChecked: boolean) => sendChecked(nuevoIsChecked, a["idtipo"], "rentaFija")} 
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
            { getResumenMercado.loading || errorResumen ? 
                <div className='section'>
                    <div className="header flex items-center border-b border-gray-300 mb-4 pb-2">
                        <div className="title w-2/3">
                            <h2 className="font-medium text-lg">Resumen de Mercado</h2>
                        </div>
                        <CustomMUISwitch checked={checkResumen} 
                            disabled={false}
                            sendChecked={(nuevoIsChecked: boolean) => sendCheckResumen(nuevoIsChecked)} 
                        />
                    </div>
                    { getResumenMercado.loading && <Loading /> }
                    { alertResumenShow && <Alert message={messageResumenAlert} isOpen={alertResumenShow} sendIsOpen={(open) => setAlertResumenShow(open)} /> } 
                </div>
                :
                    <div className="section">
                        <div className="header flex items-center border-b border-gray-300 mb-4 mt-16 pb-2">
                            <div className="title w-2/3">
                                <h2 className="font-medium text-lg">Resumen de Mercado</h2>
                            </div>
                            <CustomMUISwitch checked={checkResumen} 
                                disabled={false}
                                sendChecked={(nuevoIsChecked: boolean) => sendCheckResumen(nuevoIsChecked)} 
                            />
                        </div>
                        <Alert message={messagePostResumenAlert} isOpen={alertPostResumenShow} sendIsOpen={(open) => setAlertPostResumenShow(open)} />
                        <div className="items">
                            <div className="flex w-2/3">
                                <div className='flex flex-grow w-1/3 items-center'>
                                    <p className="text-sm mr-2">Frecuencia</p>
                                    <div className='w-full mx-2'>
                                        <Dropdown 
                                            sendOption={(f) => {setFrecuencia(f); sendGuardarResumen(true);}} 
                                            dropdownData={DropdownDataFrecuencia} 
                                            initialOption={frecuencia} 
                                            side={false}
                                            sendId={(idFrecuencia) => setIdFrecuencia(idFrecuencia)}
                                            fondosFamilia={false}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-grow w-1/3 items-center mx-2'>
                                    <p className="text-sm mr-2">Horario</p>
                                    <div className='w-full mx-2'>
                                        <Dropdown 
                                            sendOption={(h) => {setHorario(h); sendGuardarResumen(true);}} 
                                            dropdownData={DropdownDataHorario} 
                                            initialOption={horario} 
                                            side={false}
                                            sendId={(idHorario) => setIdHorario(idHorario)}
                                            fondosFamilia={false} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-sm flex items-start">
                                <div className="mr-6">
                                    <p>Contenido</p>
                                </div>
                                <div>
                                    <label className="flex items-center mb-4">
                                        <input type="checkbox" className="form-checkbox text-red-600 border rounded" checked={posicion} onClick={() => {setPosicion(!posicion); sendGuardarResumen(true);}} />
                                        <span className='mx-2'>Incluir información sobre acciones que componen su posición</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox text-red-600 border rounded" checked={emisoras} onClick={() => {setEmisoras(!emisoras); sendGuardarResumen(true);}} />
                                        <span className='mx-2'>Incluir acciones específicas</span>
                                    </label>
                                </div>
                            </div>
                            { emisoras ? 
                                <div>
                                    <div className='w-1/3 mt-3'>
                                        <SearchConfigVA searchData={searchDataObjectAppbar} listaEmisoras={listaEmisorasSearch} sendEmisora={(emisora, tipo) => sendEmisora(emisora, tipo)} />
                                    </div>
                                    <div className="my-4 text-sm items-start">
                                        <p>Acciones Agregadas</p>
                                        <div className='pl-20 my-4'>
                                            {
                                                listaEmisoras.map((e, index) => {
                                                    return(
                                                        <div className='flex justify-between sm:w-1/3 w-full'>
                                                            <div className=''>{e["emisora"] + "." + e["serie"]}</div>
                                                            <BsTrash className='text-base cursor-pointer' onClick={() => deleteEmisora(index)} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    );

    return(
        <PageLayout
            childrenContentIzquierda={childrenContentIzquierda}
            childrenContentPrincipal={childrenContentPrincipal}
            titulo="Vector Análisis"
        />
    );
}


//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        configVA: store.configVA,
        getResumenMercado: store.getResumenMercado,
        postConfigVA: store.postConfigVA,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
        postAllConfigVA: store.postAllConfigVA,
        postResumenMercado: store.postResumenMercado,
        putServicio: store.putServicio,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getConfigVARequest: () => dispatch(getConfigVARequest),
        getResumenMercadoRequest: () => dispatch(getResumenMercadoRequest),
        getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
        postConfigVARequest: () => dispatch(postConfigVARequest),
        postAllConfigVARequest:() => dispatch(postAllConfigVARequest),
        postResumenMercadoRequest: () => dispatch(postResumenMercadoRequest),
        putServicioRequest: () => dispatch(putServicioRequest),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VectorAnalisis);