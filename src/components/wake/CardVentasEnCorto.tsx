import React, { useState } from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";
import logo from '../../assets/Vector-triangulo-blanco.svg'
import '../../styles/ticket.css'




const IntroduccionVentas = ({ action }) =>{
    return (
        <article className='w-5/6 max-w-sm pt-7 shadow-2xl'>
            <h3 className='text-center mb-6 text-base font-semibold'>Instrucción de Ventas en Corto</h3>
            <div className='ticker-path w-11/12 px-8 mx-auto mb-4 flex gap-x-8 text-xs'>
               <div className='w-2/4'>
                   <p className='mb-3'>
                        <samp className='block py-3.5'>Emisora</samp>  
                        <span className='text-gray-150 pb-3.5'>
                           Nombre de emisora 
                           <samp>
                               <AiOutlineInfoCircle className='inline-block ml-1 text-gray-50'/>
                            </samp>
                        </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>00</samp>  
                        <span className='text-gray-150'> Títulos </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>1 día</samp>  
                        <span className='text-gray-150'> Vigencia </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>$00,000.00</samp>  
                        <span className='text-gray-150'>Precio</span>
                   </p>
               </div>
               <div className='w-2/4'>
                   <p className='mb-3'>
                        <samp className='block py-3.5'>Limitada</samp>  
                        <span className='text-gray-150 pb-3.5'>
                        Tipo de orden
                        </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>BMV</samp>  
                        <span className='text-gray-150'> Bolsa </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>00:00</samp>  
                        <span className='text-gray-150'> Tiempo especifíco </span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>$00,000.00</samp>  
                        <span className='text-gray-150'>Monto estimado</span>
                   </p>
               </div>
            </div>

            <h3 className='text-center text-base font-semibold'>Préstamo en valores</h3>
            <div className='ticker-path px-8 m-auto flex gap-x-8 text-xs'>
               <div className='w-2/4'>
                   <p className='mb-4'>
                        <samp className='block py-3.5'>Emisora</samp>  
                        <span className='text-gray-150 pb-3.5'>
                           Nombre de emisora 
                        </span>
                   </p>
                   <p className='mb-4'>
                        <samp className='block pb-3.5'>$00,000.00</samp>  
                        <span className='text-gray-150'> Precio de la instrucción de venta en cortor</span>
                   </p>
                   <p className='mb-4'>
                        <samp className='block pb-3.5'>6.10%</samp>  
                        <span className='text-gray-150'> Tasa anual</span>
                   </p>
                   <p className='mb-3'>
                        <samp className='block pb-3.5'>28 días</samp>  
                        <span className='text-gray-150'>Plazo</span>
                   </p>
               </div>
               <div className='w-2/4'>
                   <p className='mb-4'>
                        <samp className='block py-3.5'>00</samp>  
                        <span className='text-gray-150 pb-3.5'>
                        Títulos a obtener en préstamo
                        </span>
                   </p>
                   <p className='mb-4'>
                        <samp className='block pb-3.5'>$00,000.00</samp>  
                        <span className='text-gray-150'> Precio del préstamo de valores </span>
                   </p>
                   <p className='mb-4'>
                        <samp className='block pb-3.5'>$0.18</samp>  
                        <span className='text-gray-150'> Prima <samp>
                               <AiOutlineInfoCircle className='inline-block ml-1 text-gray-50'/>
                            </samp></span>
                   </p>
               </div>
            </div>
            <div className='flex flex-col justify-center w-5/6 mx-auto'>
                    <button 
                        className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded mb-4 hover:border-red-600 hover:bg-white hover:text-red-600"
                        onClick={ action }
                    >
                        Ver ordenes
                    </button>
                </div>
        </article>
    );
}
const ValoresGarantia = ( {action} ) =>{
    return (
        <article className='w-5/6 max-w-sm pt-7 shadow-2xl'>
            <h3 className='text-center mb-7 text-base font-semibold'>Valores para tomar en garantía</h3>
            <p className='text-center text-xs font-semibold'>$1,639.21</p>
            <p className='text-gray-150 px-8 text-xs mb-6'>Monto apróximado paraa dejar en garantía para cubrir el prestamo</p>

            <div className='ticker-path w-11/12 px-8 m-auto flex justify-center gap-x-8 text-xs pb-8'>
               <div className='w-9/12'>
                   <p className='mb-2.5 text-gray-150'>Emisora/Serie</p>
                   <p className='mb-2.5'>VECTPRE F-0</p>
                   <p className='mb-2.5'>VECTPRE F-0</p>
                   <p className='mb-2.5'>VECTPRE F-0</p>
                   <p>VECTPRE F-0</p>
               </div>
               <div className='w-2/4'>
                <p className='mb-2.5 text-gray-150'>Títulos</p>
                   <p className='mb-2.5'>00</p>
                   <p className='mb-2.5'>00</p>
                   <p className='mb-2.5'>00</p>
                   <p>00</p>
               </div>
            </div>

            <div className='pl-11 pr-9 flex justify-between text-xs mb-32'>
                <p>
                    $00,000.00 <br/>
                    <span className='text-red-600'>
                        Aforo
                    </span>
                </p>
                <p>
                    $1,639.21 <br/>
                    <span className='text-red-600'>
                        Importe total de garantías
                    </span>
                </p>
            </div>

            <h4 className='text-center text-red-600 text-xs mb-3'>Ver detalle de valores en garantía</h4>

            <p className='text-xxs text-gray-150 w-5/6 mx-auto mb-4'>
                Esta instrucción generará un PRÉSTAMO DE VALORES, siempre y cuando no sea rechazda por la BMV. Si usted desea cancelar el préstamo hoy mismo; necesita tener posición y hacerlo antes del horario establecido 19:21:00.
            Si la instrucción llega a vencimiento y no tuvo asignación, el préstamo no tendrá efecto.</p>
            <p className='text-xxs text-gray-150 w-5/6 mx-auto mb-3'>
                El precio y el monto de los valores tomados en garantía están sujetos a las directrices de valuación del Indeval (Instituto para el Deposito de Valores). 
            </p>

            <div className='flex flex-col justify-center w-5/6 mx-auto'>
                <button 
                    className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded mb-4 hover:border-red-600 hover:bg-white hover:text-red-600"
                    onClick={action}
                >
                    Ver ordenes
                </button>
            </div>
        </article>
    );
}
const Ticket = () =>{
    return (
        <article className='w-5/6 max-w-sm bg-red-600 pb-20'>
            <img src={logo} alt="Logo" className='py-14 m-auto'/>
            <h3 className='text-white text-center text-2xl mb-7'>Orden recibida</h3>
            <div className='ticker-path w-11/12 bg-white m-auto py-5 ticket-info__container' >
                <div className='bg__ticket'></div>
                <h4 className='mb-8 text-center text-lg font-bold'>Operaciones</h4>
                <div className='flex items-end w-5/6 mb-8 mx-auto text-center'>

                    <div className='w-2/4'>
                        <p className='text-base mb-1.5'>Ventas en corto Limitada</p>
                        <p className='text-gray-150'>Tipo de Orden</p>
                    </div>
                    <div className='w-2/4'>
                        <p className='text-base mb-1.5'>123456789</p>
                        <p className='text-gray-150'>Folio</p>
                    </div>
                </div>

                <p className='text-gray-150 px-12 mb-2'>Mensaje</p>
                <p className='font-medium px-12 mb-4'>
                    <span className='font-semibold'>Su instrucción ha sido ingresada.</span> <br/> 
                    Recuerde que esta operación esta relacionada con las políticas de Vector Casa de Bolsa S.A. de C.V.
                </p>
                <div className='flex flex-col justify-center w-5/6 mx-auto'>
                    <button 
                        className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded mb-4 hover:border-red-600 hover:bg-white hover:text-red-600"
                    >
                        Ver ordenes
                    </button>
                    <button>
                        Continuar
                    </button>
                </div>

                <div className='bg__ticket bg__ticket--button'></div>
            </div>
        </article>
    );
}


const CardVentasEnCorto = () => {
    const [state, setState] = useState({
        introduccionVentas: true,
        valoresGarantia: false,
        ticket: false,
    })

    const onValoresGarantia = ()=>{
        setState({
            ...state,
            introduccionVentas: false,
            valoresGarantia: true,
            ticket: false,
        })
    } 
    const onTicket = ()=>{
        setState({
            ...state,
            introduccionVentas: false,
            valoresGarantia: false,
            ticket: true,
        })
    } 

    if( state.introduccionVentas ){
        return <IntroduccionVentas action={ onValoresGarantia }/>
    }
    else if( state.valoresGarantia ){
        return <ValoresGarantia action={ onTicket }/>
    }
    else if( state.ticket ){
        return <Ticket/>
    }
    else{
        return (
            <IntroduccionVentas action={ onValoresGarantia }/>
        );
    }
}
 
export default CardVentasEnCorto