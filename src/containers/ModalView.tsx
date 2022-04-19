import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { Button } from 'reactstrap';
import { MdModeEdit, MdClose } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

import { postEditOrdenRequest } from '../actions/EditOrdenAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { postCancelaOrdenRequest } from '../actions/postCancelaOrdenAction';

import { InfoEmisoraState } from '../types/InfoEmisoraTypes';
import { OrdenesStatus } from '../types/OrdenesTypes';
import { LoginObjectState } from '../types/LoginObjectTypes';

//State of the component
interface propsFromState {
    loginObject?: LoginObjectState;
    titleButton: string;
    titleLabel: string;
    type: string;
    ordenes?: OrdenesStatus;
    infoEmisoraResponse?: InfoEmisoraState;
    hora?: string;
    issuer: boolean
}

type AllProps = propsFromState;

const ModalView: React.FC<AllProps> = ({loginObject, titleButton, titleLabel, type, ordenes, infoEmisoraResponse, hora, issuer}) => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalview, lo mandamos al login");
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
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en modalview, lo mandamos al login");
            history.push("/");
        }
    },[]);
    

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [editar, setEditar] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const toggle = () => setModal(!show);

    let buttonStyle = "";
    if(type === "addList" || type === "ordenes"){
        buttonStyle = "bg-red-600 w-full p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600";
    } else {
        buttonStyle = "text-sm pl-4";
    }

    let found : any = "";
    let folio : any = "";

    if(issuer){
        found = infoEmisoraResponse?.infoEmisoraResponse.dsOrdenes.tdsOrdenesCapResponse.find(element => element.Hora == hora);
        folio = found?.folio;
    }
    else{
        found = ordenes?.tdsOrdenesCap.find(element => element.Hora == hora);
        folio = found?.folio;
    }

    let titulos2 = found?.titulos || "";
    let precio2 = found?.precio || "";
    let splited = precio2.split(" ");

    // console.log(found?.precio);

    const[titulos, setTitulos] = useState(Number(titulos2));
    const[precio, setPrecio] = useState(Number(splited[splited.length -1]));

    const sendTitulos = (e: any) => {
        const userInput = e.currentTarget.value;
        setTitulos(Number(userInput));
    }

    const sendPrice = (e: any) => {
        const userInput = e.currentTarget.value;
        setPrecio(Number(userInput));
    }

    const editarOrdenes = () => {
        setModal(false);

        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                        
                        let message = "tradecap/modifica?cuenta=" + cuentaLO.toString() + "&folio=" + found?.folio + "&titulos=" + titulos + "&precio=" + precio;
                        let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                        let a = { message, params };
                        
                        dispatch(postEditOrdenRequest(a));
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalview, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en modalview, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en modalview, lo mandamos al login");
            history.push("/");
        }
    };

    const closeModal = () => {
        setModal(false);

        if(editar){
            setTitulos(Number(titulos2));
            setPrecio(Number(splited[splited.length -1]));
        }
    };

    const cancelOrden = () => {
        setModal2(false);

        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                        
                        let message = "tradecap/cancela?cuenta=" + cuentaLO.toString();
                        let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                        let data = [
                            { "folio" : found?.folio }
                        ]

                        let a = { message, params, data }   
                        dispatch(postCancelaOrdenRequest(a));
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalview, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en modalview, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en modalview, lo mandamos al login");
            history.push("/");
        }
    };

    return (
        <div className="w-full">
            {
                type === "editar" ?
                <MdModeEdit className="text-gray-500 text-xl cursor-pointer hover:text-red-600"
                    data-toggle="toggle"
                    onClick={() => {setModal(true); setEditar(true)}}
                />
                : type === "delete" ?
                    <MdClose className="text-gray-500 text-xl cursor-pointer hover:text-red-600"
                        data-toggle="toggle"
                        onClick={() => {setModal2(true)}}
                    />
                :
                <button data-toggle="toggle" className={buttonStyle} onClick={() => {setModal(true); setEditar(false)}}>
                    {titleButton}
                </button>

            }
            <Modal 
                show={modal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="sm"
                //dialogClassName="modal-10w"
                aria-labelledby="example-custom-modal-styling-title"
                centered    
            >
                {(type === "ordenes" || type === "editar")?
                    <div>
                        <div className="py-4 px-10 text-center">
                            <div className="flex flex-row justify-end">
                                {
                                    editar ? ""
                                    : 
                                        <MdModeEdit className="text-gray-500 text-xl cursor-pointer hover:text-red-600"
                                            onClick={() => setEditar(true)}
                                        />

                                }
                                <MdClose className="text-gray-500 text-xl cursor-pointer hover:text-red-600"
                                    onClick={closeModal}
                                />
                            </div>
                            <p className="font-bold uppercase text-md">{found?.emisora}</p>
                            <div className="py-2">
                                <p className="text-sm">Último Precio ${found?.UltimoPrecio}</p>
                            </div>
                        </div>
                        <div className="flex flex-col pt-2 pb-8 px-8">
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Folio</p>
                                <p className="text-sm">{found?.folio}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Instrucción</p>
                                <p className="text-sm">{found?.Instruccion}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Estatus</p>
                                <p className="text-sm">{found?.estatusDesc}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Origen</p>
                                <p className="text-sm">{found?.origen}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Tipo</p>
                                <p className="text-sm">{found?.tipoorden}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Validez</p>
                                <p className="text-sm">{found?.Validez}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Precio</p>
                                {
                                    editar ? <input type="number" className="text-sm flex justify-end text-right w-5/12 border-1 border-gray-300 bg-gray-200 rounded px-2" value={precio} onChange={sendPrice} /> : <p className="text-sm flex justify-end">{found?.precio}</p>
                                }
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Títulos</p>
                                {
                                    editar ? <input type="number" className="text-sm flex justify-end text-right w-5/12 border-1 border-gray-300 bg-gray-200 rounded px-2" value={titulos} onChange={sendTitulos} /> : <p className="text-sm flex justify-end">{found?.titulos}</p>
                                }
                            </div>
                            <hr className="solid bg-gray-500" />
                            <div className=" flex justify-between py-1">
                                <p className="text-sm text-gray-400">Monto</p>
                                <p className="text-sm">{found?.monto}</p>
                            </div>
                            <hr className="solid bg-gray-500" />
                        </div>
                        <div className=" w-full pb-6 flex justify-center">
                            {
                                editar ? 
                                <button type="submit" 
                                className="bg-red-600 w-1/2 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                onClick={editarOrdenes}
                                >
                                    Guardar
                                </button> :
                                <button type="submit" 
                                className="bg-red-600 w-1/2 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                onClick={() => { setModal(false); setModal2(true); }}
                                >
                                    Cancelar Orden
                                </button>
                            }
                        </div>
                    </div>
                :
                    <div>
                        <Modal.Header className="text-gray-700 font-bold" data-toggle={toggle}>{titleLabel}</Modal.Header>
                        {type === "addList" ? 
                        <Modal.Body>
                            <input
                                type="text"
                                className="relative w-full pl-4 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  pl-1 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm"
                                placeholder="Nombre de la lista"
                            />
                        </Modal.Body> : <div></div>
                        }
                        <Modal.Footer>
                            <Button tag="span" data-toggle="toggle" className="bg-white p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:text-red-600" onClick={() => {setModal(false)}}>Cancelar</Button>
                            <Button tag="span" data-toggle="toggle" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => {setModal(false)}}>Aceptar</Button>{' '}
                        </Modal.Footer>
                    </div>
                }
            </Modal>
            <Modal
                show={modal2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
                size="sm"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <div>
                    <div className="pt-8 px-10 text-center">
                        <p className="text-md font-bold">¿Eliminar orden?</p>
                    </div>
                    <div className="flex flex-row justify-center px-2 py-4">
                        <button type="submit" 
                        className="bg-gray-100 w-1/3 p-2 text-xs text-red-600 border-1 border-red-600 mx-2 rounded"
                            onClick={() => {setModal2(false)}}
                        >
                            Cancelar
                        </button>
                        <button type="submit" 
                        className="bg-red-600 w-1/3 p-2 text-xs text-gray-100 border-1 border-red-600 mx-2 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                            onClick={cancelOrden} >
                            Eliminar
                        </button>
                    </div>
                </div> 
            </Modal>
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        ordenes: store.ordenes,
        infoEmisoraResponse: store.infoEmisora,
    };
};

export default connect(mapStateToProps, null)(ModalView);