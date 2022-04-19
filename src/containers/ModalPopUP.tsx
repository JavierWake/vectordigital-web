import React,{ useState }from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import '../styles/ModalPopUp.css'
import { Notification } from '../types/AppBar';


export interface props {
    name: string;
    title: string;
    confirm?:any;
}

type AllProps = props;
export const ModalPopUP: React.FC<AllProps> = ({name,title,confirm})=> {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
   

    return (
        <div>
            <div>
            <button className="w-full bg-red-600 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" data-toggle="toggle" onClick={toggle}>
                {name}
            </button>
            <Modal className="size-modal" isOpen={modal} toggle={toggle}>
                <ModalBody>
                    
                    <div className="container-modal">

                    
                    <h3 className="Titulo-modal  flex flex-wrap justify-center mb-4 mt-4" >{title}</h3>

                    <div className="flex flex-wrap justify-center mb-4">
                        <Button tag="span" data-toggle="toggle" className="bg-white p-2 px-4 mr-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:text-red-600 font-bold">cancelar</Button>
                        <Button tag="span" data-toggle="toggle" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600 font-bold">{confirm}</Button>
                    </div>
                    </div>
                    
                </ModalBody>
            </Modal>
            </div>
        </div>
    )

}

export default ModalPopUP;