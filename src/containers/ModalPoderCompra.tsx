import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdInfoOutline, MdClose } from "react-icons/md";

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getPoderCompraRequest } from '../actions/poderCompraAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { PoderCompraStatus } from '../types/PoderCompraType';
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';

interface ModalPoderCompraProps {
    loginObject?: LoginObjectState;
    poderCompra: PoderCompraStatus;
    poderCompraVal: string;
    show: boolean;

    //donde vamos a poner el componente
    ubicacionComponente?: "RETIRO" | "OPERACIONES";
}

const ModalPoderCompra: React.FC<ModalPoderCompraProps> = ({ loginObject, poderCompra, poderCompraVal, show, ubicacionComponente = "OPERACIONES" }) => {

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
                
                        if(poderCompra != undefined){
                            if(poderCompra.message === ""){
                                //no se ha hecho la llamada al poder de compra, entonces hay que hacer el dispatch
                                let message = "/consulta/saldocapcpaflujos?cuenta=" + cuentaLO;
                                let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()]
                                let a = { message, params }
                                dispatch(getPoderCompraRequest(a));
                            }
                        }
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalpodercompra, lo mandamos al login");
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
            console.log("usuario no loggeado en modalpodercompra, lo mandamos al login");
            history.push("/");
        }
    },[]);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            {
                ubicacionComponente === "RETIRO" ? 
                    <p className="cursor-pointer hover:underline" onClick={toggle}>
                        {poderCompraVal}
                    </p>
                :
                    <div className="text-red-600 text-center">
                        {
                            show ? 
                                <p className="text-center cursor-pointer hover:underline hover:text-lg" onClick={toggle}>Poder de Compra</p>
                            :
                                <p className="text-center">Poder de Compra</p>
                        }
                        <p className="font-bold text-center">{poderCompraVal}</p>
                    </div>
            }
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    <div>
                        <div className='flex justify-between items-center'>
                            <p className="font-bold text-lg my-2">Poder de Compra</p>
                            <MdClose className='text-gray-500 cursor-pointer' onClick={toggle} />
                        </div>
                        <div className="flex font-semibold border-b border-gray-300 pb-2">
                            <div className="w-3/4 px-1">
                                <span>Descripción</span>
                            </div>
                            <div className="w-1/4 px-1">
                                <span>Monto</span>
                            </div>
                        </div>
                        {
                            poderCompra.tdsDetalleFlujos.map((p : any) => {
                                return (
                                    <div key={p.Descripcion} className="flex border-b border-gray-300 py-2">
                                        <div className="w-3/4 px-1 text-xs">
                                            <span>{p["Descripcion"]}</span>
                                        </div>
                                        <div className="w-1/4 px-1 text-sm text-right">
                                            <p>{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(p["Monto"])}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <p className="text-xs text-gray-500 pt-2">* Podrían corresponder a operaciones de acciones realizadas en días anteriores y que aún no se liquidan</p>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getPoderCompraRequest: () => dispatch(getPoderCompraRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        poderCompra: store.poderCompra,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPoderCompra);