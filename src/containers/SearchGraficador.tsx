import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

import { MdClose, MdSearch } from "react-icons/md";
import { Emisora } from "../types/GetCatalogoEmisotasType";


export interface SearchGraficadorProps {
  searchData: DataSearchGraficador[];
  selectedOption: Emisora;
  sendOption : (data: Emisora) => void;
  side: boolean;
  doNotSendOptionOnOnChange: boolean | undefined;
  didUserSelectedOption: boolean;
  sendDidUserSelectedOption: (data: boolean) => void;
  seEnviaPrimeraEmisora: boolean;
  sendSeEnviaPrimeraEmisora: (data: boolean) => void;
}

export interface DataSearchGraficador {
  id: string;
  title: string;
  optionsEmisoras: Emisora[];
  noMatch: string;
  placeholder: string;
}
/* PENDIENTE: SEGUIR CON ESTA LOGICA Y PEGARLA AL BUSCADOR DEL APPBAR.TSX */
const SearchGraficador = ({ searchData, side, selectedOption, sendOption, doNotSendOptionOnOnChange, didUserSelectedOption, sendDidUserSelectedOption, seEnviaPrimeraEmisora, sendSeEnviaPrimeraEmisora }: SearchGraficadorProps) => {
  //console.log("entro a search de graficador");

  const [activeOption, setActiveOption] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<Emisora[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");//(selectedOption != undefined ? selectedOption.CommonName : "");
  const [onClickEnOpcion, setOnClickEnOpcion] = useState(false);

  const sendShowOptions = (data: boolean) => {
      if(showOptions === data){
          return;
      }
      setShowOptions(data);
  }

  const sendActiveOption = (data: number) => {
      if(activeOption === data){
          return;
      }
      setActiveOption(data);
  };

  const sendFilteredOptions = (data: Emisora[]) => {
      if(filteredOptions === data){
          return;
      }
      setFilteredOptions(data);
  };

  const sendUserInput = (data: string) => {
      if(userInput === data){
          return;
      }
      setUserInput(data);
  };

  const sendOnClickEnOpcion = (data: boolean) => {
      if(onClickEnOpcion === data){
          return;
      }
      setOnClickEnOpcion(data);
  }

  useEffect(() => {
    sendUserInput(selectedOption.CommonName);
  },[selectedOption.RIC]);

  //cada vez que cambiemos user input
  useEffect(() => {
    if(userInput.length > 0){
        //userInput tiene texto
        let filteredOptionsUserInput = searchData[0].optionsEmisoras.filter(
            (option: Emisora) => {
                //CORREGIR ESTA VALIDACION
                return (option.Emisora.toLowerCase() + "." + option.Serie.toLowerCase()).startsWith(userInput.toLowerCase()) || option.CommonName.toLowerCase().startsWith(userInput.toLowerCase());
            }
        );

        //hacemos sort por commonName
        filteredOptionsUserInput = filteredOptionsUserInput.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));

        if(filteredOptionsUserInput.length === 0){
            //lo que esta buscando el usuario no existe en la lista
            sendActiveOption(-1);
        }
        else{
            sendActiveOption(0);
        }

        if(doNotSendOptionOnOnChange === undefined){
          //no se envio este parametro y se va a cambiar el option confome el usuario va escribiendo caracteres
          //console.log("do not send undefined");
          sendOption(filteredOptionsUserInput[0]);
        }
        else{
          //el parametro si se envio, es posible que sea boolean
          if(doNotSendOptionOnOnChange === true){
            //NO se va a cambiar el option conforme el usuario va escribiendo, hasta que el usuario haga click en una opcion, o haga enter en una opcion
            //console.log("do not send true");
          }
          else{
            //SI se envio este parametro y SI se va a cambiar el option confome el usuario va escribiendo caracteres
            sendOption(filteredOptionsUserInput[0]);
            //console.log("do not send false");
          }
        }

        if(onClickEnOpcion === true){
            return;
        }

        sendFilteredOptions(filteredOptionsUserInput);

        if(seEnviaPrimeraEmisora){
            sendSeEnviaPrimeraEmisora(false);
        }
        else{
            if(didUserSelectedOption){
                sendDidUserSelectedOption(false);
                sendShowOptions(false);
            }
            else{
                sendShowOptions(true);
            }
            //sendShowOptions(true);
        }
    }
    else{
        //sendActiveOption(0);
        //sendFilteredOptions(searchData[0].optionsEmisoras);
        sendShowOptions(false);
    }
  }, [userInput]);

  const onChange = (e: any) => {
    //cambiamos userInput para que se active su useEffect
    sendOnClickEnOpcion(false);
    sendUserInput(e.currentTarget.value);
  };

  /*const onBlurInput = () => {
      //sendOnFirstFocusInput(false);
      sendShowOptions(false);
  }*/

  const onFocusInput = (e: any) => {
      //cuando el usuario hace click en el input, mostramos options

      e.target.select();

      const textoEscritoInput = e.currentTarget.value;
      if(textoEscritoInput.toString().length === 0){
          //el input no tiene texto, mostramos options y seteamos fiteredOptions a todas las opciondes del buscador

            //hacemos sort por commonName
            let filteredOptionsAllOptions = searchData[0].optionsEmisoras;//.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
            sendFilteredOptions(filteredOptionsAllOptions);
      }
      else {
        sendUserInput(textoEscritoInput);
      }

      if(showOptions === true){
        //options ya estan mostradas
        return;
    }
    sendShowOptions(true);
  }

  const onClick = (opcionClickeada: Emisora, indexOpcionClickeada: number) => {
    sendActiveOption(indexOpcionClickeada);
    sendOption(opcionClickeada);
    //sendFilteredOptions([]);
    sendShowOptions(false);
    sendOnClickEnOpcion(true);
    sendDidUserSelectedOption(true);
    sendUserInput(opcionClickeada.CommonName);
  };

  const onKeyDown = (e: any) => {
    if(e.keyCode === 27){
      //tecla esc
      sendActiveOption(0);
      sendShowOptions(false);
    } else if (e.keyCode === 13) {
        //tecla enter
      if(filteredOptions[activeOption] == undefined){
        //console.log("return por undefined");
        return;
      }

      sendActiveOption(0);
      sendOption(filteredOptions[activeOption]);
      sendDidUserSelectedOption(true);
      sendShowOptions(false);
      sendOnClickEnOpcion(true);
      sendUserInput(filteredOptions[activeOption].CommonName);

    } else if (e.keyCode === 38) {
      //tecla flecha hacia arriba
      if (activeOption === 0) {
        return;
      }
      sendActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      //tecla flecha hacia abajo
      if (activeOption === filteredOptions.length - 1) {
        //console.log(activeOption);
        return;
      }
      sendActiveOption(activeOption + 1);
    }
  };

  let optionList;
  if (showOptions /*&& (userInput || filteredOptions.length > 0)*/) {
    if (filteredOptions.length > 0) {
      let contador = 0;
      optionList = (
        <ul className="absolute z-20 w-full max-h-96 overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none text-xs">
            <li onClick={() => {
                //sendUserInput("");
                sendShowOptions(false);
              }} className="w-full text-gray-500 bg-white cursor-pointer py-1 px-2.5">
                <div className="w-full flex flex-row justify-between">
                    <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                    <MdClose className="text-sm text-right" />
                </div>
            </li>
            {filteredOptions.map((option: Emisora, index) => {
                contador++;
                const emisoraSerie: string = (option.Emisora + "." + option.Serie).toUpperCase();
                const emisoraSerieReplace: string = userInput.length > 0 ?
                  emisoraSerie.replace(userInput.toUpperCase().trim(), "<b id='bold' class='font-bold hover:text-red-600'>" + userInput.toUpperCase().trim() + "</b>")
                : emisoraSerie;
                const nombreEmpresaReplace: string = userInput.length > 0 ?
                  option.CommonName.replace(userInput.toUpperCase().trim(), "<b id='bold' class='font-bold hover:text-red-600'>" + userInput.toUpperCase().trim() + "</b>")
                : option.CommonName.toUpperCase();
                return (
                <li
                    className={`w-full filter drop-shadow-xl cursor-pointer select-none relative hover:font-bold group hover:text-red-600 py-1 px-2.5 ${(index === activeOption) ? "bg-red-600 text-white" : "bg-white"}`} //"w-full text-gray-500 bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                    key={option.RIC + contador.toString()}
                    onClick={() => onClick(option, index)}
                >
                    <div className="flex flex-row w-full">
                        <div className={`px-1 ${side ? "w-1/2" : "w-1/3"}`}>
                            <p className="mr-2">{parse(emisoraSerieReplace)}</p>
                        </div>
                        <div className={`px-1 ${side ? "w-1/2" : "w-2/3"}`}>
                            <p>{parse(nombreEmpresaReplace)}</p>
                        </div>
                    </div>
                </li>
                );
            })}
        </ul>
      );
    } else {
      optionList = (
        <ul className="absolute z-20 w-full max-h-full py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none text-xs">
            <li onClick={() => {
                sendShowOptions(false);
              }} className="w-full text-gray-500 bg-white cursor-pointer py-1 px-2.5">
                <div className="w-full flex flex-row justify-between">
                    <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                    <MdClose className="text-sm text-right" />
                </div>
            </li>
            <li className="text-black bg-white filter drop-shadow-xl cursor-not-allowed select-none relative hover:bg-gray-100 py-1 pl-3 pr-9">
                {searchData[0].noMatch}
            </li>
        </ul>
      );
    }
  } else {
    optionList = (
      <div></div>
    );
  }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                <div className="inputDelBuscador relative z-0">
                    <span className="absolute z-10 m-2 left-1">
                        <MdSearch className="text-gray-400 text-xl" />
                    </span>

                    <input
                        type="text"
                        className="relative w-full py-2 px-5 bg-white text-red-600 cursor-text border border-1 border-gray-200 rounded-md text-left focus:ring-1 focus:ring-red-600 text-xs"
                        placeholder={searchData[0].placeholder}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onFocus={onFocusInput}
                        value={userInput}
                    />
                </div>
                <div className={"respSeleccionada text-xxs w-full flex flex-row pb-1 break-words " + (showOptions ? "hidden" : "")}>
                    {
                      side ? "" :
                        <div className="w-4/24 px-1">
                            <p>Emisora seleccionada:</p>
                        </div>
                    }
                    <div className={`px-1 ${side ? "w-2/6" : "w-3/24"}`}>
                        <p className="font-bold text-red-600">{selectedOption.Emisora !== "" ? selectedOption.Emisora + "." + selectedOption.Serie : ""}</p>
                    </div>
                    <div className={`px-1 ${side ? "w-3/6" : "w-17/24"}`}>
                        <p className="font-bold text-red-600">{selectedOption.CommonName !== "" ? selectedOption.CommonName : ""}</p>
                    </div>
                </div>
            </div>
            <div className="divDeOpciones relative w-full bg-gray-100 shadow-lg">
                {optionList}
            </div>
        </div>
    );
};

export { SearchGraficador };
