import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { useHistory, NavLink } from "react-router-dom";
import parse from "html-react-parser";

import Appbar from "./../Appbar";
import { appBarMockData } from "../../mocks/Appbar";

import MenuPerfil from "../../containers/perfil/MenuPerfil";

import { MdDoneAll } from "react-icons/md";
import { postEmail_PhoneSend } from "../../actions/postEmail_PhoneAction";
import { Email_PhoneState } from "../../types/Email&PhoneType";

import { getCelularRequest } from "../../actions/getCelularAction";
import { getEmailRequest } from "../../actions/getEmailAction";

import { postRecupera_ValidaSend } from "../../actions/RecuperaValidaAction";
import { Recupera_ValidaState } from "../../types/RecuperaValidaTypes";
import { postRecupera_ActualizaSend } from "../../actions/RecuperaActualizaAction";
import { Recupera_ActualizaState } from "../../types/RecuperaActualizaType";

import { postPasswordPostSend } from "../../actions/PasswordPostAction";
import { PasswordPostState } from "../../types/PasswordPostType";

import { getPasswordGetRequest, getPasswordReset } from "../../actions/PasswordGetAction";
import { PasswordGetState } from "../../types/PasswordGetType";
/* import ReactCodeInput from "react-code-input"; */
import "../../styles/inputCode.css";
import { FcCheckmark } from "react-icons/fc";
import {FcHighPriority} from "react-icons/fc"

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { LoginObjectState } from "../../types/LoginObjectTypes";
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

import "../../styles/buton.css";
import Sidebar from "../Sidebar";
import { FooterComponent } from "../../containers/FooterComponent";
import Loading from "../Loading";
import PageLayout from "../../containers/layout/PageLayout";

interface propsFromState {
  authIdentifica: Email_PhoneState;
  Recupera_Valida: Recupera_ValidaState;
  Recupera_Actualiza: Recupera_ActualizaState;
  PasswordPost: PasswordPostState;
  PasswordGet: PasswordGetState;
  loginObject: LoginObjectState;
}

type AllProps = propsFromState;

const CORRECT_PIN_CODE = "12345678";

const Password: React.FC<AllProps> = ({
  PasswordPost,
  PasswordGet,
  loginObject,
}) => {
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [sendPassword, setSendPassword] = useState(false);

  // Password Validation
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
    actualPassword: "",
  });

  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [sequencialNumber, setsequencialNumber] = useState(false);
  const [consecutiveNumber, setConsecutiveNumber] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(6);

  const [actualP, setActualP] = useState("");
  const [newP, setNewP] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [aceptar, setAceptar] = useState(false);

  const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { value, name } = event.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  const handleClose = () => {
    setOpen(false);
    if (PasswordPost.respuesta.ierror === -1) {
      //setMensaje("Aviso");
      /* console.log("aviso");
      console.log(PasswordPost); */
      history.push("/perfil");
    } else {
      //setMensaje("Error");
      /* console.log("error");
      console.log(PasswordPost); */
      window.location.reload();
    }
  };

  const checkPinCode = () => {
    const isPinCodeValid = pinCode === CORRECT_PIN_CODE;

    setBtnIsPressed(true);
    setIsPinCodeValid(isPinCodeValid);
    if (!isPinCodeValid) setPinCode("");
  };
  const checkPass = (e: any) => {
    e.preventDefault();
    setOpen(true);
    if (
      validLength === true &&
      upperCase === true &&
      lowerCase === true &&
      hasNumber === true &&
      match === true &&
      specialChar === true &&
      sequencialNumber === true &&
      !consecutiveNumber === true
    ) {
      setActualP(password.actualPassword);
      setNewP(password.firstPassword);
      setConfirmP(password.secondPassword);
      setAceptar(true);
      setSendPassword(true);
    }
  };

  const handlePinChange = (pinCode) => {
    setPinCode(pinCode);
    setBtnIsPressed(false);
  };

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [key, setKey] = useState("");

  const dispatch = useDispatch();
  const cuentaRef = useRef("");
  const idRef = useRef("");
  const tokenRef = useRef("");

  useEffect(() => {
    if (loginObject.response.ierror === -1) {
      if (loginObject.response.dsLogin.tdsLogin.length > 0) {
        const cuentaSesionLO =
          loginObject.response.dsLogin.tdsLogin[0].cuentasesion;

        if (cuentaSesionLO != 0) {
          // mandamos llamar las apis sacando los datos del objeto de login

          const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
          const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
          const canal = "999";
          const cuentaLO =
            loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

          cuentaRef.current = cuentaSesionLO.toString();
          idRef.current = idLO.toString();
          tokenRef.current = tokenLO;
        }
      } else {
        //el usuario no esta loggeado, lo mandamos al login
        history.push("/");
      }
    } else {
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

  function test(s) {
    // Check for sequential numerical characters
    for(var i in s) 
        if (+s[+i+1] == +s[i]+1 && 
            +s[+i+2] == +s[i]+2) return false;
    // Check for sequential alphabetical characters
    for(var i in s) 
        if (String.fromCharCode(s.charCodeAt(i)+1) == s[+i+1] && 
            String.fromCharCode(s.charCodeAt(i)+2) == s[+i+2]) return false;
    return true;
}

  useEffect(() => {
    setValidLength(
      password.firstPassword.length >= requiredLength ? true : false
    );
    setUpperCase(
      password.firstPassword.toLowerCase() !== password.firstPassword
    );
    setLowerCase(
      password.firstPassword.toUpperCase() !== password.firstPassword
    );
    setHasNumber(/\d/.test(password.firstPassword));
    setMatch(
      !!password.firstPassword &&
      password.firstPassword === password.secondPassword
    );
    setSpecialChar(
      /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword)
    );
    setsequencialNumber(
      test(password.firstPassword)
    );
    setConsecutiveNumber(
      /(aaa|bbb|ccc|ddd|eee|fff|ggg|hhh|iii|jjj|kkk|lll|mmm|nnn|ooo|ppp|qqq|rrr|sss|ttt|uuu|vvv|www|xxx|yyy|zzz|000|111|222|333|444|555|666|777|888|999|101010)+/.test(password.firstPassword)
    )
  }, [password, requiredLength]);
  console.log("esto es lo que me trae consecutive number", consecutiveNumber);

  useEffect(() => {
    let message = "password";
    let params = ["999", cuentaRef.current, tokenRef.current, idRef.current];
    let a = { message, params };
    dispatch(getPasswordGetRequest(a));
  }, []);
  useEffect(() => {
    if (sendPassword === true) {
      let message = "password";
      let params = [
        "999",
        cuentaRef.current,
        tokenRef.current,
        idRef.current,
        actualP,
        newP,
        confirmP,
      ];
      let a = { message, params };
      dispatch(postPasswordPostSend(a));
      dispatch(getPasswordReset({ hacerResetDelEstado: true }));
    }
  }, [sendPassword]);

  if (pinCode.length == 8)
    while (PasswordGet.respuesta.ierror != 0) {
      return (
        <div className="bg-gray-100">
          <Appbar appBarData={appBarMockData} />

          <div className="flex-auto">
            <div className="flex flex-row">
              <div className="w-1/12 h-full">
                <Sidebar />
              </div>
              <div className="flex w-11/12 flex-wrap my-20 ">
                <MenuPerfil></MenuPerfil>
                <div className="w-8/12 pr-10">
                  <div className="title mb-10">
                    <h2 className="font-mono font-medium text-3xl">
                      Datos Personales
                    </h2>
                  </div>
                  <div className="content">
                    <div className="title mb-4">
                      <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">
                        Contraseña
                      </h2>
                    </div>
                    <div className="form">
                      <form action="#">
                        <div className="inputs flex justify-between flex-column"></div>
                        <div className="flex justify-end mt-10 pr-5">
                          <a
                            href="/perfil"
                            className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                          >
                            Cancelar
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  let childrenContentIzquierda = (
    <>
      <MenuPerfil />
    </>
  );

  let childrenContentPrincipal = (
    <>
      <div className="content">
        <div className="title my-4">
          <h2 className="font-medium text-lg pb-2 border-b border-gray-300">
            Contraseña
          </h2>
        </div>

        <div className="form">
          <form action="#">
            <div className="inputs flex justify-between flex-column">
              {/*                                          <div className="flex justify-between items-center w-100 pr-5 pl-3 mb-6">
                                    <label htmlFor="" className="font-sans font-bold text-sm border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600">Introducir clave que llegará a tu correo</label>
                                    <ReactCodeInput 
                                        name={"OTP"}
                                        isValid={isPinCodeValid}
                                        fields={8}
                                        onChange={handlePinChange}
                                        value={pinCode}
                                        inputMode={'numeric'}
                                        type={'text'}
                                        disabled={true}/>
                                </div> */}

              <div className="flex justify-between items-center w-100 pr-5 pl-3 mb-6">
                <label
                  htmlFor=""
                  className="font-sans font-bold text-sm"
                >
                  Contraseña Actual
                </label>
                <input
                  required
                  type="password"
                  className="font-sans text-sm p-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent"
                  name="actualPassword"
                  onChange={inputChange}
                />
              </div>

              <div className="flex justify-between items-center w-100 pr-5 pl-3 mb-6">
                <label
                  htmlFor=""
                  className="font-sans font-bold text-sm"
                >
                  Contraseña Nueva
                </label>
                <input
                  required
                  type="password"
                  className="font-sans text-sm p-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent"
                  name="firstPassword"
                  onChange={inputChange}
                />
              </div>

              <div className="flex justify-between items-center w-100 pr-5 pl-3 mb-6">
                <label
                  htmlFor=""
                  className="font-sans font-bold text-sm"
                >
                  Confirmar Contraseña
                </label>
                <input
                  required
                  type="password"
                  className="font-sans text-sm p-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent"
                  name="secondPassword"
                  onChange={inputChange}
                />
              </div>
            </div>

            <div className="info--pass">
              <div className="head mb-3 flex items-end">
                <MdDoneAll
                  style={{ width: "30px", height: "30px" }}
                  className="text-red-600"
                />
                <p className="font-sans text-red-600 font-base font-bold ml-2">
                  {" "}
                  Consideraciones
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <ul className="list-disc font-sans text-gray-400 text-sm">
                    <li className="break-words">Sensible a mayúsculas y minúsculas </li>
                    <li className="break-words">Válida por 4 meses</li>
                    <li className="break-words">
                      No se pueden utilizar las últimas 5 contraseñas <br />
                      previamente registradas
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">No más de 2 dígitos o caracteres <br /> consecutivos (123, ABC){" "}</p>
                        {sequencialNumber? "" : <FcHighPriority/>}
                      </div> 
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">No más de 2 dígitos o caracteres idénticos <br /> consecutivos (111, AAA){" "}</p>
                        {!consecutiveNumber ? "" : <FcHighPriority/>}
                      </div> 
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc font-sans text-gray-400 text-sm">
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Mayor a 6 digitos{" "}</p>
                        {validLength ? <FcCheckmark /> : <span></span>}
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Al menos una letra y un número{" "}</p>
                        {hasNumber ? (
                          <span>
                            <FcCheckmark />
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Al menos una mayúscula{" "}</p>
                        {upperCase ? (
                          <span>
                            <FcCheckmark />
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Al menos una minúscula{" "}</p>
                        {lowerCase ? (
                          <span>
                            <FcCheckmark />
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Al menos un caracter especial{" "}</p>
                        {specialChar ? (
                          <span>
                            <FcCheckmark />
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-row">
                        <p className="pr-3">Tienen que coincidir las contraseñas{" "}</p>
                        {match ? (
                          <span>
                            <FcCheckmark />
                          </span>
                        ) : (
                          <span></span>
                        )}
                        {" "}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-10 pr-5">
              <NavLink
                to="/perfil"
              >
                <div className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                  Regresar
                </div>
              </NavLink>
              {
                (
                  validLength === false ||
                  upperCase === false ||
                  lowerCase === false ||
                  hasNumber === false ||
                  match === false ||
                  specialChar === false ||
                  sequencialNumber === false ||
                  !consecutiveNumber === false
                ) ?
                  <button
                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                    disabled={true}
                  >
                    Aceptar
                  </button>
                  :
                  <button
                    className="w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                    onClick={checkPass}
                  >
                    Aceptar
                  </button>
              }
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                  {
                    PasswordPost.loading === true ?
                      <Loading />
                    :
                      <DialogContentText id="alert-dialog-description">
                        {parse(PasswordPost.respuesta.cerror)}
                      </DialogContentText>
                  }
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose}>Cancelar</Button> */}
                  <Button onClick={handleClose} autoFocus>
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </>
  )

  return (
    <PageLayout 
        childrenContentIzquierda={childrenContentIzquierda}
        childrenContentPrincipal={childrenContentPrincipal}
        titulo="Datos Personales"
    />
  );
};
const mapStateToProps = (store: RootState) => {
  return {
    /*     authIdentifica: store.authIdentifica,
        Recupera_Valida: store.Recupera_Valida,
        Recupera_Actualiza: store.Recupera_Actualiza, */
    getCelularRespuesta: store.getCelularRespuesta,
    getEmailRespuesta: store.getEmailRespuesta,
    PasswordPost: store.PasswordPost,
    PasswordGet: store.PasswordGet,
    loginObject: store.loginObjectState,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    postEmail_PhoneSend: () => dispatch(postEmail_PhoneSend(dispatch)),
    postRecupera_ValidaSend: () => dispatch(postRecupera_ValidaSend(dispatch)),
    postRecupera_ActualizaSend: () =>
      dispatch(postRecupera_ActualizaSend(dispatch)),
    postPasswordPostSend: () => dispatch(postPasswordPostSend(dispatch)),
    getCelularRequest: () => dispatch(getCelularRequest(dispatch)),
    getEmailRequest: () => dispatch(getEmailRequest(dispatch)),
    getPasswordGetRequest: () => dispatch(getPasswordGetRequest(dispatch)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Password);
