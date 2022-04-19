import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { NavLink } from "react-router-dom";

import {
    MdExitToApp,
    MdZoomIn,
    MdNotifications,
    MdClose,
    MdPerson
} from "react-icons/md";

import { FaBullhorn } from "react-icons/fa";
import '../../styles/activeClass.css';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { RootState } from '../../reducers/rootReducer';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';
import { Message } from '@material-ui/icons';
import { postLogoutRequest } from '../../actions/postLogoutAction';
import rootReducer from '../../reducers/rootReducer';
import { POST_LOGOUT_REQUEST } from '../../actions/actionTypes';
import { getListReset } from "../../actions/listAction";
import { getListIssuerReset } from "../../actions/ListIssuerAction";
import { PostLogoutState } from '../../types/PostLogoutTypes';

interface propsFromState {
    loginObject?: LoginObjectState;
    logoutRespuesta?: PostLogoutState;
    initials: any;
}
  
type AllProps = propsFromState; 

const MiCuentaFloatMenu: React.FC<AllProps> = ({ loginObject, initials, logoutRespuesta }) => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [showMiCuentaMenu, setShowMiCuentaMenu] = React.useState(false);

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1 && loginObject.loading === false){
                //esta loggeado
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en micuentafloatmenu, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("loginobject undefined en micuentafloatmenu, lo mandamos al login");
            history.push("/");
        }
    },[]);

    useEffect(() => {
        //console.log("useEffect logoutRespuesta loginObject");
        //console.log(logoutRespuesta);
        //console.log(loginObject);
        if(loginObject !== undefined){
            if(loginObject.loading === false && loginObject.response.ierror !== (-1)){
                // ya esta limpio este estado,
                //hacemos reload
                //console.log("aqui hariamos reload");
                window && window.location.reload();
                //al hacer este reload, se ejecutara el componente de PrivateRoute, y al 
                //ver que esta vacio el estado de login, nos redirigira al login!! (es mi teoria)
            }
        }
    }, [loginObject?.response.ierror]);

    const handleLogout = () => {
        //console.log("handleLogout en float menu");

        if(loginObject !== undefined){
            let message = "logout/expiro=false";
            let params = [ "999",  loginObject.response.dsLogin.tdsLogin[0].cuentasesion.toString(), loginObject.response.dsLogin.tdsLogin[0].token, loginObject.response.dsLogin.tdsLogin[0].id.toString() ];

            //llamada al api de logout
            dispatch(postLogoutRequest({ message, params }));
            dispatch(getListReset({ hacerResetAInitialState: true }))
            dispatch(getListIssuerReset({ hacerResetAInitialState: true }))
            
        }
        
        //borrar obj de login del store
        //window && window.location.reload(); // hacer reload para borrar el store y esperamos que no se cicle
        dispatch(postLoginObjectLogout());
        //limpiamos todo el reducer
        //rootReducer(undefined, { type: POST_LOGOUT_REQUEST, payload: undefined });
        //history.push("/");
    };

    function useClickOutside(ref) {
        useEffect(() => {
            
            //aqui se da cuenta que dio click afuera
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowMiCuentaMenu(false)
                }
            }
    
            // se activa el event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // se desactiva el event listener
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };

    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef);

    return (
        <div ref={wrapperRef}>
            <button className="ml-1" onClick={() => setShowMiCuentaMenu(!showMiCuentaMenu)} >
              <div className="micuentaBtn px-2 w-full flex flex-col justify-between items-center p-1">
                <div className="rounded-full w-8 h-8 p-1 bg-red-300 m-1 shadow flex items-center justify-center">
                  <p className="text-red-600 text-center text-xs font-bold">{initials}</p>
                </div>
                <p className="text-red-600 text-xs">Mi cuenta</p>
              </div>
            </button>
            <div className={"absolute right-10 shadow-sm bg-white z-50 " + (showMiCuentaMenu ? "" : "hidden")} style={{ top: "66px", width: "309px" }} id="MiCuentaFloatMenu">
                <div className="pt-8 px-8">
                    <div className="w-full flex flex-row">
                        <div className="w-22/24">
                            <NavLink to="/perfil">
                                <p className="font-sans py-2 text-red-600 text-sm font-bold hover:text-red-600">Perfil</p>
                            </NavLink>
                            <NavLink to="/perfil"  activeClassName="selected">
                                <div className="flex items-center font-sans text-sm hover:text-yellow-600 ml-2 my-1">
                                    <MdPerson className="icon my-0 mr-3 " style={{ color: "#999", width: "25px" }} />Datos Personales 
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <ul>
                        <li className="mt-2 font-sans text-red-600 text-sm font-bold">Avisos</li>
                        <li className="ml-3 my-2">
                            <NavLink to="/notificaciones" activeClassName="selected">
                                <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                    <FaBullhorn className="icon my-0 mr-3 " style={{ color: "#999", width: "20px" }} />Notificaciones 
                                </div>
                            </NavLink>
                        </li>
                        <li className="ml-3 my-2">
                            <NavLink to="/perfil-alertas" activeClassName="selected">
                                <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                    <MdNotifications className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Alertas Emisora
                                </div>
                            </NavLink>
                        </li>
                        <li className="ml-3 my-2">
                            <NavLink to="/vector-analisis" activeClassName="selected">
                                <div className="flex items-center font-sans text-sm hover:text-yellow-600">
                                    <MdZoomIn className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} /> Vector Análisis
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <div className='pb-3 border-b border-gray-300' />
                </div>
                <div className="p-8 ml-3">
                    <a className="flex items-center cursor-pointer" onClick={handleLogout}>
                        <MdExitToApp className="icon my-0 mr-3" style={{ color: "#999", width: "24px" }} />
                        <span className="font-sans text-sm hover:text-yellow-600">Cerrar Sesión</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        logoutRespuesta: store.logoutRespuesta,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        postLogoutRequest: () => dispatch(postLogoutRequest(dispatch)),
        postLoginObjectLogout: () => dispatch(postLoginObjectLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiCuentaFloatMenu);