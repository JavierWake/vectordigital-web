import React, { useState } from 'react';
import resultados from '../../assets/fakeChart-resultados.png'
import balance from '../../assets/fakeChart-balance.png'
import efectivo from '../../assets/fakeChart-efectivo.png'

const IndicadoresAnalisisFundamental = ( ) =>{
    const [state, setState] = useState({
        resultados: true,
        general: false,
        efectivo: false,
    })

    const onResultados = ( ) => {
        setState({
            ...state,
            resultados: true,
            general: false,
            efectivo: false,
        })
    }
    const onGeneral = ( ) => {
        setState({
            ...state,
            resultados: false,
            general: true,
            efectivo: false,
        })
    }
    const onEfectivo = ( ) => {
        setState({
            ...state,
            resultados: false,
            general: false,
            efectivo: true,
        })
    }

    const GraficaAnalisisFundamental = () =>{
        if(state.resultados){
            return(
                <div>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Estado de Resultados</h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <img src={resultados}/>
                        <div className=' pt-6 px-8 pb-10 w-96 h-min border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Margen bruto</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Margen de Operación</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Margen EBITDA</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Margen Neto</span>
                                <span>xx%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        else if( state.general ){
            return(
                <div>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Del Balance</h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <img src={balance}/>
                        <div className=' pt-6 px-8 pb-10 w-96 h-min border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses/Último trimestre</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Prueba ácida</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Pasivos Totales / Activos totales</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Deuda a Largo Plazo a Capital</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Deuda Total a Capital</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Deuda Neta </span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>UFAIDA/Pago de Intereses de Deuda </span>
                                <span>xx%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Flujo de Efectivo </h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <img src={efectivo}/>
                        <div className=' pt-6 px-8 pb-10 w-96 h-min border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-200 mb-7'>
                                <span>Flujo de Caja por Acción</span>
                                <span>$2,345</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5  mb-7'>
                                <span>Flujo de efectivo operativo / Ventas</span>
                                <span>45%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <section className='w-11/12 m-auto'>
            <h2 className='font-semibold text-xl mb-7'>Indicadores de Análisis Fundamental</h2>

            <div className='flex justify-evenly w-full mb-14 text-sm'>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-10'>
                        <span className='border-b border-gray-400'>Val. Empresa</span> <br/> UAFIDA
                    </p>
                    <p className='font-medium'>0.0</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Utilidad
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>9.9</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>24.4</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Ventas
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>6.3</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>2.6</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-10'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Val. Contable
                    </p>
                    <p className='font-medium'>11.6</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Flujo de Caja
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>7.9</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>0.0</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        Utilidad por <br /> acción
                    </p>
                    <div>
                        <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                        <p className='font-medium'>13.1</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        Dividendos por <br/> acción
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>6.3</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>2.6</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-10'>
                        Val.contable <br/> por acción
                    </p>
                    <p className='font-medium'>2.9</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-16'>
                        ROE
                    </p>
                    <p className='font-medium'>0.0</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-16'>
                        ROA
                    </p>
                    <p className='font-medium'>6.3</p>
                </div>
            </div>

            <div className='text-sm border-b border-gray-400 mb-7'>
                <button 
                    className={`px-4 ${state.resultados && "text-red-600 border-b-4 border-red-600"}`}
                    onClick={ onResultados }
                >
                    Estado de Resultados
                </button>
                <button 
                    className={`px-4 ${state.general && "text-red-600 border-b-4 border-red-600"}`}
                    onClick={ onGeneral }
                >
                    Balance General
                </button>
                <button 
                    className={`px-4 ${state.efectivo && "text-red-600 border-b-4 border-red-600"}`}
                    onClick={ onEfectivo }
                >
                    Flujo de Efectivo
                </button>
            </div>

            <GraficaAnalisisFundamental/>

        </section>
    );
}
 
export default IndicadoresAnalisisFundamental