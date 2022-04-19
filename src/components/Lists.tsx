import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from '../reducers/rootReducer';

//Containers
import ModalPopUPList from '../containers/ModalPopUPList';
import ListCard from "../containers/ListCard";
import Sidebar from '../components/Sidebar';
// import { Alert } from 'reactstrap';
import Appbar from './Appbar';
import { FooterComponent } from '../containers/FooterComponent';
import Alert from '../containers/Alert';

//Actions
import { getListRequest } from '../actions/listAction';
import { postListRequest } from "../actions/postListAction";
import { getListIssuerRequest } from '../actions/ListIssuerAction';
import { getIndexListRequest } from '../actions/IndexList';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types
import { IList, ListState } from '../types/ListTypes';
import { PostListState } from '../types/PostList'
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import { DeleteIssuerState } from '../types/DeleteIssuerTypes';
import { PostIssuerState } from '../types/PostIssuerTypes';
import { DeleteListState } from "../types/DeleteListTypes";
import { ListIndexState } from '../types/IndexList';

//Styles
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useSmoothScroll from 'react-smooth-scroll-hook';
import '../styles/Accordion.css';
import '../styles/button.css';
import '../styles/TextField.css';
import { appBarMockData } from '../mocks/Appbar';
import PageLayout from "../containers/layout/PageLayout";

interface propsFromState {
  loginObject: LoginObjectState;
  listUserItems: ListState;
  postList: PostListState;
  deleteIssuer: DeleteIssuerState;
  postIssuer: PostIssuerState;
  deleteList: DeleteListState;
  indexItems: ListIndexState;
}

type AllProps = propsFromState;

const Lists: React.FC<AllProps> = ({ loginObject, listUserItems, postList, deleteIssuer, postIssuer, deleteList, indexItems }) => {

  const dispatch = useDispatch();
  const cuentaRef = useRef("");
  let cuentaLO = "";
  const idRef = useRef("");
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();


  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  useEffect(() => {
    if (loginObject?.response.ierror === -1) {
      if (loginObject?.response.dsLogin.tdsLogin.length > 0) {

        const cuentaSesionLO = loginObject?.response.dsLogin.tdsLogin[0].cuentasesion;

        if (cuentaSesionLO != 0) {
          // mandamos llamar las apis sacando los datos del objeto de login

          const idLO: any = loginObject?.response.dsLogin.tdsLogin[0].id;
          const tokenLO = loginObject?.response.dsLogin.tdsLogin[0].token;
          const canal = "999";
          cuentaLO = loginObject?.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
          idRef.current = idLO;
          cuentaRef.current = cuentaLO;
          let messageList = "lista/" + cuentaRef.current;
          dispatch(getListRequest({ message: messageList, id: idRef.current }));
        }
        setReady(true);
      }
      else {
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en issuerprofile, lo mandamos al login");
        history.push("/");
      }
    }
    else {
      if(loginObject.response.ierror === 92) {
        dispatch(postLoginObjectLogout());
        history.push("/");
      } else {
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en appbar, lo mandamos al login");
        history.push("/");
      }
    }
  }, []);

  useEffect(() => {
    if(indexItems.listIndex[0].list_name === "") {
      dispatch(getIndexListRequest({ message: "indices" }))
    }
  }, [indexItems.listIndex]);

  useEffect(() => {
    if (ready && !postList.loading ) {
      console.log("entre aqui al get list 1");
      let messageList = "lista/" + cuentaRef.current;
      dispatch(getListRequest({ message: messageList, id: idRef.current }));
    }
  }, [postList.loading]);

  useEffect(() => {
    if (ready && !deleteList.loading ) {
      console.log("entre aqui al get list 3");
      let messageList = "lista/" + cuentaRef.current;
      dispatch(getListRequest({ message: messageList, id: idRef.current }));
    }
  }, [deleteList.loading]);

  useEffect(() => {
    if (ready && !deleteIssuer.loading) {
      setAlertMessage(deleteIssuer.messageError);
      setAlertShow(true);
      // window.setTimeout(()=>{
      //     setAlertShow(false)
      // },2000);
    }
  }, [deleteIssuer.loading]);

  useEffect(() => {
    if (ready && !deleteList.loading) {
      setAlertMessage(deleteList.messageError);
      setAlertShow(true);
      // window.setTimeout(()=>{
      //     setAlertShow(false);
      // },2000);
    }
  }, [deleteList.loading]);


  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll({
    ref,
    direction: 'x',
    speed: 100,

  });

  let childrenContentPrincipal = (
    <>
            {
              listUserItems.list[0].list_name !== "" ?
                <div className="py-2">
                  <p className=" my-2 text-xl border-b border-gray-300 pb-2">
                    Mis Listas
                  </p>
                  <Alert message={alertMessage} isOpen={alertShow} sendIsOpen={(open) => setAlertShow(open)} />
                  <div className="flex justify-between">
                    <div className="my-3">
                      <p className="text-red-600 font-bold">{listUserItems.list.filter(row => row.vector === false ).length} {listUserItems.list.filter(row => row.vector === false ).length === 1 ? " lista" : " listas"}</p>
                    </div>
                    <div className=" flex justify-end">
                      <div className="my-3">
                        <ModalPopUPList name={"Crear lista"} title={"Crear nueva lista"} confirm={"Aceptar"} type={"addLista"} />
                      </div>
                    </div>
                  </div>
                  {
                    listUserItems.list.filter(row => row.vector === false ).length !== 0 ?
                      <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(280px, 1fr))',
                        padding: '2px',
                        flexWrap: 'wrap',
                        maxWidth: '90%',

                      }} >
                        {listUserItems.list.filter(row => row.vector === false ).map(ListItem => (
                          <div
                            ref={ref}
                            key={ListItem.list_id}
                            style={{
                              padding: '5px',
                            }}>
                            <ListCard listItem={ListItem} vectorList={false}/>
                          </div>
                        ))}
                    </div>
                    : <p className="text-center">No cuentas con listas personales</p>

                  }
                </div>
              : ""
            }
            {
              indexItems.listIndex[0].list_name !== "" ?
                <div className="py-8">
                  <p className=" my-2 text-xl border-b border-gray-300 pb-2">
                    Listas de Vector
                  </p>
                  <div className="my-3">
                    <p className="text-red-600 font-bold">{indexItems.listIndex.length} listas</p>
                  </div>
                  <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(280px, 1fr))',
                        padding: '2px',
                        flexWrap: 'wrap',
                        maxWidth: '90%',

                      }} >
                      {indexItems.listIndex.map(ListItem => (
                        <div
                          ref={ref}
                          key={ListItem.list_id}
                          style={{
                            padding: '5px',
                          }}>
                          <ListCard listItem={ListItem} vectorList={true}/>
                        </div>
                      ))}
                  </div>
                </div>
              : ""
            }
    </>
  );

  return (
    <PageLayout 
        childrenContentPrincipal={childrenContentPrincipal}
        titulo="Listas"
    />
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getListRequest: () => dispatch(getListRequest(dispatch)),
    postListRequest: () => dispatch(postListRequest(dispatch)),
    getIndexListRequest: () => dispatch(getIndexListRequest(dispatch)),
  };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    listUserItems: store.list,
    postList: store.postList,
    loginObject: store.loginObjectState,
    postIssuer: store.postIssuer,
    deleteIssuer: store.deleteIssuer,
    deleteList: store.deleteList,
    indexItems: store.indexList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);