import React, {useState} from 'react';

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import FloatMenu from '../../containers/perfil/FloatMenu';

import { Input } from 'reactstrap';

import '../../styles/perfil.css';


const Beneficiario: React.FC = ({  }) => {

    const [showMenu, setShowMenu] = useState(false);
    const buttonMenu = (e: any) =>  {
        e.preventDefault();
        setShowMenu(!showMenu)
    }

    const [showDireccion, setShowDireccion] = useState(false);
    const checkDirection = () =>  {
        setShowDireccion(!showDireccion)
    }
    
    
    return(
        <div className="bg-gray-100">

            <Appbar appBarData={appBarMockData}/>

            <FloatMenu showMenu={showMenu}/>

            <div className="flex-auto">
                <div className="flex flex-row">
                    {/* <div className="w-1/12 h-full">
                        <Sidebar />
                    </div> */}
                    <div className="bg-white w-1/12">
                        Sidebar
                    </div>
                    <div className="flex w-11/12 flex-wrap my-20">


                        <MenuPerfil></MenuPerfil>
                        
                        <div className="w-8/12 pr-10">
                            
                            <div className="title mb-10">
                                <h2 className="font-mono font-medium text-3xl" onClick={buttonMenu}>Datos Personales</h2>
                            </div>
                            <div className="content">

                                <div className="title mb-4">
                                    <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Beneficiarios</h2>
                                </div>

                                <div className="my-10 flex justify-center items-center">
                                    <div className="flex flex-column items-center mx-20">
                                        <div className="step rounded-full flex items-center justify-center font-sans text-sm">1</div>
                                        <p className="font-sans text-sm mt-2 step-text">Datos Personales</p>
                                    </div>
                                    <div className="flex flex-column items-center mx-20">
                                        <div className="step-inactive rounded-full flex items-center justify-center font-sans text-sm">2</div>
                                        <p className="font-sans text-sm mt-2 text-gray-350">Porcentajes</p>
                                    </div>
                                </div>

                                <div className="form">
                                    <form action="#">
                                        <div className="inputs flex justify-between mb-6">
                                            <div className="flex flex-column w-6/12">
                                                <div className="w-11/12">
                                                    <label htmlFor="" className="font-sans text-xs mb-2">Nombre(s)</label>
                                                    <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                </div>
                                            </div>

                                            <div className="flex flex-column w-6/12 items-end">
                                                <div className="w-11/12">
                                                    <label htmlFor="" className="font-sans text-xs mb-2">Apellido Paterno</label>
                                                    <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="inputs flex justify-between mb-6">
                                            <div className="flex flex-column w-6/12">
                                                <div className="w-11/12">
                                                    <label htmlFor="" className="font-sans text-xs mb-2">Apellido Materno</label>
                                                    <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                </div>
                                            </div>

                                            <div className="flex flex-column w-6/12 items-end">
                                                <div className="w-11/12">
                                                    <label htmlFor="" className="font-sans text-xs mb-2">Fecha de nacimiento</label>
                                                    <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-6">
                                            <Input type="checkbox"
                                            onChange={checkDirection}
                                            className="mt-0 border-2 focus:border-red-600 ring-0 shadow-none checked:bg-red-600"/>
                                            <p className="ml-3 font-sans text-sm">El beneficiario tiene la misma dirección que la mía</p>
                                        </div>

                                        <div className={"direccion " + ( showDireccion ? "hidden" : "" )}>
                                            <div className="inputs flex justify-between mb-6">
                                                <div className="flex flex-column w-6/12">
                                                    <div className="w-11/12">
                                                        <label htmlFor="" className="font-sans text-xs mb-2">Calle</label>
                                                        <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-column w-6/12 items-end">
                                                    <div className="w-11/12 flex justify-between">
                                                        <div>
                                                            <label htmlFor="" className="font-sans text-xs mb-2">Número Ext.</label>
                                                            <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="" className="font-sans text-xs mb-2">Número Int.</label>
                                                            <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                       
                                            <div className="inputs flex justify-between mb-6">
                                                <div className="flex flex-column w-6/12">
                                                    <div className="w-11/12 flex justify-between">
                                                        <div>
                                                            <label htmlFor="" className="font-sans text-xs mb-2">Colonia</label>
                                                            <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="" className="font-sans text-xs mb-2">Código Postal</label>
                                                            <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-column w-6/12 items-end">
                                                    <div className="w-11/12">
                                                        <label htmlFor="" className="font-sans text-xs mb-2">Municipio</label>
                                                        <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                       
                                        
                                        <div className="flex justify-end items-end mt-10">

                                            <div className={ "w-6/12 " + (showDireccion ? "hidden" : "")} >
                                                <div className="w-11/12">
                                                    <label htmlFor="" className="font-sans text-xs mb-2">Estado</label>
                                                    <input required type="text" className="font-sans text-sm p-2 w-full border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                </div>
                                            </div>

                                            <div className="flex w-6/12 justify-end">
                                
                                                <a href="/perfil" 
                                                    className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                >
                                                    Cancelar
                                                </a>
                                                <a
                                                    href="/agregar-porcentaje"
                                                    className="text-center w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                >
                                                    Continuar
                                                </a>
                                        
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Beneficiario