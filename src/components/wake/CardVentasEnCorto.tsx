import React from 'react';
import logo from '../../assets/Vector-triangulo-blanco.svg'

const CardVentasEnCorto = () => {

    return (
        <article className='w-5/6 max-w-sm bg-red-600 pb-20'>
            <img src={logo} alt="Logo" className='py-14 m-auto'/>
            <h3 className='text-white text-center text-2xl mb-7'>Orden recibida</h3>
            <div className='ticker-path w-11/12 bg-white m-auto py-5' 
                style={  {clipPath:` polygon(0% 3%, 3% 0%, 7% 2%, 13% 1%, 16% 2%, 22% 0%, 26% 3%, 34% 0%, 38% 3%, 43% 1%, 46% 4%, 52% 1%, 54% 4%, 58% 1%, 62% 5%, 66% 0%, 71% 4%, 75% 0%, 79% 4%, 83% 0%, 87% 4%, 91% 0%, 94% 4%, 98% 1%, 100% 4%, 100% 95%, 93% 99%, 88% 95%, 84% 99%, 79% 95%, 75% 99%, 69% 94%, 67% 98%, 62% 94%, 58% 98%, 55% 94%, 51% 99%, 46% 93%, 43% 99%, 39% 94%, 35% 100%, 31% 94%, 27% 99%, 23% 93%, 20% 98%, 16% 93%, 12% 99%, 10% 93%, 5% 98%, 1% 93%, 0% 90%)`}}
            >
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
                        className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                    >
                        Ver ordenes
                    </button>
                    <button>
                        Continuar
                    </button>
                </div>
            </div>
        </article>
    );
}
 
export default CardVentasEnCorto