import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import { MdModeEdit, MdClose } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";


import ModalView  from '../containers/ModalView';

//State of the component
interface propsFromState {
    typeCard: any;
    name: any;
    sub1: any;
    sub2: any;
    sub3: any;
    sub4: any;
    sub5:any;
    subEditar?: boolean;
}

type AllProps = propsFromState;

const CardContainer: React.FC<AllProps> = ({ typeCard, name, sub1, sub2, sub3, sub4, sub5, subEditar }) =>{

    const [redirectRic, setRedirectRic] = useState("");
    const [checkRic, setCheckRic] = useState(false);

    const sendPerfilEmisora = (data : string) => {
        setRedirectRic(data);
        setCheckRic(true);
    }

    if(checkRic){
    return <Redirect push to={'/emisora/' + redirectRic } />
    }

    return(
        <div>
            <Card className={ typeCard === "vectorAnalisis" ? " w-full " : typeCard === "movers" ? " w-40 rounded-lg border border-gray-350 mt-2 hover:shadow-xl cursor-pointer " : " w-52 " + " h-full"} body>
                    { 
                        typeCard === "emisoras" ? 
                        <div className="flex justify-end">
                            <IoMdPricetag className="text-red-600 text-lg mr-2"/> <p className="font-sans font-semibold text-red-600 text-sm"></p>
                        </div>
                        :  typeCard === "emisoraOrden" ? 
                                <div className="flex flex-row justify-end">
                                    <div>
                                        <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"editar"} hora={sub5} issuer={true} />
                                    </div>
                                    <div>
                                        <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"delete"} hora={sub5} issuer={true} />
                                    </div>
                                </div>     
                            : typeCard === "portafolio" ? 
                                subEditar ?
                                    <div className="flex flex-row justify-end">
                                        <div>
                                            <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"editar"} hora={sub5} issuer={false} />
                                        </div>
                                        <div>
                                            <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"delete"} hora={sub5} issuer={false} />
                                        </div>
                                    </div> 
                                : ""    
                            : ""
                    }
                    {/* Nombre de emisora */}
                    <CardTitle className={"flex " + ((typeCard === "vectorAnalisis") ? " justify-center" : "")}> 
                        {
                          typeCard === "movers" ?
                            <span className="text-lg cursor-pointer" onClick={() => sendPerfilEmisora(name)}>{name}</span>
                          :
                            <span className={(typeCard === "vectorAnalisis") ? "py-2 text-sm text-red-600 font-bold ": (typeCard === "vectorAnalisis") ? "font-semibold py-2" : subEditar ? "font-semibold mt-1" : "font-semibold mt-4"}>{name}</span>
                        }
                        {/* <span className={(typeCard === "vectorAnalisis") ? "py-2 text-sm text-red-600 font-bold ": (typeCard === "vectorAnalisis") ? "font-semibold py-2" : subEditar ? "font-semibold mt-1" : "font-semibold mt-4"}>{name}</span> */}
                        { typeCard === "capitales" ?  
                            <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"editar"} hora={sub5} issuer={false} />
                        : "" }
                    </CardTitle>
                    {/* Sub1 */}
                    { 
                        typeCard === "emisoras" ? "" 
                        :  <CardSubtitle className={
                                (typeCard === "capitales" || typeCard === "fondos" ) ? 
                                    " text-sm font-mono font-medium text-gray-400" : typeCard === "emisoraOrden" || typeCard === "portafolio"? " font-mono  text-md font-medium text-gray-400 "
                                    : typeCard === "vectorAnalisis" ? " py-2  text-sm text-gray-400 font-bold text-center " : typeCard === "movers" ?  "flex font-sans font-bold text-red-600 text-xs mb-2" : ""
                            } >  { typeCard === "moversS" ? <span><IoMdPricetag className="text-red-600 text-sm mr-2"/></span> : "" } <span>{sub1}</span>
                            </CardSubtitle > 
                    }
                    { typeCard === "emisoraOrden" ? <hr className="solid bg-gray-500 my-3"/> :  "" }
                    {/* Sub2 */}
                    <CardSubtitle className={ "mb-2 " +
                        ((typeCard === "capitales" || typeCard === "fondos" || typeCard === "moversS") ? 
                        "font-mono text-sm font-medium text-gray-400" : 
                        typeCard === "emisoras" ? 
                        " text-sm ": 
                        typeCard === "vectorAnalisis" ? " py-2  text-center text-md " 
                        :
                        typeCard === "emisoraOrden" ?
                        " font-mono text-md font-medium text-gray-800 " 
                        : typeCard === "portafolio" ?
                        " font-mono text-md font-medium text-gray-400 " :
                         "")
                    } >
                        {sub2}
                    </CardSubtitle >
                    { (typeCard === "movers" || typeCard === "vectorAnalisis" ) ? "" :  <hr className="solid bg-gray-500" /> }
                    {/* Sub3 */}
                    <CardSubtitle className={ 
                        "my-2 " +
                        ((typeCard === "capitales" || typeCard === "fondos" || typeCard === "emisoraOrden" || typeCard === "portafolio") ? 
                            " font-semibold text-red-600 text-sm " : " ") +
                            (typeCard === "capitales" ? 
                                " font-bold " : typeCard === "movers" ? ( sub5 === "ALZA" ?
                                " text-green font-medium text-lg " : " text-red-100 font-medium text-lg ")  : 
                                typeCard === "emisoras" ? " flex justify-end font-semibold " : typeCard === "emisoraOrden" ? " font-semibold " :
                                typeCard === "vectorAnalisis" ? 
                                " text-center text-xs font-semibold text-gray-400 py-2  "
                                 : "")}>
                                    {sub3}
                    </CardSubtitle >
                    {/* Sub4 */}
                    <CardSubtitle className={
                        (typeCard === "capitales" || typeCard === "fondos" || typeCard === "emisoraOrden" || typeCard === "portafolio") ? 
                        "font-mono font-medium text-gray-400 text-sm " : typeCard === "movers" ?  ( sub5 === "ALZA" ?
                        " text-green text-sm " : " text-red-100 text-sm ") :
                        typeCard === "emisoras" ? " flex justify-end font-semibold text-green text-sm" : ""}>
                            {sub4}
                    </CardSubtitle >
                    {/* Sub5 */}
                    { 
                        typeCard === "fondos" ? 
                        <CardSubtitle className={typeCard === "fondos" ? "font-mono font-medium text-gray-400 text-sm" : ""}>
                            {sub5}
                        </CardSubtitle > :  "" 
                    }
                    { typeCard === "emisoraOrden" ?
                        <div>
                            <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"ordenes"} hora={sub5} issuer={true} />
                        </div> 
                        : ""
                    }
            </Card>
        </div>
    );
}

export default CardContainer;