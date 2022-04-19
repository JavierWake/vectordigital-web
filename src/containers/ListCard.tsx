import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from "../reducers/rootReducer";
import { useHistory } from 'react-router-dom'

//Containers
import Loading from '../components/Loading';
import { SearchConfigVA } from '../containers/SearchConfigVA';
import { DataSearchAppbar } from '../containers/SearchAppbar';
import { Alert } from 'reactstrap';

//Action
import { postListRequest } from "../actions/postListAction"
import { deleteListRequest } from "../actions/deleteListAction";
import { getCatalogoEmisorasRequest } from "../actions/getCatalogoEmisorasAction";
import { postIssuerRequest } from '../actions/PostIssuerAction';
import { deleteIssuerRequest } from '../actions/deleteIssuerAction';
import { getListRequest } from '../actions/listAction';
import { getStationListRequest } from "../actions/StationListActions";
import { getListIssuerRequest } from '../actions/ListIssuerAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types
import { IList, ListState } from '../types/ListTypes';
import { IListIndex } from '../types/IndexList';
import { IStationList } from '../types/StationListTypes';
import { PostListState } from "../types/PostList";
import { DeleteListState } from "../types/DeleteListTypes";
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { PostIssuerState } from '../types/PostIssuerTypes';
import { LoginObjectState } from "../types/LoginObjectTypes";
import { DeleteIssuerState } from '../types/DeleteIssuerTypes';
import { ListIssuerState } from '../types/ListIssuer';

//Style
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Popover from '@mui/material/Popover';
import { MdClose } from "react-icons/md";


interface propsFromState {

  listItem: IList | IListIndex;
  postList: PostListState;
  StationItems: IStationList[];
  deleteList: DeleteListState;
  catalogoEmisorasRespuesta: CatalogoEmisorasState;
  postIssuer: PostIssuerState;
  deleteIssuer: DeleteIssuerState;
  loginObject?: LoginObjectState;
  listIssuer: ListIssuerState;
  vectorList: boolean;
}

type AllProps = propsFromState;


const ListCard: React.FC<AllProps> = ({ listItem, catalogoEmisorasRespuesta,  deleteIssuer, loginObject, listIssuer, vectorList }) => {

  const dispatch = useDispatch();
  const cuentaRef = useRef("");
  const idRef = useRef("");
  let cuentaLO = "";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [agregarEmisora, setAgregarEmisora] = useState(false);
  const [deleteIssuerModal, setDeleteIssuerModal] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [issuerName, setIssuerName] = useState("");
  const catalogoEmisoraFilter = useRef<any>();
  const history = useHistory();
  const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);
  const [listaEmisorasSearch, setListaEmisorasSearch] = useState<any>([]);
  const [listaEmisoras, setListaEmisoras] = useState<any>([]);

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

          cuentaRef.current = cuentaLO;
          idRef.current = idLO;
          let messageList = "lista/" + cuentaRef.current;
          dispatch(getListRequest({ message: messageList, id: idRef.current }));
        }

        setReady(true);

      }
      else {
        //el usuario no esta loggeado, lo mandamos al login
        history.push("/");
      }
    }
    else {
      if(loginObject?.response.ierror === 92) {
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
    if (ready) {
      if (catalogoEmisorasRespuesta !== undefined) {
        if (catalogoEmisorasRespuesta.catalogoEmisorasRespuesta !== undefined) {
          if (catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0) {
            //el catalogo de emisoras no ha sido consultado
            //llamar dispatch para el catalogo de emisoras
            let message = "catalogo/emisora/catalogo";
            dispatch(getCatalogoEmisorasRequest({ message }));
          }
        }
      }
    }
    if(listItem.emisoras !== undefined){
      setListaCatEmisoras(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(x => !listItem.emisoras?.filter(y => y.ric === x.PrimaryRIC).length))
    }
  }, [catalogoEmisorasRespuesta.catalogoEmisorasRespuesta]);

  useEffect(() => {
    if(ready) {
      let listaEmisoras:any = [...listaEmisorasSearch];
      listItem.emisoras?.map((row, i) => {
        listaEmisoras.push(row.emisora+"."+row.serie);
      });
      setListaEmisorasSearch(listaEmisoras);
    }
  },[ready]);

  const handleDeleteIssuer = () => {
    let serie = "";
    if(issuerName.split(".")[1] !== "*") {
      serie = issuerName.split(".")[1];
    }
    let message = "lista/" + cuentaRef.current + "/" + listItem.list_id + "/" + issuerName.split(".")[0] + serie;
    dispatch(deleteIssuerRequest({ message, id: idRef.current }));
    let listaSearchDele = listaEmisorasSearch;
    let index = listaSearchDele.indexOf(issuerName);
    listaSearchDele.splice(index, 1);
    setListaEmisorasSearch(listaSearchDele);
    catalogoEmisoraFilter.current = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(x => !listItem.emisoras?.filter(y => y.ric === x.PrimaryRIC).length);
    setDeleteIssuerModal(false);
  };

  const handleDeleteList = () => {
    let message = "lista/" + cuentaRef.current + "/" + listItem.list_id;
    dispatch(deleteListRequest({ message, id: idRef.current }));
    setDeleteListModal(false);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

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

  const setUpList = (emisora: string, serie: string) => {

    setIssuerName(emisora+"."+serie);
    setDeleteIssuerModal(true);

  };

  useEffect(() => {
    if (!deleteIssuer.loading && ready) {
      let messageList = "lista/" + cuentaRef.current;
      dispatch(getListRequest({ message: messageList, id: idRef.current }));
    }
  }, [deleteIssuer.loading]);


  useEffect(() => {
    if (ready && catalogoEmisorasRespuesta != undefined) {
      if (catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined) {
        if (catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0) {
          //el catalogo ya tiene emisoras en su lista
          const catEmisorasSorted = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.sort((a, b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
          sendListaCatEmisoras(catEmisorasSorted);
        }
      }
    }
  }, [catalogoEmisorasRespuesta.loading, catalogoEmisorasRespuesta.message]);

  const sendIssuer = (ric: string) => {
    history.push("/emisora/" + ric);
  };

  const sendEmisora = (emisora: string, tipo: string) => {
    let listaSearch = listaEmisorasSearch;
    if (tipo === "agregar") {
      listaSearch.push(emisora)
      setListaEmisorasSearch(listaSearch);

      let e = emisora.split(".");
      if (e[1] == '*') {
        e[1] = "";
      }

      dispatch(postListRequest({ message: "lista/" + cuentaRef.current + "/" + listItem.list_id + "?ticker=" + e[0] + e[1], id: idRef.current }))
      setListaEmisoras(listaSearch);
    } else {
      // console.log("entre a eliminar emisiora");
      let listaSearchDele = listaEmisorasSearch;
      let index = listaSearchDele.indexOf(emisora);
      listaSearchDele.splice(index, 1);
      setListaEmisorasSearch(listaSearchDele);
      let serie = "";
      if(emisora.split(".")[1] !== "*") {
        serie = emisora.split(".")[1];
      }
      let message = "lista/" + cuentaRef.current + "/" + listItem.list_id + "/" + emisora.split(".")[0] + serie;
      dispatch(deleteIssuerRequest({ message, id: idRef.current }));
    }
    
  }

  const sendListaCatEmisoras = (data: Emisora[]) => {
    if (listaCatEmisoras === data) {
      return;
    }
    setListaCatEmisoras(data);
  };

  const searchDataObjectAppbar: DataSearchAppbar[] = [
    {
      id: "searchConfigVA",
      title: "Buscar una emisora",
      optionsEmisoras: listaCatEmisoras,
      noMatch: "No se encontró información",
      placeholder: "Buscar una emisora",
    },
  ];
  
  return (

    <div >
      <Card style={{ maxWidth: 285, minWidth: 285, }} >
        <CardHeader
          style = {{ minHeight: "6rem", maxHeight: "6rem" }}
          className="text-center"
          title={`${listItem.list_name}`}
          
          action={
            !vectorList ?
              <div>
                <Button onClick={handleClick}>
                  <MoreVertIcon />
                </Button>
                <Popover
                  id="PopOver"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography sx={{ p: 2 }}><Button onClick={() => {setDeleteListModal(true)}}>Eliminar lista</Button></Typography>
                  <Dialog
                    fullWidth
                    open={deleteListModal}
                    onClose={() => { setDeleteListModal(false); setAnchorEl(null); }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Typography textAlign="center">
                      <DialogTitle id="alert-dialog-title">
                        {"¿Desea eliminar la lista " + listItem.list_name + "?"}
                      </DialogTitle>
                    </Typography>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">

                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <div className="flex justify-between">
                        <Button onClick={() => { setDeleteListModal(false); setAnchorEl(null); }}>Cancelar</Button>
                        <Button onClick={handleDeleteList} autoFocus>
                          Eliminar
                        </Button>
                      </div>
                    </DialogActions>
                  </Dialog>
                </Popover>
              </div>
            : ""
          }
        />
        <CardContent>
          <CardActions disableSpacing>
            <Typography variant="body2" color="text.secondary" textAlign="center" fontSize="11px">
              {listItem.emisoras?.length} {listItem.emisoras? (listItem.emisoras?.length > 1 ? <span>Emisoras</span> : <span>Emisora</span>) : ""}
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={() => {setExpanded(!expanded)}}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography textAlign="center">
              {
                vectorList ? "" 
                :
                  <Button className="w-full  text-sm text-red-600 text-center" onClick={() => { setAgregarEmisora(true) }}>
                    Agregar emisora
                  </Button>
              }
            </Typography>
            <Dialog open={agregarEmisora} onClose={() => { setAgregarEmisora(false) }}>
              <DialogContent sx={{ mt: 2, minWidth: 480, minHeight: 250 }}>
                <div className='w-full'>
                  <div className="w-full flex justify-end mb-2 cursor-pointer hover:text-red-600" onClick={() => { setAgregarEmisora(false) }}>
                    <MdClose />
                  </div>
                  <SearchConfigVA searchData={searchDataObjectAppbar} listaEmisoras={listaEmisorasSearch} sendEmisora={(emisora, tipo) => sendEmisora(emisora, tipo)} />
                </div>
              </DialogContent>
            </Dialog>
            <div
              // if use custom scroll container, pass ref
              ref={ref}
              style={{
                overflowY: 'scroll',
                maxHeight: '200px',
                minHeight: '200px',
              }}
            >
              {<CardContent>
                {listItem.emisoras?.map((Station) => (
                  <div className="flex justify-between">
                    <Typography paragraph className="my-3">
                      <span className="cursor-pointer" onClick={() => sendIssuer(Station.ric)}>{Station.emisora + "." + Station.serie}</span>
                      <Typography variant="body2" color="text.secondary" textAlign="left" fontSize="11px">
                        {Station.name}
                      </Typography>
                    </Typography>
                    {
                      vectorList ? "" 
                      :
                        <Button onClick={() => setUpList(Station.emisora, Station.serie)} id={listItem.list_id}>
                          <DeleteOutlinedIcon />
                        </Button>
                    }
                    <Dialog
                      fullWidth
                      id={listItem.list_id}
                      open={deleteIssuerModal}
                      onClose={() => {setDeleteIssuerModal(false)}}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <Typography textAlign="center">
                        <DialogTitle id="alert-dialog-title" >
                          {"¿Eliminar emisora " + issuerName + "?"}
                        </DialogTitle>
                      </Typography>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <div className="flex justify-between">
                          <Button onClick={() => {setDeleteIssuerModal(false)}}>Cancelar</Button>
                          <Button onClick={handleDeleteIssuer} autoFocus>
                            Eliminar
                          </Button>
                        </div>
                      </DialogActions>
                    </Dialog>

                  </div>
                ))}
              </CardContent>
              }
            </div>
          </Collapse>
        </CardContent>
      </Card>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getListRequest: () => dispatch(getListRequest(dispatch)),
    getStationListRequest: () => dispatch(getStationListRequest(dispatch)),
    deleteListRequest: () => dispatch(deleteListRequest(dispatch)),
    getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
    postIssuerRequest: () => dispatch(postIssuerRequest(dispatch)),
    deleteIssuerRequest: () => dispatch(deleteIssuerRequest(dispatch)),
    postListRequest: () => dispatch(postListRequest(dispatch)),
    getListIssuerRequest: () => dispatch(getListIssuerRequest(dispatch)),
  };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    StationItems: store.StationList.StationList,
    postList: store.postList,
    deleteList: store.deleteList,
    catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
    postIssuer: store.postIssuer,
    deleteIssuer: store.deleteIssuer,
    loginObject: store.loginObjectState,
    listIssuer: store.listIssuer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);