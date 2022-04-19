import React, { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { ReadyState } from '../types/ReadyStateTypes';

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaLaptopHouse } from "react-icons/fa";

export interface DropProps {
  dropdownData: Array<data>;
  sendOption: (data: string) => void;
  idDivDDTrading?: string;
  sendOpenD?: (data: boolean) => void;
  initialOption: string;
  side: boolean;
  openD: boolean;
  readyStateWs?: ReadyState;
}
export interface data {
  id: string;
  option: string;
}

const DropdownTrading = ({ dropdownData, sendOption, initialOption, side, openD, readyStateWs, sendOpenD, idDivDDTrading }: DropProps) => {
  
  //console.log("entro a dropdowntrading: ", openD);

  //const [isOpen, setIsOpen] = useState(openD);
  const [selection, setSelection] = useState(initialOption);
  const [base, setBase] = useState("text-sm");

  // console.log(isOpen);

  useEffect(() => {
    if (side) {
      setBase("text-xs");
    }
  }, []);

  let options;
  let icon;

  //Check if the DropDown Menu have been clicked to show the options and change the down arrow to up arrow
  if (openD) {
    //console.log("openD es true");
    options = (
      <div className={"relative w-full bg-gray-100 shadow-lg"}>
        <ul className={"absolute z-40 bg-gray-100 w-full	py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
          {dropdownData.map((option) => {
            return (
              <li
                onClick={() => {
                  setSelection(option.option);
                  //setIsOpen(!isOpen);
                  sendOption(option.option);
                  if(sendOpenD !== undefined){
                    //console.log("if sendOpenD onclick li dropdowntrading: ", false);
                    sendOpenD(false);
                  }
                }}
                id={option.id}
                role="option"
                className={
                  selection === option.option
                    ? "text-white cursor-pointer select-none relative bg-red-600 py-2 px-4 "
                    : "text-gray-900 cursor-pointer select-none relative bg-gray-100 hover:text-red-600 py-2 px-4"
                }
              >
                <p>{option.option}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
    icon = (
      <MdKeyboardArrowUp className="text-gray-400 text-xl" />
    );
  } else {
    //console.log("openD es false");
    options = <div></div>;
    icon = (
      <MdKeyboardArrowDown className="text-gray-400 text-xl" />
    );
  }

  return (
    <div
      //   onClick={() => {
      //     setIsOpen(!isOpen);
      //   }}
      id={idDivDDTrading !== undefined ? idDivDDTrading : ""}
      onClick={() => {
        if(sendOpenD !== undefined){
          //console.log("if sendOpenD onclick dropdowntrading: ", !openD);
          sendOpenD(!openD);
        }
      }}
    >
      <button
        //onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        className="relative w-full bg-white cursor-pointer border border-1 border-gray-200 rounded-md py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600"
      >
        <div className="flex items-center justify-between px-3">
          <p className={"block truncate text-gray-500 pr-1 " + base}>
            {selection}
          </p>
          {icon}
        </div>
      </button>
      {options}
    </div>
  );
};


//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
      readyStateWs: store.readyState,
  };
};

export default connect(mapStateToProps, null)(DropdownTrading);