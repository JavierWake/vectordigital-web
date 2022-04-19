import { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
  } from "reactstrap";
import { GoKebabVertical } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

import ListDropdownTrading from "../containers/ListDropdownTrading";

//Actions
import { postIssuerRequest } from '../actions/PostIssuerAction';
import { deleteIssuerRequest } from '../actions/deleteIssuerAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types to use data from store
import { ListState } from "../types/ListTypes";
import { PostListState } from "../types/PostList";
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";

interface propsFromState {
    loginObject?: LoginObjectState;
    openMenu: boolean;
    listItems?: ListState;
    ticker: string;
    postList: PostListState;
    lista: string;
    listaId: string;
    vector: boolean;
    sendOptionDelete: (data: boolean) => void;
}

type AllProps = propsFromState;

const KebabDropdown: React.FC<AllProps> = ({ openMenu, listItems, ticker, postList, lista, listaId, sendOptionDelete, loginObject, vector }) => {
    
    const [dropdownOpen, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [deleteList, setDeleteList] = useState(false);
    const toggle = () => setOpen(false);
    const dispatch = useDispatch();
    const cuentaRef = useRef("");
    const idRef = useRef("");
    let cuentaLO = "";    
    const history = useHistory();

    useEffect(() => {
        if(loginObject?.response.ierror === -1){
            if(loginObject?.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject?.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO:any = loginObject?.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject?.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    cuentaLO = loginObject?.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                    
                    cuentaRef.current = cuentaLO;
                    idRef.current = idLO;
                    
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en issuerprofile, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            if(loginObject?.response.ierror === 92) {
              dispatch(postLoginObjectLogout());
              history.push("/");
            } else {
              //el usuario no esta loggeado, lo mandamos al login
              console.log("usuario no loggeado en appbar, lo mandamos al login");
              history.push("/");
            }
        }
    },[]);


    return(
        <ButtonGroup>
            <ButtonDropdown className="py-0 z-10" isOpen={openMenu} toggle={toggle}>
                <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={openMenu}>
                    <GoKebabVertical className={openMenu ? "text-red-600" : "text-black"}/>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>
                        Agregar a una lista 
                    </DropdownItem>
                    {
                        listItems?.list.filter(row => !row.vector  ).map((row,i) =>(
                            row.list_name != "Mis Posiciones" ?
                            <DropdownItem key={row.list_name} toggle={false} onClick={ () => dispatch(postIssuerRequest({ message: "lista/"+cuentaRef.current+"/"+row.list_id+"?ticker="+ticker, id: idRef.current })) }>
                                <p className="py-1 text-xs cursor-pointer">{row.list_name}</p>
                            </DropdownItem>
                            : ""
                        ))
                    }
                    {   vector ? "" :
                            <DropdownItem divider />
                    }
                    {
                        vector ? "" :
                        <DropdownItem onClick={ () => { dispatch(deleteIssuerRequest({message: "lista/"+cuentaRef.current+"/"+listaId+"/"+ticker, id: idRef.current})); setDeleteList(!deleteList); sendOptionDelete(deleteList) } }>
                            <p className="py-1 text-xs cursor-pointer">Eliminar de la lista</p>
                        </DropdownItem>
                    }
                    {/* <div className="flex flex-row">
                        <span className="text-xs px-4 py-2">
                            Agregar alerta
                        </span>
                        <span className="text-md py-2">
                            <MdKeyboardArrowRight />
                        </span>
                    </div> */}
                </DropdownMenu>
            </ButtonDropdown>
        </ButtonGroup>
    );
}

  
//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        postIssuerRequest: () => dispatch(postIssuerRequest(dispatch)),
        deleteIssuerRequest: () => dispatch(deleteIssuerRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        listItems: store.list,
        postList: store.postList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KebabDropdown);