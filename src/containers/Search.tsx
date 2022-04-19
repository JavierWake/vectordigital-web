import React, { useState, useEffect } from "react";

import { MdSearch } from "react-icons/md";

export interface SearchProps {
  searchData: data[];
  selectedOption : any;
  sendOption : (data: string) => void;
  side: boolean;
  doNotSendOptionOnOnChange?: boolean | undefined;
}

export interface data {
  id: string;
  options: string[];
  noMatch: string;
  placeholder: string;
}

const Search = ({ searchData, selectedOption, sendOption, side, doNotSendOptionOnOnChange }: SearchProps) => {
  const [activeOption, setActiveOption] = useState(selectedOption);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState(selectedOption);
  const [base, setBase] = useState("text-sm");

  useEffect(() => {
    setUserInput(selectedOption);
  },[selectedOption])

  useEffect(() => {
    if (side) {
      setBase("text-xs");
    }

    //PENDIENTE:
    //logica para decidir si el buscador es buscador para OperationsFondos o para OperationsCapitales
    //o tal vez podemos separar los searchs (?, pensar sobre esto)

  }, []);

  const onChange = (e: any) => {
    const userInput = e.currentTarget.value;

    const filteredOptions = searchData[0].options.filter(
      (optionName: string) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveOption(0);
    if(doNotSendOptionOnOnChange === undefined){
      //no se envio este parametro y se va a cambiar el option confome el usuario va escribiendo caracteres
      // console.log("do not send undefined");
      sendOption(e.currentTarget.value);
    }
    else{
      //el parametro si se envio, es posible que sea boolean
      if(doNotSendOptionOnOnChange === true){
        //NO se va a cambiar el option conforme el usuario va escribiendo, hasta que el usuario haga click en una opcion, o haga enter en una opcion
        // console.log("do not send true");
      }
      else{
        //SI se envio este parametro y SI se va a cambiar el option confome el usuario va escribiendo caracteres
        sendOption(e.currentTarget.value);
        // console.log("do not send false");
      }
    }
    
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e: any) => {
    setActiveOption(0);
    sendOption(e.currentTarget.innerText);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {

      if(filteredOptions[activeOption] == undefined){
        // console.log("return por undefined");
        return;
      }

      setActiveOption(0);
      sendOption(filteredOptions[activeOption]);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOption]);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        // console.log(activeOption);
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  const onFocusSelectText = (event: any) => {
    event.target.select();
  };

  //console.log("filtered options");
  //console.log(filteredOptions);
  //console.log(activeOption);

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className={"absolute z-40 w-full max-h-full ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
          {filteredOptions.map((optionName: string, index) => {
            return (
              <li
                className="text-black bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                key={optionName}
                onClick={onClick}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <ul className={"absolute z-40 w-full max-h-full py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base }>
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

        <input
          type="text"
          className={"relative w-full py-2 px-5 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 " + base}
          placeholder={searchData[0].placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocusSelectText}
          value={userInput}
        />
      </div>
      <div className="relative w-full bg-gray-100 shadow-lg ">
        {optionList}
      </div>
    </div>
  );
};

export { Search };
