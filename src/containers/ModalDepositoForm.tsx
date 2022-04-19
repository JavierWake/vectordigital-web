import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { MdCheck, MdClose, MdContentCopy } from "react-icons/md";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { LoginObjectState } from '../types/LoginObjectTypes';
import useForm from '../customHooks/useForm';
import { postPosicionFolioRequest } from '../actions/posicionFolioAction';
import { GetDepositoBancosState } from '../types/GetDepositoBancosType';
import { getDepositoBancosRequest } from '../actions/getDepositoBancosAction';
import Loading from '../components/Loading';

interface ModalRetirarProps {
    loginObject?: LoginObjectState;
    depositoBancosRespuesta?: GetDepositoBancosState;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    params: string[];
    ctaCto: string;
}

const ModalDepositarForm: React.FC<ModalRetirarProps> = ({ params, ctaCto, depositoBancosRespuesta, modalOpen, setModalOpen }) => {

    //console.log("entro a modal depositar form");

    //return <div></div>;

    //HOOKS
    const [banco, setBanco] = useState("");
    const [cuentaClabe, setCuentaClabe] = useState("");
    const [textoCopiado, setTextoCopiado] = useState(false);

    const sendBanco = (data: string) => {
        if(banco === data){
            return;
        }
        setBanco(data);
    };

    const sendCuentaClabe = (data: string) => {
        if(cuentaClabe === data){
            return;
        }
        setCuentaClabe(data);
    };

    const sendTextoCopiado = (data: boolean, enTimeout?: boolean) => {
        if(enTimeout === true){
            setTextoCopiado(data);
            return;
        }
        if(textoCopiado === data){
            return;
        }
        setTextoCopiado(data);
    };
    
    const toggle = () => setModalOpen(!modalOpen);

    const dispatch = useDispatch();

    useEffect(() => {
        //(CORREGIDO) ESTE USEEFFECT SE CICLA
        /* revisar por que se cicla y corregirlo */
        //console.log("useEffect inicial modal retirar form");

        //SOLO HACEMOS LA LLAMADA CUANDO modalOpen==true
        if(modalOpen === true){
            if(params.length > 0 && ctaCto.length > 0){
                let message = "folio?posicion=5&codigo=0";
                let paramsPorMientras = params;
    
                //ESTA LINEA NO FUNCIONO -> paramsPorMientras[paramsPorMientras.length - 1] = "10200";//POR MIENTRAS LE ENVIAMOS EL ID=10200 PORQUE ES EL QUE FUNCIONA PARA APIS DE OPERACION
                
                let a = { message, params: paramsPorMientras };
    
                dispatch(postPosicionFolioRequest(a));
    
                message = "/teso/depositobancos?cuenta=" + ctaCto;
                a = { message, params: paramsPorMientras };
                dispatch(getDepositoBancosRequest(a)); // se hace el dispatch para sacar la cta clabe
            }
        }
    }, [params, ctaCto, modalOpen]);

    useEffect(() => {
        //console.log("deposito bancos respuesta useEffect");
        //console.log(depositoBancosRespuesta);
        if(depositoBancosRespuesta != undefined){
            if(depositoBancosRespuesta.message.length > 0 && depositoBancosRespuesta.loading === false){
                if(depositoBancosRespuesta.depositoBancosRespuesta != undefined){
                    if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito != undefined){
                        if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsTradeData.length > 0){
                            //hay datos en tds trade data
                            sendCuentaClabe(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsTradeData[0].clabe);
                        }
                        /*if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsBancos.length > 0){
                            //hay info en tds bancos
    
                        }
                        if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsBancosChequera.length > 0){
                            //hay info en tds bancos chequeras
    
                        }*/
                    }
                }
            }
        }
    }, [depositoBancosRespuesta?.message, depositoBancosRespuesta?.loading]);

    const copiarAClipboard = () => {
        //podemos copiar al clipboard
        //console.log("entro a copiar a clipboard");

        navigator.clipboard.writeText(cuentaClabe);

        sendTextoCopiado(true);

        //hacemos setTimeout para que se vuelva a poner el icono de copiar
        setTimeout(() => {
            sendTextoCopiado(false, true);
        }, 4000);
    };

    return (
        modalOpen === true ?
            <>
                <Modal isOpen={modalOpen} toggle={toggle}>
                    <ModalBody>
                        <div className="headerYClose w-full flex flex-row py-3">
                            <div className="titulo w-22/24">
                                <p className="my-1 font-bold text-center">Depósito</p>
                            </div>
                            <div className="tachita w-2/24 cursor-pointer" onClick={() => setModalOpen(false)}>
                                <MdClose className="text-gray-800 text-base text-right" />
                            </div>
                        </div>
                        {
                            depositoBancosRespuesta?.loading === true ?
                                <Loading />
                            :
                                <div className="bodyFormulario mx-3 p-1 flex flex-col">
                                    <div className="py-2 w-full">
                                        <p className="text-base text-gray-800 text-center">Registra la siguiente informacion en tu banca electrónica. Ahora puedes hacer depósitos en cualquier momento, los verás reflejados en máximo 10 minutos.</p>
                                    </div>
                                    <div className="bancoYCtaClabe pt-4 pb-2 w-full flex flex-row">
                                        <div className="banco w-8/24 pr-1">
                                            <p className="text-sm text-gray-400 py-1">Banco</p>
                                            <div className="border-1 border-gray-350 w-full rounded">
                                                <p className="text-base text-gray-350 p-2">Vector</p>
                                            </div>
                                        </div>
                                        <div className="clabe w-16/24 pl-1 pb-3">
                                            <p className="text-sm text-gray-400 py-1">Cuenta Clabe</p>
                                            <div className="border-1 border-gray-350 w-full rounded flex flex-row justify-between">
                                                <p className="text-base text-gray-350 p-2">{cuentaClabe}</p>
                                                <div onClick={() => copiarAClipboard()} className="cursor-pointer p-2">
                                                    {
                                                        textoCopiado === false ? 
                                                            <MdContentCopy className="text-lg text-gray-350 hover:text-red-600" />
                                                        :
                                                            <MdCheck className="text-lg text-bold text-green" />
                                                    }
                                                </div>
                                            </div>
                                            {
                                                textoCopiado === false ? 
                                                    <div className="py-1"></div>
                                                :
                                                    <p className="text-xs font-bold text-gray-350 pt-1">¡Cuenta clabe copiada al portapapeles!</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="btnAceptar flex flex-col w-full py-2">
                                        <button className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => setModalOpen(false)}>
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                        }
                    </ModalBody>
                </Modal>
            </>
        :
            <div></div>
    );
}; 

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getDepositoBancosRequest: () => dispatch(getDepositoBancosRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        depositoBancosRespuesta: store.depositoBancosRespuesta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDepositarForm);