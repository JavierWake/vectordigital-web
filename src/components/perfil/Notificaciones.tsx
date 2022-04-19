import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useHistory, useParams } from 'react-router-dom';
import { Input } from 'reactstrap';
import Appbar from './../Appbar';
import Sidebar from './../Sidebar';
import parse, { HTMLReactParserOptions } from "html-react-parser";
import CircularProgress from "@material-ui/core/CircularProgress";

//Containers
import MenuPerfil from '../../containers/perfil/MenuPerfil';
// import { SwitchComponent } from '../../containers/SwitchComponent';
import { CustomMUISwitch } from '../../containers/CustomMuiSwitch';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';


//Actions
import { getServiciosRequest } from '../../actions/getServiciosAction';
import { putServiciosRequest } from '../../actions/putServiciosAction';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

//Types
import { LoginObjectResponse, LoginObjectState } from "../../types/LoginObjectTypes";
import { ServiciosStatus } from '../../types/GetServiciosTypes';
import { PutServiciosStatus } from '../../types/PutServiciosTypes';

//Mocks
import { appBarMockData } from '../../mocks/Appbar';
import { off } from 'process';

interface propsFromState {
    loginObject: LoginObjectState;
    serviciosGet: ServiciosStatus;
    serviciosPut: PutServiciosStatus;
}

type AllProps = propsFromState; 


const Notificaciones: React.FC<AllProps> = ({ loginObject, serviciosGet, serviciosPut }) => {

    const dispatch = useDispatch();  
    const history = useHistory();

    const idLORef = useRef("");
    const tokenLORef = useRef("");
    const canalRef = useRef("");
    const cuentaLORef = useRef("");
    const cuentaSesionLORef = useRef(0);
    let arraySuscrito:any = [];
    const titles: string[] = ["Depósitos y Retiros", "Órdenes de Capitales", "Órdenes de Fondos"];

    const [ready, setReady] = useState(false);
    const [todo, setTodo] = useState(false);
    const [suscrito, setSuscrito] = useState<any>([]);
    const [suscritoOrigin, setSuscritoOrigin] = useState<any>([]);
    const [seccionPush, setSeccionPush] = useState(serviciosGet.pushSeccion);
    const [seccionEmail, setSeccionEmail] = useState(serviciosGet.emailSeccion);
    const [seccionPushOrigin, setSeccionPushOrigin] = useState(serviciosGet.pushSeccion);
    const [seccionEmailOrigin, setSeccionEmailOrigin] = useState(serviciosGet.emailSeccion);
    const [seccionWha, setSeccionWha] = useState(serviciosGet.whaSeccion);
    const [originNotificaciones, setOriginNotificaciones] = useState<any>([]);
    const [notificaciones, setNotificaciones] = useState<any>([]);
    const [canalPush, setCanalPush] = useState<any>();
    const [canalEmail, setCanalEmail] = useState<any>();
    const [canalWha, setCanalWha] = useState<any>();
    const [disableButton, setDisableButton] = useState(true);
    const [push, setPush] = useState([]);
    const [email, setEmail] = useState([]);
    const [wha, setWha] = useState([]);

    useEffect(() => {
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                    idLORef.current = idLO.toString();
                    tokenLORef.current = tokenLO;
                    canalRef.current = canal;
                    cuentaLORef.current = cuentaLO;
                    cuentaSesionLORef.current = cuentaSesionLO;

                    let message = "servicios";
                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    let a = { message, params }
                    dispatch(getServiciosRequest(a));
                    setReady(true);
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en issuerprofile, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            if(loginObject.response.ierror === 92) {
              dispatch(postLoginObjectLogout());
              history.push("/");
            } else {
              //el usuario no esta loggeado, lo mandamos al login
              console.log("usuario no loggeado en appbar, lo mandamos al login");
              history.push("/");
            }
        }
    },[]);

    useEffect(() => {
        if(ready) {
            let canalP = serviciosGet.response.dsServicios.tdsCanal.find(data => data.IdCanal === 104);
            if(canalP) {
                setCanalPush(canalP.IdCanal) 
            }    
            let canalE = serviciosGet.response.dsServicios.tdsCanal.find(data => data.IdCanal === 100);
            if(canalE) {
                setCanalEmail(canalE.IdCanal); 
            }
            let canalW = serviciosGet.response.dsServicios.tdsCanal.find(data => data.IdCanal === 103); 
            if(canalW) {
                setCanalWha(canalW.IdCanal);
            }
            setNotificaciones(serviciosGet.response.dsServicios.tdsServicios);
            setOriginNotificaciones(serviciosGet.response.dsServicios.tdsServicios);
            setSeccionEmail(serviciosGet.emailSeccion);
            setSeccionPushOrigin(serviciosGet.pushSeccion);
            setSeccionPush(serviciosGet.pushSeccion);
            setSeccionEmailOrigin(serviciosGet.emailSeccion);
            setSeccionWha(serviciosGet.whaSeccion);
            setTodo(serviciosGet.pushSeccion && serviciosGet.emailSeccion && serviciosGet.whaSeccion);

            // let arrayNot:any = [...notificaciones]
            // serviciosGet.response.dsServicios.tdsServicios.map((row, i) => {
            //     arrayNot.push(row);
            // })
            // setNotificaciones(arrayNot)

            // let arrayNotOr:any = [...originNotificaciones];
            // serviciosGet.response.dsServicios.tdsServicios.map((row, i) => {
            //     arrayNotOr.push(row);
            // })
            // setOriginNotificaciones(arrayNotOr);

            let pushIn: any = [];
            serviciosGet.response.dsServicios.tdsServicios.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                pushIn.push({[key]: row.activoVMovil})

            })
            setPush(pushIn);

            let emailIn: any = [];
            serviciosGet.response.dsServicios.tdsServicios.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                emailIn.push({[key]: row.activoCorreo})

            })
            setEmail(emailIn);

            let whaIn: any = [];
            whaIn = serviciosGet.response.dsServicios.tdsServicios.filter(row => row.IdServicio === 1400 );
            setWha(whaIn);

            setDisableButton(true);
            
        }

    },[serviciosGet.loading]);


    const sendTodo = (check: boolean) => {
        if(ready) {
            let notifTemporal: any = [...notificaciones];
            setTodo(check);
            setSeccionPush(check);
            setSeccionEmail(check);
            setSeccionWha(check);
            let array = notifTemporal;
            var foundIndex1 = array.findIndex(x => x.IdServicio === 1000);
            notifTemporal[foundIndex1].activoVMovil = check;
            notifTemporal[foundIndex1].activoCorreo = check;
            var foundIndex2 = array.findIndex(x => x.IdServicio === 1100);
            notifTemporal[foundIndex2].activoVMovil = check;
            notifTemporal[foundIndex2].activoCorreo = check;
            var foundIndex3 = array.findIndex(x => x.IdServicio === 1200);
            notifTemporal[foundIndex3].activoVMovil = check;
            notifTemporal[foundIndex3].activoCorreo = check;
            var foundIndex4 = array.findIndex(x => x.IdServicio === 1400);
            notifTemporal[foundIndex4].activoWhatsApp = check;
            setNotificaciones(notifTemporal);
        }
    };


    const sendSeccion = (check: boolean, type: string) => {
        if(type === "push") {
            let notifTemporal: any = [...notificaciones];
            setSeccionPush(check);
            notifTemporal.filter(row => row.IdServicio !== 1400 ).map((row) => {
                row.activoVMovil = check;
            })
            let filter: any = suscrito.filter(row => row.IdCanal !== canalPush )
            setNotificaciones(notifTemporal);
            setSuscrito(filter);
        }
        if(type === "email") {
            let notifTemporal: any = [...notificaciones];
            setSeccionEmail(check);
            notifTemporal.filter(row => row.IdServicio !== 1400 ).map((row) => {
                row.activoCorreo = check;
            })
            let filter: any = suscrito.filter(row => row.IdCanal !== canalEmail )
            setNotificaciones(notifTemporal);
            setSuscrito(filter);
        }
    };
    
    const sendChange = (check: boolean, id:number, canal: number) => {
        if(ready) {
            let objeto: any;
            let notifTemporal: any = [...notificaciones];
            var foundIndexNotif = notifTemporal.findIndex(x => x.IdServicio === id);
            if(canal == canalEmail) {
                notifTemporal[foundIndexNotif].activoCorreo = check;
            }
            if(canal == canalPush) {
                notifTemporal[foundIndexNotif].activoVMovil = check;
            }
            if(canal === canalWha) {
                notifTemporal[foundIndexNotif].activoWhatsApp = check;
            }
            setNotificaciones(notifTemporal);
            let arraySus = [...suscrito];
            objeto = { "IdServicio": id, "IdCanal": canal, "Activo": check };
            var foundIndexID;
            if(suscrito.length === 0)  {
                setSuscrito([objeto]);
            } else {
                foundIndexID = suscrito.findIndex(x => x.IdServicio === id);
                if(foundIndexID === -1) {
                    setSuscrito([...suscrito, objeto]);
                } else {
                    suscrito.map((row,i) => {
                        if(row.IdServicio === id) {
                            if(row.IdCanal !== canal) {
                                setSuscrito([...suscrito, objeto]);
                            } else {
                                if(row.Activo !== check) {
                                    arraySus[i] = {
                                        ...arraySus[i],
                                        Activo: check
                                    }
                                    setSuscrito(arraySus);                         
                                }
                            }
                        }
                    })
                }
            }
        }
    };
    
    useEffect(() => {
        if(ready) {
            let push: any = suscrito.filter(function(value) { return value.IdCanal === canalPush });
            let checkPushTrue: any = push.filter(function(value) { return value.Activo === true });
            let checkPushFalse: any = push.filter(function(value) { return value.Activo === false });
            if(checkPushTrue.length === 3) {
                setSeccionPush(true);
            }
            if(checkPushFalse.length === 3) {
                setSeccionPush(false);
            }


            let email: any = suscrito.filter(function(value) { return value.IdCanal === canalEmail });
            let checkEmailTrue: any = email.filter(function(value) { return value.Activo === true });
            let checkEmailFalse: any = email.filter(function(value) { return value.Activo === false });
            if(checkEmailTrue.length === 3) {
                setSeccionEmail(true);
            } 
            if(checkEmailFalse.length === 3) {
                setSeccionEmail(false);
            }

            let wha: any = suscrito.filter(function(value) { return value.IdCanal === canalWha });
            if(wha.length > 0) {
                if(wha[0].Activo) {
                    setSeccionWha(true);
                } else {
                    setSeccionWha(false);
                }
            }
        }
    },[suscrito]);

    useEffect(() => {
        if(suscrito.length > 0) {
            let origin = originNotificaciones;
            var foundIndexID;
            let objeto;
            let arrayOrigin:any = [];
            suscrito.map((row,i) => {
                foundIndexID = origin.findIndex(x => x.IdServicio === row.IdServicio);
                if(row.IdCanal === canalEmail) {
                    arrayOrigin.push({ "IdServicio": origin[foundIndexID].IdServicio, "IdCanal": row.IdCanal, "Activo": origin[foundIndexID].activoCorreo  })
                }
                if(row.IdCanal === canalPush) {
                    arrayOrigin.push({ "IdServicio": origin[foundIndexID].IdServicio, "IdCanal": row.IdCanal, "Activo": origin[foundIndexID].activoVMovil })
                }
                if(row.IdCanal === canalWha) {
                    arrayOrigin.push({ "IdServicio": origin[foundIndexID].IdServicio, "IdCanal": row.IdCanal, "Activo": origin[foundIndexID].activoWhatsApp  })
                }            
            })
            setSuscritoOrigin(arrayOrigin);
            
            let pushNotif: any = [];
            notificaciones.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                pushNotif.push({[key]: row.activoVMovil})

            })

            let emailPush: any = [];
            notificaciones.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                emailPush.push({[key]: row.activoCorreo})

            })

            let whaPush :any = [];
            whaPush = serviciosGet.response.dsServicios.tdsServicios.filter(row => row.IdServicio === 1400 );

            let checkDisable = (JSON.stringify(push) === JSON.stringify(pushNotif)) && (JSON.stringify(email) === JSON.stringify(emailPush)) && (JSON.stringify(whaPush) === JSON.stringify(wha));
            setDisableButton(checkDisable);
        }
    },[suscrito]);

    const handleSubmit = (e:any) => {
        
        let todos: boolean = serviciosGet.pushSeccion &&  serviciosGet.emailSeccion && serviciosGet.whaSeccion;
        let message:string;
        let params = [ canalRef.current, cuentaSesionLORef.current, tokenLORef.current,  idLORef.current ];
        let all: boolean;
        let a: any;

        console.log("handle submit")

        if(todos !== todo) {
            message = "servicios/notificaciones?idcanal=&activo="+todo;
            all = true;
            a = { message, params, all };
            dispatch(putServiciosRequest(a));
        } else {
            
            if(!disableButton) {
                let suscritoOld = [...suscrito];
                message = "servicios/notificaciones";
                all = false;
                let tdsServicios = suscrito;
                a = { message, params, all, tdsServicios };
                dispatch(putServiciosRequest(a));
                setSuscritoOrigin(suscritoOld);
            }

            if(seccionEmail !== seccionEmailOrigin) {
                message = "servicios/notificaciones?idcanal="+canalEmail+"&activo="+seccionEmail;
                all = true;
                a = { message, params, all };
                dispatch(putServiciosRequest(a));
                setSeccionEmailOrigin(seccionEmail);
            }

            if(seccionPush !== seccionPushOrigin) {
                message = "servicios/notificaciones?idcanal="+canalPush+"&activo="+seccionPush;
                all = true;
                a = { message, params, all };
                dispatch(putServiciosRequest(a));
                setSeccionPushOrigin(seccionPush);
            }

        }
    }

    useEffect(() => {

        if(!serviciosPut.loading && (serviciosPut.response.ierror !== 0)) {
            let message = "servicios";
            let params = [ canalRef.current, cuentaSesionLORef.current, tokenLORef.current,  idLORef.current ];
            let a = { message, params }
            dispatch(getServiciosRequest(a));
        }

        if(!serviciosPut.loading && (serviciosPut.response.ierror === 0)) {
            let pushNotif: any = [];
            notificaciones.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                pushNotif.push({[key]: row.activoVMovil})

            })
            setPush(pushNotif);

            let emailPush: any = [];
            notificaciones.filter(row => row.IdServicio !== 1400 ).map((row, i) => {
                let key = row.IdServicio.toString();
                emailPush.push({[key]: row.activoCorreo})

            })
            setEmail(emailPush)

            let whaPush :any = [];
            whaPush = serviciosGet.response.dsServicios.tdsServicios.filter(row => row.IdServicio === 1400 );
            setWha(whaPush)

            setDisableButton(!disableButton);
        }

    },[serviciosPut.loading]);
    
    let childrenContentIzquierda = (
        <>
            <MenuPerfil />
        </>
    );

    let childrenContentPrincipal = (
        <>
            {
                serviciosGet.loading ?
                    <div className="text-center h-96 my-4">
                        <CircularProgress style={{ color: "#FF5000" }} />
                    </div>
                :
                    <div className="content">
                        {
                            <div className="section"> 
                                <div className="header flex justify-between items-center border-b border-gray-300 my-4 pb-2">
                                    <div className="title w-1/3">
                                        <h2 className="font-medium text-lg">Push</h2>
                                    </div>
                                    <div className="flex w-2/3">
                                        <div className="flex flex-grow items-center">
                                            <CustomMUISwitch 
                                                checked = {todo}
                                                sendChecked = {(isChecked: boolean) => sendTodo(isChecked)}
                                                isNotif = {true}
                                            />
                                            <div className="text-sm text-gray-400 ml-3">Seleccionar todo</div>
                                        </div>
                                        <div className="flex flex-grow items-center">
                                            <CustomMUISwitch 
                                                checked = {seccionPush}
                                                sendChecked = {(isChecked: boolean) => sendSeccion(isChecked, "push")}
                                                isNotif = {true}
                                            />
                                            <div className="text-sm text-gray-400 ml-3">Seleccionar sección</div>
                                        </div>
                                        <div className='flex-grow'>
                                            {
                                                !disableButton ?
                                                    <button
                                                        disabled={false} 
                                                        className="bg-red-600 py-1 px-3 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                        onClick={handleSubmit}
                                                    >
                                                        Guardar cambios
                                                    </button>
                                                :
                                                    <button disabled={true} className="bg-gray-350 py-1 px-3 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                        Guardar cambios
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                </div>


                                <div className="itmes ">
                                    
                                    <div className="subtitle my-4 text-md font-bold text-red-600">
                                        <p>Mi cuenta</p>
                                    </div>

                                    { 
                                        notificaciones.filter(row => row.descripcion === titles[0] ).map((row:any, i:any) => {
                                            return(
                                                <div className="item flex mb-4 items-start">
                                                    <div className="desc-item w-2/3">
                                                        <p className="text-sm mb-2">{row.descripcion}</p>
                                                        <p className="text-xs text-gray-400">{row.subtext}</p>
                                                    </div>
                                                    <div className="mr-2">
                                                        <CustomMUISwitch 
                                                            checked = {row.activoVMovil}
                                                            sendChecked = {(isChecked: boolean) => sendChange(isChecked, row.IdServicio, canalPush)}
                                                            isNotif = {true}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }


                                    <div className="subtitle my-4 text-md font-bold text-red-600">
                                        <p>Mi posición</p>
                                    </div>

                                    {
                                        notificaciones.filter(row => row.descripcion === titles[1] || row.descripcion === titles[2] ).map((row:any, i:any) => {
                                            return(
                                                <div className="item flex mb-4 items-start">
                                                    <div className="desc-item w-2/3">
                                                        <p className="text-sm mb-2">{row.descripcion}</p>
                                                        <p className="text-xs text-gray-400">{row.subtext}</p>
                                                    </div>
                                                    <div className="mr-2">
                                                        <CustomMUISwitch 
                                                            checked = {row.activoVMovil}
                                                            sendChecked = {(isChecked: boolean) => sendChange(isChecked, row.IdServicio, canalPush)}
                                                            isNotif = {true}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    
                                </div>

                            </div>
                        }
                        {                                      
                            <div className="section">
                                <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                                    <div className="title w-2/3">
                                        <h2 className="font-medium text-lg">E-mail</h2>
                                    </div>
                                    <div className="flex w-1/3">
                                        <div className="flex items-center">
                                            <CustomMUISwitch 
                                                checked = {seccionEmail}
                                                sendChecked = {(isChecked: boolean) => sendSeccion(isChecked, "email")}
                                                isNotif = {true}
                                            />
                                            <div className="text-sm text-gray-400 ml-3">Seleccionar sección</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="itmes ">
                                    <div className="subtitle my-4 text-md font-bold text-red-600">
                                        <p>Mi cuenta</p>
                                    </div>

                                    {
                                        notificaciones.filter(row => row.descripcion === titles[0] ).map((row:any, i:any) => {
                                            return(
                                                <div className="item flex mb-4 items-start">
                                                    <div className="desc-item w-2/3">
                                                        <p className="text-sm mb-2">{row.descripcion}</p>
                                                        <p className="text-xs text-gray-400">{row.subtext}</p>
                                                    </div>
                                                    <div className="mr-2">
                                                        <CustomMUISwitch 
                                                            checked = {row.activoCorreo}
                                                            sendChecked = {(isChecked: boolean) => sendChange(isChecked, row.IdServicio, canalEmail)}
                                                            isNotif = {true}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }


                                    <div className="subtitle my-4 text-md font-bold text-red-600">
                                        <p>Mi posición</p>
                                    </div>

                                    {
                                        notificaciones.filter(row => row.descripcion === titles[1] || row.descripcion === titles[2] ).map((row:any, i:any) => {
                                            return(
                                                <div className="item flex mb-4 items-start">
                                                    <div className="desc-item w-2/3">
                                                        <p className="text-sm mb-2">{row.descripcion}</p>
                                                        <p className="text-xs text-gray-400">{row.subtext}</p>
                                                    </div>
                                                    <div className="mr-2">
                                                        <CustomMUISwitch 
                                                            checked = {row.activoCorreo}
                                                            sendChecked = {(isChecked: boolean) => sendChange(isChecked, row.IdServicio, canalEmail)}
                                                            isNotif = {true}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    
                                </div>

                            </div>
                        }
                        {
                            <div className="section">
                                <div className="header flex justify-between items-center border-b border-gray-300 mb-4 pb-2">
                                    <div className="title">
                                        <h2 className="font-medium text-lg">Whatsapp</h2>
                                    </div>
                                </div>

                                {
                                    notificaciones.filter(row => row.IdServicio === 1400 ).map((row:any, i:any) => {
                                        return(
                                            <div className="item flex mb-4 items-start">
                                                <div className="desc-item w-2/3">
                                                    <p className="text-sm mb-2">{parse(row.nombre)}</p>
                                                </div>
                                                <div className="mr-2">
                                                    <CustomMUISwitch 
                                                        checked = {row.activoWhatsApp}
                                                        sendChecked = {(isChecked: boolean) => sendChange(isChecked, row.IdServicio, canalWha)}
                                                        isNotif = {true}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        } 
                    </div>
            }
        </>
    );

    return(
        <PageLayout 
            childrenContentIzquierda={childrenContentIzquierda}
            childrenContentPrincipal={childrenContentPrincipal}
            titulo="Notificaciones"
        />
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        serviciosGet: store.servicios,
        serviciosPut: store.putServicios,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getServiciosRequest: () => dispatch(getServiciosRequest),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones);