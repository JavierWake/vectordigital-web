import React, { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { ListState } from "../types/ListTypes";

import { ReadyState } from '../types/ReadyStateTypes';

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { initialState } from "../reducers/infoEmisoraReducer";

export interface DropProps {
  dropdownData: Array<data>;
  sendOption: (data: string, id:any, isVector:boolean) => void;
  initialOption: string;
  side: boolean;
  readyStateWs?: ReadyState;
  listItems?: ListState;
}
export interface data {
  list_id: string;
  list_name: string;
  vector: boolean;
}

const DropdownList = ({ dropdownData, sendOption, initialOption, side, readyStateWs, listItems }: DropProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<any>(initialOption);
  const [selectionID, setSelectionID] = useState("1212");
  const [base, setBase] = useState("text-sm");

  useEffect(() => {
    if(!listItems?.loading) {
      if(listItems?.list) {
        let valueArray = listItems?.list.sort((a:any,b:any) => b.ultima - a.ultima);
        let value = valueArray[0].list_name;
        setSelection(value);
        sendOption(valueArray[0].list_name, valueArray[0].list_id, valueArray[0].vector);
      }
    }
  },[listItems?.loading])


  useEffect(() => {
    if (side) {
      setBase("text-xs");
    }
  }, []);

  let options;
  let icon;

  //Check if the DropDown Menu have been clicked to show the options and change the down arrow to up arrow
  if (isOpen) {
    options = (
      <div className="relative w-full bg-gray-100 shadow-lg ">
        <ul className={"absolute z-20 bg-gray-100 w-full	py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
          {dropdownData.sort((a:any,b:any) => b.ultima - a.ultima).map((option) => {
            return (
              <li
                onClick={() => {
                  setSelection(option.list_name);
                  setIsOpen(!isOpen);
                  setSelectionID(option.list_id)
                  sendOption(option.list_name, option.list_id, option.vector);
                }}
                id={option.list_id}
                role="option"
                className={
                  selectionID === option.list_id
                    ? "text-white cursor-pointer select-none relative bg-red-600 py-2 px-4 "
                    : "text-gray-900 cursor-pointer select-none relative bg-gray-100 hover:text-red-600 py-2 px-4"
                }
              >
                <p>{option.list_name}</p>
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
    options = <div></div>;
    icon = (
      <MdKeyboardArrowDown className="text-gray-400 text-xl" />
    );
  }

  return (
    <div
      onClick={() => {
        if(readyStateWs?.readyStateWs !== 0)  {
          setIsOpen(!isOpen);
        }
      }}
      className={( readyStateWs?.readyStateWs === 0 ? " cursor-not-allowed" : "")}
    >
      <button
        onClick={() => { if(readyStateWs?.readyStateWs !== 0)  { setIsOpen(!isOpen) } }}
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        className={"relative w-60 bg-white border border-1 border-gray-200 rounded-md py-2 text-left focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600" + (readyStateWs?.readyStateWs === 0 ? " cursor-not-allowed " : " cursor-pointer ")}
      >
        <div className="flex items-center justify-between px-3">
          <p className={"block truncate text-red-600 " + base}>
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
      listItems: store.list,
  };
};

export default connect(mapStateToProps, null)(DropdownList);