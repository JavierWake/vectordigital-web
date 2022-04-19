import React, {useState} from 'react';

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import FloatMenu from '../../containers/perfil/FloatMenu';

import '../../styles/perfil.css';
import { 
    MdPerson
} from "react-icons/md";

const BeneficiarioPorcentaje: React.FC = ({  }) => {

    const [showMenu, setShowMenu] = useState(false);

    const buttonMenu = (e: any) =>  {
        e.preventDefault();
        setShowMenu(!showMenu)
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
                                        <div className="step-fill rounded-full flex items-center justify-center font-sans text-sm">1</div>
                                        <p className="font-sans text-sm mt-2 step-text">Datos Personales</p>
                                    </div>
                                    <div className="flex flex-column items-center mx-20">
                                        <div className="step rounded-full flex items-center justify-center font-sans text-sm">2</div>
                                        <p className="font-sans text-sm mt-2 step-text">Porcentajes</p>
                                    </div>
                                </div>

                                <div className="form">
                                    <form action="#">
                                        <div className="">
                                            <div className="header flex justify-end my-5">
                                                <p className="font-sans font-bold text-sm text-red-600">Agregar porcentajes destinados</p>
                                            </div>

                                            <div className="">
                                                <div className="form-group flex mb-6">
                                                    <div className="flex items-center w-6/12">
                                                        <MdPerson  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                                                        <label htmlFor="" className="font-sans text-sm font-bold">Margarita Sánchez López</label>
                                                    </div>
                                                    <div className="flex justify-end w-6/12">
                                                        <input value="80%" placeholder="80%" required type="text" className="font-sans font-bold text-md text-center p-1 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                    </div>
                                                </div>
                                                <div className="form-group flex mb-6">
                                                    <div className="flex items-center w-6/12">
                                                        <MdPerson  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                                                        <label htmlFor="" className="font-sans text-sm font-bold">Enrique Sánchez López</label>
                                                    </div>
                                                    <div className="flex justify-end w-6/12">
                                                        <input value="20%" placeholder="80%" required type="text" className="font-sans font-bold text-md text-center p-1 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                    </div>
                                                </div>
                                                <div className="form-group flex mb-6">
                                                    <div className="flex items-center w-6/12">
                                                        <MdPerson  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                                                        <label htmlFor="" className="font-sans text-sm font-bold">Victor Sánchez López</label>
                                                    </div>
                                                    <div className="flex justify-end w-6/12">
                                                        <input value="0%" placeholder="80%" required type="text" className="font-sans font-bold text-md text-center p-1 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="footer flex justify-end my-5">
                                                <p className="font-sans font-bold text-md">Total: 100%</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-end items-end mt-10">

                                            <div className="flex w-6/12 justify-end">
                                                <a href="/perfil" 
                                                    className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                >
                                                    Cancelar
                                                </a>
                                                <a
                                                    href="/perfil"
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
export default BeneficiarioPorcentaje