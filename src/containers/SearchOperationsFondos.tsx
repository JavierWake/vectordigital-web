import React, { useState, useEffect } from "react";
import { IoReturnUpForwardSharp } from "react-icons/io5";

import { MdClose, MdSearch } from "react-icons/md";
import { ITdsFondos } from "../types/FondosMonitorType";

export interface SearchOperationsFondosProps {
  searchData: DataSearchOpFondos[];
  selectedOption: ITdsFondos | undefined;
  sendOption : (data: ITdsFondos | undefined, terminoOp: boolean) => void;
  //didUserSelectedOption: boolean;
  //sendDidUserSelectedOption: (data: boolean) => void;
  issuerFondoClickeado?: string;
  side: boolean;
  //seEnviaPrimeraEmisora: boolean;
  //sendSeEnviaPrimeraEmisora: (data: boolean) => void;
  doNotSendOptionOnOnChange: boolean | undefined;
}

export interface DataSearchOpFondos {
  id: string;
  title: string;
  optionsFondos: ITdsFondos[]; //usamos optionsFondos cuando searchInputLocation === "fondos"
  noMatch: string;
  placeholder: string;
}

const SearchOperationsFondos = ({ searchData, selectedOption, sendOption, side, doNotSendOptionOnOnChange, issuerFondoClickeado }: SearchOperationsFondosProps) => {
  //console.log("entro a search de op fondos");

  //HOOKS
  const [activeOption, setActiveOption] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<ITdsFondos[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState<string>(selectedOption != undefined ? selectedOption.Descripcion : "");
  const [onClickEnOpcion, setOnClickEnOpcion] = useState(false);
  const [base, setBase] = useState("text-sm");
  const [onFirstFocusInput, setOnFirstFocusInput] = useState(false);

  const sendOnFirstFocusInput = (data: boolean) => {
      if(onFirstFocusInput === data){
          return;
      }
      setOnFirstFocusInput(data);
  }

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

  const sendFilteredOptions = (data: ITdsFondos[]) => {
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
    sendUserInput(selectedOption != undefined ? selectedOption.Descripcion : "");
  },[selectedOption])

  useEffect(() => {
    if(issuerFondoClickeado != undefined){
        //el usuario clickeo el nombre de un fondo
        if(issuerFondoClickeado.length > 0){
            //issuerFondoClickeado tiene el nombre de un fondo
            sendOnClickEnOpcion(false);
            sendUserInput(issuerFondoClickeado);
        }
    }
  }, [issuerFondoClickeado]);

  useEffect(() => {
    if (side) {
      sendBase("text-xs");
    }

    //PENDIENTE:
    //logica para decidir si el buscador es buscador para OperationsFondos o para OperationsCapitales
    //o tal vez podemos separar los searchs (?, pensar sobre esto)

  }, []);

  //cada vez que cambiemos user input (ya sea que el usuario escribio algo o nosotros enviamos un string en issuerFondoClickeado)
  useEffect(() => {
    if(userInput.length > 0){
        //userInput tiene texto
        const filteredOptionsUserInput = searchData[0].optionsFondos.filter(
            (option: ITdsFondos) =>{
                return option.Descripcion.toLowerCase().includes(userInput.toLowerCase());
                //return option.Descripcion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                //optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            }
        );
    
        if(filteredOptionsUserInput.length === 0){
            //el fondo no existe
            sendActiveOption(-1);
        }
        else{
            sendActiveOption(0);
        }
    
        if(doNotSendOptionOnOnChange === undefined){
          //no se envio este parametro y se va a cambiar el option confome el usuario va escribiendo caracteres
          //console.log("do not send undefined");
          if(filteredOptionsUserInput.length === 0){
            sendOption(undefined, true);
          }
          else{
            sendOption(filteredOptionsUserInput[0], false);
          }
        }
        else{
          //el parametro si se envio, es posible que sea boolean
          if(doNotSendOptionOnOnChange === true){
            //NO se va a cambiar el option conforme el usuario va escribiendo, hasta que el usuario haga click en una opcion, o haga enter en una opcion
            //console.log("do not send true");
          }
          else{
            //SI se envio este parametro y SI se va a cambiar el option confome el usuario va escribiendo caracteres
            if(filteredOptionsUserInput.length === 0){
              sendOption(undefined, true);
            }
            else{
              sendOption(filteredOptionsUserInput[0], false);
            }
            //console.log("do not send false");
          }
        }

        
        sendFilteredOptions(filteredOptionsUserInput);

        if(filteredOptionsUserInput.length === 1){
          const findUserInpInfilteredOp = filteredOptionsUserInput.filter((emis: ITdsFondos) => {
            return userInput.trim() === emis.Descripcion.trim();
          });
          if(findUserInpInfilteredOp.length === 1){
            sendOption(filteredOptionsUserInput[0], false);
            sendShowOptions(false);
          }
          else if(onClickEnOpcion === true){
            sendShowOptions(false);
          }
          else{
            sendShowOptions(true);
          }
        } 
        else if(onClickEnOpcion === true){
          sendShowOptions(false);
        }
        else{
          sendShowOptions(true);
        }
        //sendShowOptions(true);
    }   
    else{
        sendActiveOption(0);
        //sendFilteredOptions(searchData[0].optionsFondos);
        sendShowOptions(false);
    }
  }, [userInput]);

  const onChange = (e: any) => {
    //cambiamos userInput para que se active su useEffect
    sendOnClickEnOpcion(false);
    sendUserInput(e.currentTarget.value);
  };

  const onBlurInput = () => {
      sendOnFirstFocusInput(false);
      //sendShowOptions(false);
  }

  const onFocusInput = (e: any) => {
      //cuando el usuario hace click en el input, mostramos options

      if(onFirstFocusInput === true){
          return;
      }

      e.target.select();
      
      sendOnFirstFocusInput(true);
      sendOnClickEnOpcion(false);
    
      const textoEscritoInput = e.currentTarget.value;
      if(textoEscritoInput.toString().length === 0){
          //el input no tiene texto, mostramos options y seteamos fiteredOptions a todas las opciondes del buscador
          sendFilteredOptions(searchData[0].optionsFondos);
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

  const onClick = (opcionClickeada: ITdsFondos, indexOpcionClickeada: number) => {
    sendActiveOption(indexOpcionClickeada);
    sendOption(opcionClickeada, false);
    //sendFilteredOptions([]);
    sendShowOptions(false);
    sendOnClickEnOpcion(true);
    //sendDidUserSelectedOption(true);
    sendUserInput(opcionClickeada.Descripcion);
  };

  const onKeyDown = (e: any) => {
    if(e.keyCode === 27){
      //tecla esc
      sendActiveOption(0);
      sendShowOptions(false);
    } else if (e.keyCode === 13) {
        //tecla enter
      if(filteredOptions[activeOption] == undefined){
        //console.log("enter search fd undefined");
        sendOption(undefined, true);
      }
      else{
        sendOption(filteredOptions[activeOption], false);
      }

      sendOnClickEnOpcion(true);
      //sendDidUserSelectedOption(true);
      sendShowOptions(false);
      //sendUserInput(filteredOptions[activeOption].Descripcion);
      sendActiveOption(0);
    } else if (e.keyCode === 38) {
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
        <ul className={"absolute z-40 w-full max-h-full ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
            <li onClick={() => sendShowOptions(false)} className="w-full text-gray-500 bg-white cursor-pointer py-1 pl-3 pr-9">
                <div className="w-full flex flex-row">
                    <div className="w-22/24">
                        <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                    </div>
                    <div className="w-2/24">
                        <MdClose className="text-sm text-right" />
                    </div>
                </div>
            </li>
            {
                filteredOptions.filter((fondo: ITdsFondos) => fondo.Venta > 0).length > 0 && 
                <>
                    <li
                        className="w-full cursor-not-allowed bg-white font-bold text-red-600 filter drop-shadow-xl select-none relative group py-1 px-3"
                        key="EnPosicion"
                    >
                        <div className="flex flex-row w-full content-between">
                            <div className="w-1/2 px-1">
                                <p className="">En posición</p>
                            </div>
                            <div className="w-1/2 px-1">
                                <p>Monto</p>
                            </div>
                        </div>
                    </li>
                    {filteredOptions.filter((fondo: ITdsFondos) => fondo.Venta > 0).map((option: ITdsFondos, index) => {
                        contador++;
                        return (
                        <li
                            className={`w-full filter drop-shadow-xl cursor-pointer select-none relative hover:font-bold hover:bg-red-550 group hover:text-red-600 py-1 px-3 ${(index === activeOption) ? "bg-red-600 text-white" : "bg-white"}`}//className="w-full text-black bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                            key={option.Descripcion + contador.toString()}
                            onClick={() => onClick(option, index)}
                        >
                            <div className="flex flex-row w-full content-between">
                                <div className="w-1/2 px-1">
                                    <p className="mr-2">{option.Descripcion}</p>
                                </div>
                                <div className="w-1/2 px-1">
                                    <p>{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(option.Venta)}</p>
                                </div>
                            </div>
                        </li>
                        );
                    })}
                </>
            }
            {
                filteredOptions.filter((fondo: ITdsFondos) => fondo.Venta === 0).length > 0 && 
                <>
                    <li
                        className="w-full cursor-not-allowed font-bold bg-white text-red-600 filter drop-shadow-xl select-none relative group py-1 px-3"
                        key="SinPosicion"
                    >
                        <p className="px-1">Sin posición</p>
                    </li>
                    {filteredOptions.filter((fondo: ITdsFondos) => fondo.Venta === 0).map((option: ITdsFondos, index) => {
                        contador++;
                        return (
                        <li
                            className={`w-full filter drop-shadow-xl cursor-pointer select-none relative hover:font-bold group hover:text-red-600 py-1 px-3 ${(index === activeOption) ? "bg-red-600 text-white" : "bg-white"}`} //"w-full text-gray-500 bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"//className="w-full text-black bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                            key={option.Descripcion + contador}
                            onClick={() => onClick(option, index)}
                        >
                            <div className="flex flex-row w-full content-between">
                                <p className="px-1">{option.Descripcion}</p>
                            </div>
                        </li>
                        );
                    })}
                </>
            }
        </ul>
      );
    } else {
      optionList = (
        <ul className={"absolute z-40 w-full max-h-full py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base }>
            <li onClick={() => sendShowOptions(false)} className="w-full text-gray-500 bg-white cursor-pointer py-1 pl-3 pr-9">
                <div className="w-full flex flex-row">
                    <div className="w-22/24">
                        <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                    </div>
                    <div className="w-2/24">
                        <MdClose className="text-sm text-right" />
                    </div>
                </div>
            </li>
            <li className="text-black bg-white filter drop-shadow-xl cursor-not-allowed select-none relative hover:bg-gray-100 py-1 pl-3 pr-9">
                {searchData[0].noMatch}
            </li>
        </ul>
      );
    }
  }

  return (
    <div>
      <div className="relative z-0">
        <span className="absolute z-10 m-2 left-1">
          <MdSearch className="text-gray-400 text-xl" />
        </span>

        {
          searchData[0].optionsFondos.length === 0 ?
            <input
              type="text"
              disabled={true}
              className={"cursor-not-allowed relative w-full py-2 pl-7 bg-white placeholder-red-100 text-xxs font-bold border border-1 border-red-100 rounded-md text-left"}
              placeholder="No hay fondos en la lista, intenta más tarde"
              value={userInput}
            />
          :
            <input
              type="text"
              className={"relative w-full py-2 px-5 bg-white text-red-600 border border-1 border-gray-200 rounded-md text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 text-xs"}
              placeholder={searchData[0].placeholder}
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
        }
        
      </div>
      <div className="relative w-full bg-gray-100 shadow-lg ">
        {optionList}
      </div>
    </div>
  );
};

export { SearchOperationsFondos };
