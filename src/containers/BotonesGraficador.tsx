import React from 'react';
import { BsGraphUp } from 'react-icons/bs';
import { MdAutoGraph } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { FooterComponent } from './FooterComponent';

//State of the component
interface propsFromState {
    selectedOption: "BASICA" | "AVANZADA";
    basicaNav?: () => void;
    avanzadaNav?: () => void;
    emisoraRic: string;
}

type AllProps = propsFromState;

const BotonesGraficador: React.FC<AllProps> = ({ selectedOption, basicaNav, avanzadaNav, emisoraRic }) =>{

    const baseClases = "h-auto flex flex-row justify-center items-center mr-3 py-1 px-2 w-32 rounded-lg"
    
    const hoverClasses = "hover:bg-white hover:text-red-600 hover:border-red-600 cursor-pointer";

    const classNameActiva = baseClases + " border-1 border-red-600 text-gray-100 bg-red-600 cursor-default ";

    const classNameInactiva = baseClases + " border-1 border-gray-30 text-gray-150 bg-gray-30 " + hoverClasses;
    
    return(
        <div className="w-full flex flex-row">
            <div>
                <div
                    className={ selectedOption === "BASICA" ? classNameActiva : classNameInactiva }
                    onClick={basicaNav && basicaNav}
                >
                    <BsGraphUp className="mr-2" />
                    <p>Básica</p>
                </div>
            </div>
            <div>
                <div
                    className={ selectedOption === "AVANZADA" ? classNameActiva : classNameInactiva }
                    onClick={() => { 
                        if(emisoraRic.length > 0){
                            avanzadaNav && avanzadaNav();
                        }
                    }}
                >
                    <MdAutoGraph className="mr-2" />
                    <p>Avanzada</p>
                </div>
            </div>
        </div>
    );
 }

export default BotonesGraficador;
