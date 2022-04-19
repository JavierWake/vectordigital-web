import "../../node_modules/material-design-icons/iconfont/material-icons.css";
import React, { useState } from "react";

export interface SearchProps {
  searchData: data[];
}
export interface data {
  id: string;
  options: string[];
  noMatch: string;
  placeholder: string;
}

const SearchList = (searchData: any) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = (e: any) => {
    const userInput = e.currentTarget.value;

    const filteredOptions = searchData.searchData[0].options.filter(
      (optionName: string) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e: any) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setActiveOption(0);
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

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="absolute z-40 w-full max-h-full py-2 text-sm ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.map((optionName: string, index) => {
            return (
              <li
                className="text-black bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                key={optionName}
                onClick={onClick}
              >
                <div className="flex justify-between">
                  {optionName}
                  <span className="material-icons text-gray-400 group-hover:text-red-600" style={{ fontSize: "1rem" }}>
                    add
                  </span>
                </div>                
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <ul className="absolute z-40 w-full max-h-full	 py-2  text-sm ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none sm:text-sm">
          <li className="text-black bg-white filter drop-shadow-xl cursor-not-allowed select-none relative hover:bg-gray-100 py-1 pl-3 pr-9">
            {searchData.searchData[0].noMatch}
          </li>
        </ul>
      );
    }
  }

  return (
    <div>
      <div className="max-h-100">
        <div className="relative">
          <span className="absolute z-10 mt-2 left-1 flex items-start pl-2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <input
            type="text"
            className="relative max-w-full pl-10 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md  pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 sm:text-sm"
            placeholder={searchData.searchData[0].placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocusSelectText}
            value={userInput}
          />
        </div>
      </div>
      <div className="relative max-w-full bg-gray-100 shadow-lg ">
        {optionList}
      </div>
    </div>
  );
};

export { SearchList };
