import React, { useState, useRef, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from '../reducers/rootReducer';
import '../styles/styles.css';

//Actions to call redux store
import { postListRequest } from '../actions/postListAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types to use data from store
import { ListState } from "../types/ListTypes";
import { PostListState } from "../types/PostList";
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";

//Containers
import ModalPopUPList from '../containers/ModalPopUPList';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

//ICONS
import { MdPlaylistAdd, MdAddAlert } from "react-icons/md";


//State of the component
interface propsFromState {
    loginObject?: LoginObjectState;
    listItems: ListState;
    ticker: string;

}

type AllProps = propsFromState;

const AddToList: React.FC<AllProps> = ({ listItems, ticker, loginObject }) => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [alertShow, setAlertShow] = useState(false);
    let cuentaLO = "";
    const ref = useRef(null);
    const cuentaRef = useRef("");
    const idRef = useRef("");
    const dispatch = useDispatch();    
    const history = useHistory();

    useEffect(() => {
        if(loginObject?.response.ierror === -1){
            if(loginObject?.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject?.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO: any = loginObject?.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject?.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    cuentaRef.current = loginObject?.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
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
    
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return(
        <div className='flex items-center w-full' >
            <OverlayTrigger 
                show={show}
                trigger="focus"
                key="bottom"
                placement="bottom"
                overlay={
                    <Card className="w-52 px-4 py-2 border-gray-200 border-2 shadow-md rounded z-10">
                        {
                            listItems.list.length === 0 ? 
                                <p className="my-2 text-sm">No hay listas</p>
                            :
                                <p className="py-1 font-bold my-2 text-sm">Agregar a lista:</p>
                        }
                        {
                            listItems.list.filter(row => !row.vector).filter(row => row.list_name != "Mis Posiciones").map((row,i) =>(
                                <p className="py-1 px-1 cursor-pointer text-sm rounded-lg hover:bg-gray-300" onClick={ () => {dispatch(postListRequest({ message: "lista/"+cuentaRef.current+"/"+row.list_id+"?ticker="+ticker, id: idRef.current })); setShow(false)} }>
                                    {row.list_name}
                                </p>
                            ))
                        }
                        <div className="my-3">
                            <ModalPopUPList name={"Crear lista"} title={"Crear nueva lista"} confirm={"Aceptar"} type={"addLista"} />
                            <button className="w-full bg-gray-100 text-xs text-gray-900 border-1  hover:bg-gray-300 rounded-md" onClick={() => setShow(!show)}>Cancelar</button>
                            {/* <button type="submit" className="w-10/12 bg-red-600 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">Crear lista</button> */}
                        </div>
                    </Card>
                }
            >
                <button onClick={handleClick}>
                    <MdPlaylistAdd className="text-red-600 text-3xl cursor-pointer" />
                </button>
            </OverlayTrigger>
        </div>
    );
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        postListRequest: () => dispatch(postListRequest(dispatch)),
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


export default connect(mapStateToProps, mapDispatchToProps)(AddToList);