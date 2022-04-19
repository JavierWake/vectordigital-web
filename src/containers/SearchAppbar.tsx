import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";

import { MdClose, MdSearch } from "react-icons/md";
import { Emisora } from '../types/GetCatalogoEmisotasType';

export interface SearchAppbarProps {
  searchData: DataSearchAppbar[];
  /*selectedOption: Emisora | undefined;
  sendOption : (data: Emisora) => void;*/
  side: boolean;
  //doNotSendOptionOnOnChange?: boolean | undefined;
}

export interface DataSearchAppbar {
  id: string;
  title: string;
  optionsEmisoras: Emisora[];
  noMatch: string;
  placeholder: string;
}
/* PENDIENTE: SEGUIR CON ESTA LOGICA Y PEGARLA AL BUSCADOR DEL APPBAR.TSX */
const SearchAppbar = ({ searchData, side }: SearchAppbarProps) => {
  //console.log("entro a search de appbar");

  const history = useHistory();

  const [activeOption, setActiveOption] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<Emisora[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");//(selectedOption != undefined ? selectedOption.CommonName : "");
  const [onClickEnOpcion, setOnClickEnOpcion] = useState(false);
  const [base, setBase] = useState("text-sm");

    const sendBase = (data: string) => {
        if(base === data){
            return;
        }
        setBase(data);
    }

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

  /*useEffect(() => {
    sendUserInput(selectedOption != undefined ? selectedOption.Emisora : "");
  },[selectedOption]);*/

  useEffect(() => {
    if (side) {
      sendBase("text-xs");
    }

  }, []);

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
    
        /*if(doNotSendOptionOnOnChange === undefined){
          //no se envio este parametro y se va a cambiar el option confome el usuario va escribiendo caracteres
          console.log("do not send undefined");
          sendOption(filteredOptionsUserInput[0]);
        }
        else{
          //el parametro si se envio, es posible que sea boolean
          if(doNotSendOptionOnOnChange === true){
            //NO se va a cambiar el option conforme el usuario va escribiendo, hasta que el usuario haga click en una opcion, o haga enter en una opcion
            console.log("do not send true");
          }
          else{
            //SI se envio este parametro y SI se va a cambiar el option confome el usuario va escribiendo caracteres
            sendOption(filteredOptionsUserInput[0]);
            console.log("do not send false");
          }
        }*/

        if(onClickEnOpcion === true){
            return;
        }
        
        sendFilteredOptions(filteredOptionsUserInput);
        sendShowOptions(true);
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

  const onFocusSelectText = (event: any) => {
    event.target.select();
  };

  /*const onBlurInput = () => {
      sendOnFirstFocusInput(false);
      //sendShowOptions(false);
  }

  const onFocusInput = (e: any) => {
      //cuando el usuario hace click en el input, mostramos options

      if(onFirstFocusInput === true){
          return;
      }
      
      sendOnFirstFocusInput(true);
    
      const textoEscritoInput = e.currentTarget.value;
      if(textoEscritoInput.toString().length === 0){
          //el input no tiene texto, mostramos options y seteamos fiteredOptions a todas las opciondes del buscador
          sendFilteredOptions(searchData[0].optionsEmisoras);
      }
      else {
        sendUserInput(textoEscritoInput);
      }

      if(showOptions === true){
        //options ya estan mostradas
        return;
    }
    sendShowOptions(true);
  }*/

  const onClick = (opcionClickeada: Emisora, indexOpcionClickeada: number) => {
    sendActiveOption(indexOpcionClickeada);
    //sendOption(opcionClickeada);
    //sendFilteredOptions([]);
    sendShowOptions(false);
    sendOnClickEnOpcion(true);
    sendUserInput(opcionClickeada.CommonName);

    //pusheamos la pag de emisora con el RIC de la opcion clickeada
    history.push("/emisora/" + opcionClickeada.Emisora + "." + opcionClickeada.Serie);
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
      sendOnClickEnOpcion(true);
      //sendOption(filteredOptions[activeOption]);
      sendShowOptions(false);
      sendUserInput(filteredOptions[activeOption].CommonName);

      //pusheamos la pag de emisora con el RIC de la opcion clickeada
      history.push("/emisora/" + filteredOptions[activeOption].Emisora + "." + filteredOptions[activeOption].Serie);

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

  let optionList = (<div></div>);
  if (showOptions /*&& (userInput || filteredOptions.length > 0)*/) {
    if (filteredOptions.length > 0) {
      let contador = 0;
      optionList = (
        <ul className={"absolute z-40 w-full max-h-96 overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none " + base}>
            <li onClick={() => {
                sendUserInput("");
                sendShowOptions(false);
              }} className="text-black bg-white cursor-pointer py-1 px-2.5">
                <div className="flex flex-row justify-between">
                    <p className="text-xxs">Cerrar respuestas de este buscador</p>
                    <MdClose className="text-sm" />
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
                    className={`text-black filter drop-shadow-xl cursor-pointer select-none relative hover:font-bold hover:bg-red-600 group hover:text-white py-1 px-2.5 ${(index === activeOption) ? "bg-red-600 text-white" : "bg-white"}`} //"w-full text-gray-500 bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                    key={option.RIC + contador.toString()}
                    onClick={() => onClick(option, index)}
                >
                    <div className="flex flex-row content-between">
                        <div className="w-1/5 px-1">
                            <p className="mr-2">{parse(emisoraSerieReplace)}</p>
                        </div>
                        <div className="w-4/5 px-1">
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
        <ul className={"absolute z-40 w-full max-h-full py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base }>
            <li onClick={() => {
                sendUserInput("");
                sendShowOptions(false);
              }} className="w-full text-black bg-white cursor-pointer py-1 px-2.5">
                <div className="w-full flex flex-row justify-between">
                    <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                    <MdClose className="text-sm text-right" />
                </div>
            </li>
            <li className="text-black bg-white filter drop-shadow-xl cursor-not-allowed select-none relative hover:bg-red-600 hover:text-white py-1 pl-3 pr-9">
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
    <div className="w-full flex flex-col">
      <div className="w-full pt-2">
        <input
          type="text"
          //placeholder="Buscar una emisora, noticia o lista"
          className="w-full p-2 pl-8 text-xs rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 "
          placeholder={searchData[0].placeholder}
          //onFocus={onFocusInput}
          //onBlur={onBlurInput}
          onFocus={onFocusSelectText}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </div>
      <div className="relative w-full bg-gray-100 shadow-lg">
        {optionList}
      </div>
    </div>
  );
};

export { SearchAppbar };
