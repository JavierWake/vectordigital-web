import { Card, CardTitle, CardText, CardFooter } from 'reactstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
export const VectorAnalisisComponent = () =>{
    return (
        <div className="">
            <div className="flex flex-wrap gap-y-4 justify-between items-center">
        <div className="text-center bg-white rounded w-56 h-60 p-4 shadow shadow-md">
            <p className="text-red-600 font-bold text-sm mb-2">Flash Tecnico.</p>
            <h3 className="mb-2 text-gray-500 font-light text-sm">Georgina Muñiz Sánchez</h3>
            <p className="price__features mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quibusdam modi eum iure distinctio enim?</p>
            <div className="price__items">
                <p className="price__features text-gray-500 font-light text-sm">hace 1 hora</p>
            </div>
        </div>
        <div className="text-center bg-white rounded w-56 h-60 p-4 shadow shadow-md">
            <p className="text-red-600 font-bold text-sm mb-2">Flash Tecnico.</p>
            <h3 className="mb-2 text-gray-500 font-light text-sm">Georgina Muñiz Sánchez</h3>
            <p className="price__features mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quibusdam modi eum iure distinctio enim?</p>
            <div className="price__items">
                <p className="price__features text-gray-500 font-light text-sm">hace 1 hora</p>
            </div>
        </div>
        <div className="text-center bg-white rounded w-56 h-60 p-4 shadow shadow-md">
            <p className="text-red-600 font-bold text-sm mb-2">Flash Tecnico.</p>
            <h3 className="mb-2 text-gray-500 font-light text-sm">Georgina Muñiz Sánchez</h3>
            <p className="price__features mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quibusdam modi</p>
            <div className="price__items">
                <p className="price__features text-gray-500 font-light text-sm">hace 1 hora</p>
            </div>
        </div>
        <div className="text-center bg-white rounded w-56 h-60 p-4 shadow shadow-md">
            <p className="text-red-600 font-bold text-sm mb-2">Flash Tecnico.</p>
            <h3 className="mb-2 text-gray-500 font-light text-sm">Georgina Muñiz Sánchez</h3>
            <p className="price__features mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quibusdam modi eum iure distinctio enim?</p>
            <div className="price__items">
                <p className="price__features text-gray-500 font-light text-sm">hace 1 hora</p>
            </div>
        </div>
            </div>
    
            <div className="flex justify-center mt-8">
                    <ul className="flex items-center">
                        <li className="flex items-center cursor-pointer">
                            <button >
                                <MdKeyboardArrowLeft className={"font-bold text-2xl text-gray-500 rounded-xl "} />
                            </button>
                        </li>
                        <li className="flex items-center cursor-pointer mx-4">
                            <p className="text-gray-500">
                                1 de 3
                            </p>
                        </li>
                        <li className="flex items-center cursor-pointer">
                            <button >
                                <MdKeyboardArrowRight className={"font-bold text-2xl text-gray-500 rounded-xl "}/>
                            </button>                        
                        </li>
                    </ul>
                </div>

        </div>
            )
}

