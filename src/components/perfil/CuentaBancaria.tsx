import React,  { useState } from 'react';
import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';
import MenuPerfil from '../../containers/perfil/MenuPerfil';
import FloatMenu from '../../containers/perfil/FloatMenu';



const CuentaBancaria: React.FC = ({  }) => {

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
                                    <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Cuenta Bancaria</h2>
                                </div>
                                <div className="form">
                                    <form action="#">
                                        <div className="inputs flex justify-between">
                                            <div className="flex flex-column">
                                                <label htmlFor="" className="font-sans text-xs mb-2">Clabe Interbancaria</label>
                                                <input required type="text" className="font-sans text-sm p-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                            </div>

                                            <div className="flex flex-column">
                                                <label htmlFor="" className="font-sans text-xs mb-2">Banco</label>
                                                <input required type="text" className="font-sans text-sm p-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />
                                            </div>
                                            
                                        </div>
                                        <div className="flex justify-end mt-10">
                                            <a href="/perfil" 
                                                className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                            >
                                                Cancelar
                                            </a>
                                            <button 
                                                className="w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                            >
                                                Agregar
                                            </button>
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
export default CuentaBancaria