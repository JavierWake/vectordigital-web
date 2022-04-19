import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';

import '../styles/alert.css'

//GET
import { getListUserRequest } from '../actions/listUserAction';
import { IListUser, ListUserState } from '../types/UsertListTypes';
import { RootState } from '../reducers/rootReducer';

//POST
// import { postIssuerSend } from '../actions/PostIssuerAction';
//import { IPostIssuer, PostIssuerState } from '../types/PostIssuerTypes';

//State of the component
interface propsFromState {
    listUserItems: IListUser[];
    dropdwonType: boolean;
    title: string;
}

type AllProps = propsFromState;

const ModalList: React.FC<AllProps> = ({ listUserItems, dropdwonType, title }) => {
    
    const dispatch = useDispatch();

    const [nameList, setNameList] = useState('')
    const [idList, setId] = useState('')

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let buttonStyle = "";
    if(dropdwonType){
        buttonStyle = "text-sm px-4";
    } else {
        buttonStyle = "bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
    }

    // useEffect(() => {
    //     console.log(idList);
    //     let params={ name: "Alfa", list_name: "Industrial", ticker: "ALFAA"};
    //     let message = "22f94cb4-67d6-4f29-9248-ff7f32657cfa/eefae11da33743a38bb73fea2333520d";
    //     let send:any = [params, message];
    //     dispatch(postIssuerSend(send));
    // },[nameList])

    return (
        <div>
            <button data-toggle="toggle" className={buttonStyle} onClick={() => {dispatch(getListUserRequest("22f94cb4-67d6-4f29-9248-ff7f32657cfa")); setModal(true)}}>
                {title}
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="text-gray-700 font-bold" toggle={toggle}>Agrega una lista</ModalHeader>
                <ModalBody>
                    {
                        listUserItems.map((nameList) => (
                            <div>
                                <input id={nameList.list_id} name={nameList.list_name} type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" onChange={event => {setId(event.target.id); setNameList(event.target.name)} } />
                                <label htmlFor={nameList.list_id} className="text-gray-600 px-2 py-1">{nameList.list_name}</label>
                            </div>
                        ))
                    }
                </ModalBody>
                <ModalFooter>
                    <Button tag="span" data-toggle="toggle" className="bg-white p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:text-red-600" onClick={() => {setModal(false)}}>Cancelar</Button>
                    <Button tag="span" data-toggle="toggle" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => {setModal(false)}}>Agregar</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        listUserItems: store.listUser.listUser,
        postIssuer: store.postIssuer,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getListUserRequest: () => dispatch(getListUserRequest(dispatch)),
        // postIssuerSend: () => dispatch(postIssuerSend(dispatch))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalList);