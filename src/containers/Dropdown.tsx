import React, { useState, useEffect } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

export interface DropProps {
  dropdownData: Array<data> | any;
  sendOption: (data: string) => void;
  initialOption: string;
  side: boolean;
  sendId?: (data: any) => void;
  sizeFull?: boolean;
  fondosFamilia: boolean;
  readyState?: number;
  sendBolsa?: (data: any) => void;
}
export interface data {
  id: any;
  option: string;
  circle_tw_class_bg_color?: string;
  bolsa?: string;
}

const Dropdown = ({ dropdownData, sendOption, initialOption, side, sendId, sizeFull, fondosFamilia, readyState, sendBolsa }: DropProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(initialOption);
  const [base, setBase] = useState("text-sm");

  useEffect(() => {
    if (side) {
      setBase("text-xs");
    }

    // console.log("Dropdown Data");
    // console.log(dropdownData);
  }, []);

  useEffect(() => {
    if(initialOption !== ""){
      if(initialOption === selection){
        return;
      }
      setSelection(initialOption);
    }
  }, [initialOption]);

  if(dropdownData.length === 0){
    return <div></div>;
  }

  let options;
  let icon;

  //Check if the DropDown Menu have been clicked to show the options and change the down arrow to up arrow
  if (isOpen) {
    options = (
      <div className="relative w-full bg-gray-100 shadow-lg ">
        <ul className={"absolute z-20 bg-gray-100 w-full	py-1.5 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
          {dropdownData.map((option) => {
            console.log("a: ",option.circle_tw_class_bg_color);
            return (
              <li
                onClick={() => {
                  if(option.id !== "-1"){
                    setSelection(option.option);
                    setIsOpen(!isOpen);
                    sendOption(option.option);
                    if(sendId){
                      sendId(option.id);
                    }
                    if(sendBolsa){
                      sendBolsa(option.bolsa)
                    }
                  }
                }}
                id={option.id.toString()}
                role="option"
                className={
                  option.id === "-1" ? "cursor-default font-semibold text-red-600 py-1 border-t border-gray-300 mx-3 mt-1"
                  :
                  selection === option.option
                    ? "text-white cursor-pointer select-none relative bg-red-600 py-1.5 px-3 "
                    : "text-gray-900 cursor-pointer select-none relative bg-gray-100 py-1 px-3 hover:text-" + ((option.circle_tw_class_bg_color != undefined) ? option.circle_tw_class_bg_color : "red-600")
                }
              >
                <div className="optionDiv w-full flex flex-row">
                  <div className={fondosFamilia ? "w-3/24 px-1" : ""}>
                    {
                      (option.circle_tw_class_bg_color != undefined) && <div className={"circulitoDeCcolor w-2 h-2 rounded-full my-1 p-2 bg-" + ((selection === option.option) ? option.circle_tw_class_bg_color : option.circle_tw_class_bg_color)}>
                      </div>
                    }
                  </div>
                  <div className={fondosFamilia ? "w-21/24 pl-2" : ""}>
                    <p>{option.option}</p>
                  </div>
                </div>
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
      className={sizeFull ? "w-full" : ""}
      onClick={() => {
        if(readyState !== 0)  {
          setIsOpen(!isOpen);
        }
      }}
    >
      <button
        onClick={() => { if(readyState !== 0) { setIsOpen(!isOpen) } }}
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        className="relative w-full bg-white cursor-pointer border border-1 border-gray-200 rounded-md py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600"
      >
        <div className="flex items-center justify-between px-3">
          <div className="opSeleccionada w-full flex flex-row">
            <div className={fondosFamilia ? "w-3/24 px-1" : ""}>
              {
                (dropdownData.length !== 0 && fondosFamilia) ?
                  dropdownData.filter((option: data) => {
                    return option.option === selection;
                  }).length > 0 ?
                    (dropdownData.filter((option: data) => {
                      return option.option === selection;
                    })[0].circle_tw_class_bg_color != undefined) && <div className={"circulitoDeCcolor rounded-full w-2 h-2 my-1 p-2 bg-" + dropdownData.filter((option: data) => {
                      return option.option === selection;
                    })[0].circle_tw_class_bg_color}>
                    </div>
                : 
                  ""
                : 
                  ""
              }
            </div>
            <div className={fondosFamilia ? "w-21/24 px-2": ""}>
              <p className={"block truncate text-gray-500 " + base}>{initialOption}</p>
            </div>
          </div>
          {icon}
        </div>
      </button>
      {options}
    </div>
  );
};

export { Dropdown };