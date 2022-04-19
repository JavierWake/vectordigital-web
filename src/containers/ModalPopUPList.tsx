import React, { useState, useEffect, useRef }from "react";
import { useHistory, useParams } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

//Actions to call redux store
import { postListRequest } from '../actions/postListAction';
import { getListRequest } from '../actions/listAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import { ListState } from "../types/ListTypes";
import { PostListState } from "../types/PostList";

//CSS
import { Button, Modal, ModalBody } from 'reactstrap';
import '../styles/ModalPopUp.css'


interface props {
    loginObject?: LoginObjectState;
    name: string;
    title: string;
    confirm:string
    type: string;
    postList: PostListState;
}

type AllProps = props;
const ModalPopUPList: React.FC<AllProps> = ({ name,title,confirm, type, loginObject, postList })=> {
    
    const dispatch = useDispatch();
    const cuentaRef = useRef("");
    const idRef = useRef("");
    let cuentaLO = "";    
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [nameList, setNameList] = useState("");
    const toggle = () => setModal(!modal);

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
    
    const handleChange = (e:any) => {
        e.preventDefault();
        setNameList(e.target.value);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(nameList !== ""){
        let messageList = "lista/"+cuentaRef.current+"?name="+nameList;
        dispatch(postListRequest({ message:messageList, id: idRef.current }));
        }
        setModal(!modal);
        setNameList("");
    }
    
    return (
        <div>
            <div>
            <button className={"w-full  text-sm text-red-600 font-bold" + (type === "addLista" ? " rounded-lg " : " rounded p-2")} data-toggle="toggle" onClick={toggle}>
                {name}
            </button>
            <Modal className="size-modal" isOpen={modal} toggle={toggle}>
                <ModalBody>
                    <form className="commentForm" onSubmit={handleSubmit}>
                        <div className="container-modal z-10">

                        
                            <h3 className="Titulo-modal flex flex-wrap justify-center mb-4 mt-4" >{title}</h3>
                            
                                    
                            <div className="flex flex-wrap justify-center px-5">
                                <input 
                                    value={nameList} 
                                    //className=" mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    className="w-full p-2 mb-4 text-xs rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 "
                                    type="text" 
                                    placeholder="Nombre de la lista" 
                                    onChange={handleChange}
                                />

                                {
                                    !nameList ? 
                                        <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                            {confirm}
                                        </button>
                                    :
                                        <button onClick={handleSubmit} className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                            {confirm}
                                        </button>
                                }

                                {/*<Button disabled={!nameList} type="submit" tag="span" data-toggle="toggle" className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600 font-bold" onClick={handleSubmit}>{confirm}</Button>*/}
                            </div>

                        </div>
                    </form>
                    
                </ModalBody>
            </Modal>
            </div>
        </div>
    )

}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        listItems: store.list,
        postList: store.postList,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
      postListRequest: () => dispatch(postListRequest(dispatch)),
      getListRequest: () => dispatch(getListRequest(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopUPList);