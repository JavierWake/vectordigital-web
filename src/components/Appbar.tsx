import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

//import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import type { AppBarData, Notification } from "../types/AppBar";

import { MdChat, MdFolderSpecial } from "react-icons/md";
import { NavLink } from "react-router-dom";
import getNameInitials from "../utils/getNameInitials";
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import ConsultasFloatMenu from "../containers/perfil/ConsultasFloatMenu";
import MiCuentaFloatMenu from "../containers/perfil/MiCuentaFloatMenu";

import { DataSearchAppbar, SearchAppbar } from "../containers/SearchAppbar";
import { CatalogoEmisorasState, Emisora } from "../types/GetCatalogoEmisotasType";
import { getCatalogoEmisorasRequest } from "../actions/getCatalogoEmisorasAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { RootState } from "../reducers/rootReducer";

interface propsFromState {
  loginObject: LoginObjectState;
  appBarData: AppBarData;
  catalogoEmisorasRespuesta?: CatalogoEmisorasState;
}

type AllProps = propsFromState; 

const Appbar: React.FC<AllProps> = ({ loginObject, appBarData, catalogoEmisorasRespuesta }) => {

  //HOOKS
  const { Icons, notifications } = appBarData;
  const [input, setInput] = useState("");
  const [initials, setInitials] = useState("");
  const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);

  const history = useHistory();

  /* este useEffect inicial revisa si el usuario está loggeado o no */
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
        
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
                  const iniciales: string = getNameInitials(loginObject.response.dsLogin.tdsLogin[0].nombre);
                  setInitials(iniciales);
                }
                else{
                  setInitials("ND");
                }
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en appbar, lo mandamos al login");
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

  const dispatch = useDispatch();

  const sendListaCatEmisoras = (data: Emisora[]) => {
    if(listaCatEmisoras === data){
      return;
   } 
    setListaCatEmisoras(data);
  };

  useEffect(() => {
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
  }, [dispatch]);


  useEffect(() => {
    if(catalogoEmisorasRespuesta != undefined){
      if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
        if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0){
          //el catalogo ya tiene emisoras en su lista
          sendListaCatEmisoras(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta);
        }
      }
    }
  }, [catalogoEmisorasRespuesta]);


  const searchDataObjectAppbar: DataSearchAppbar[] = [
    {
        id: "searchAppbar",
        title: "Buscar una emisora o lista",
        optionsEmisoras: listaCatEmisoras,
        noMatch: "No se encontró información",
        placeholder: "Buscar una emisora o lista",
    },
  ];

  return (
    <div className="sticky inset-y-0 flex z-40 justify-between items-center w-full pl-2 bg-white shadow-md">
      <div className="w-1/24">
        <NavLink to="/portafolio">
          <div className="h-7 w-7">
            {Icons.vector}
          </div>
        </NavLink>
      </div>
      

    
      
      {/*<form className="hidden md:flex md:flex-1 md:mr-14 md:items-center md:relative " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar una emisora, noticia o lista"
          className="w-full p-1 pl-8 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600"
          onChange={e => setInput(e.target.value)}
        />
      </form>*/}

      <div className="w-23/24 flex flex-row">
        <div className="w-18/24 px-2 pb-1flex flex-col justify-between ">
          <div>
            {/* className="md:flex md:flex-1 md:mr-14 md:items-center md:relative" */}
            <SearchAppbar searchData={searchDataObjectAppbar} side={true} />
          </div>
        </div>

        <div className="w-6/24 flex flex-row justify-between items-center">
          <div className="pl-2 w-8/24 flex flex-col">
            <NavLink to="/mensajes">
              <div className="mensajesBtn px-2 w-full flex flex-col justify-between items-center p-1">
                <MdChat className="text-red-600 text-3xl pb-1" />
                <p className="text-red-600 text-xs">Mensajes</p>
              </div>
            </NavLink>
          </div>
          <div className="px-2 w-8/24 flex flex-col border-r border-gray-300">
            <ConsultasFloatMenu />
          </div>
          <div className="pl-2 w-8/24 flex flex-col">
            <MiCuentaFloatMenu initials={initials}/>
          </div>
        </div>
      </div>
    </div>
  );
};

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
      loginObject: store.loginObjectState, 
      catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      getEmisorasSimilaresRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);