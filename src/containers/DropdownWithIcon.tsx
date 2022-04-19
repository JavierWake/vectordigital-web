import React, { useState, useEffect } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

export interface DropProps {
  dropdownData: Array<data>;
  sendOption: (data: string) => void;
  initialOption: string;
  side: boolean;
  leftIcon: React.ReactElement;
  sendId?: (data: any) => void;
  sizeFull?: boolean;
}
export interface data {
  id: any;
  option: string;
}

const DropdownWithIcon = ({ dropdownData, sendOption, initialOption, side, sendId, sizeFull, leftIcon }: DropProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(initialOption);
  const [base, setBase] = useState("text-sm");

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
        <ul className={"absolute z-40 bg-gray-100 w-full	py-1.5 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none " + base}>
          {dropdownData.map((option) => {
            return (
              <li
                onClick={() => {
                  setSelection(option.option);
                  setIsOpen(!isOpen);
                  sendOption(option.option);
                  if(sendId){
                    sendId(option.id);
                  }
                }}
                id={option.id.toString()}
                role="option"
                className={
                  selection === option.option
                    ? "text-white cursor-pointer select-none relative bg-red-600 py-1.5 px-4 "
                    : "text-gray-900 cursor-pointer select-none relative bg-gray-100 hover:text-red-600 py-1.5 px-4"
                }
              >
                <div className="flex flex-row">
                    {
                        leftIcon && leftIcon
                    }
                    <p className={"block truncate pt-1 pl-2 " + base}>{option.option}</p>
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
        setIsOpen(!isOpen);
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        className="relative w-full bg-white cursor-pointer border border-1 border-gray-200 rounded-md py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600"
      >
        <div className="flex items-center justify-between px-3">
            <div className="flex flex-row text-gray-500">
                {/* {
                    leftIcon && leftIcon
                } */}
                <p className={"block truncate pt-1 pl-2 " + base}>
                    {selection}
                </p>
            </div>
          {icon}
        </div>
      </button>
      {options}
    </div>
  );
};

export { DropdownWithIcon };