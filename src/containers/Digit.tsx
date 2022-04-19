import React, { useState, useEffect } from "react";
import { MdRemove } from "react-icons/md";
import { MdAdd } from "react-icons/md";

export interface DigitData {
  id: string;
  title: string;
  minValue?: number;
  maxValue?: number;
  errorMessage?: string;
  subAmount: number;
  addAmount: number;
  placeholder: string;
  subfix: string;
  decimals: number;
}

export interface DigitProps {
  digitData: DigitData;
  initialCount: any;
  sendCount: (data: string) => void;
  sizeFull?: boolean;
  type?: string;
}

const Digit = ({ digitData, initialCount, sendCount, sizeFull, type }: DigitProps) => {
  const [count, setCount] = useState(initialCount.toString());
  const [mostrarError, setMostrarError] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (initialCount !== "" && initialCount !== count) {
      if(digitData.minValue !== undefined){
        if(parseFloat(initialCount) < digitData.minValue){
          setMostrarError(true);
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue !== undefined){
        if(parseFloat(initialCount) > digitData.maxValue){
          setMostrarError(true);
        }
        else{
          setMostrarError(false);
        }
      }
      setCount((initialCount + " " + digitData.subfix).trim());
      sendCount(initialCount);
    }
    else{
      if(initialCount === ""){
        setCount(initialCount);

      }
    }
}, [initialCount]);

  // console.log("initial count");
  // console.log(initialCount);
  // console.log(count);

  const onAddHandler = () => {
    if (count === "") {
      let splitCount = digitData.placeholder.split(" ");
      let addCount = parseFloat(splitCount[0]) + digitData.addAmount;
      let countText = addCount.toFixed(digitData.decimals).toString();
      if(digitData.minValue !== undefined){
        if(parseFloat(countText) < digitData.minValue){
          setMostrarError(true);
          setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.minValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue !== undefined){
        if(parseFloat(countText) > digitData.maxValue){
          setMostrarError(true);
          setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.maxValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      setCount((countText + " " + digitData.subfix).trim());
      sendCount(countText);
    } else {
      let splitCount = count.split(" ");
      let addCount = parseFloat(splitCount[0]) + digitData.addAmount;
      let countText = addCount.toFixed(digitData.decimals).toString();
      if(digitData.minValue !== undefined){
        if(parseFloat(countText) < digitData.minValue){
          setMostrarError(true);
          setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.minValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue !== undefined){
        if(parseFloat(countText) > digitData.maxValue){
          setMostrarError(true);
          setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.maxValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      setCount((countText + " " + digitData.subfix).trim());
      sendCount(countText);
    }
  };

  const onSubHandler = () => {
    if (count === "") {
      let splitCount = digitData.placeholder.split(" ");
      let addCount = parseFloat(splitCount[0]) - digitData.subAmount;
      let countText = addCount.toFixed(digitData.decimals).toString();
      if(digitData.minValue !== undefined){
        if(parseFloat(countText) < digitData.minValue){
          setMostrarError(true);
          setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.minValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue !== undefined){
        if(parseFloat(countText) > digitData.maxValue){
          setMostrarError(true);
          setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.maxValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      setCount((countText + " " + digitData.subfix).trim());
      sendCount(countText);
    } else {
      let splitCount = count.split(" ");
      let addCount = parseFloat(splitCount[0]) - digitData.subAmount;
      let countText = addCount.toFixed(digitData.decimals).toString();
      if(digitData.minValue !== undefined){
        if(parseFloat(countText) < digitData.minValue){
          setMostrarError(true);
          setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.minValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue !== undefined){
        if(parseFloat(countText) > digitData.maxValue){
          setMostrarError(true);
          setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
          sendCount(digitData.maxValue.toString());
          return;
        }
        else{
          setMostrarError(false);
        }
      }
      setCount((countText + " " + digitData.subfix).trim());
      sendCount(countText);
    }
  };

  const onChangeHandler = (e: any) => {
    console.log("on change digit");
    console.log(e.target.value);
    if (
      /^-?[0-9]\d*(\.\d+)?$/.test(e.target.value) || // https://regex101.com/r/uJ0bS8/1 es un regex que acepta numeros enteros y decimales, positivos o negativos
      e.target.value === "" || // el usuario borro el num en el input
      e.target.value.startsWith("-") || // el usuario empezo a escribir un num negativo
      e.target.value.endsWith(".") && !e.target.value.startsWith("-.") // el usuario va a escribir un decimal
    ) {
      if(digitData.minValue != undefined){
        if(parseFloat(e.target.value) < digitData.minValue){
          setMostrarError(true);
        }
        else{
          setMostrarError(false);
        }
      }
      if(digitData.maxValue != undefined){
        if(parseFloat(e.target.value) > digitData.maxValue){
          setMostrarError(true);
        }
        else{
          setMostrarError(false);
        }
      }
      setCount(e.target.value);
      sendCount(e.target.value);
    }
  };

  const onFocusHandler = (e: any) => {
    let splitCount = e.target.value.split(" ");
    if(digitData.minValue != undefined){
      if(parseFloat(splitCount[0]) < digitData.minValue){
        setMostrarError(true);
        setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
        sendCount(digitData.minValue.toString());
        return;
      }
      else{
        setMostrarError(false);
      }
    }
    if(digitData.maxValue != undefined){
      if(parseFloat(splitCount[0]) > digitData.maxValue){
        setMostrarError(true);
        setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
        sendCount(digitData.maxValue.toString());
        return;
      }
      else{
        setMostrarError(false);
      }
    }
    setCount(splitCount[0]);
    sendCount(splitCount[0]);
  };

  const onBlurHandler = (e: any) => {
    let splitCount = e.target.value.split(" ");
    if(digitData.minValue != undefined){
      if(parseFloat(splitCount[0]) < digitData.minValue){
        setMostrarError(true);
        setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
        sendCount(digitData.minValue.toString());
        return;
      }
      else{
        setMostrarError(false);
      }
    }
    if(digitData.maxValue != undefined){
      if(parseFloat(splitCount[0]) > digitData.maxValue){
        setMostrarError(true);
        setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
        sendCount(digitData.maxValue.toString());
        return;
      }
      else{
        setMostrarError(false);
      }
    }
    setCount(splitCount[0]);
    sendCount(splitCount[0]);
  };

  const focusHandler = (e: any) => {
    if (e.keyCode === 13) {
      if (count === "") {
        document.getElementById(digitData.id)?.blur();
        let cero = 0;
        let ceroCount = cero.toFixed(digitData.decimals).toString();
        if(digitData.minValue != undefined){
          if(parseFloat(ceroCount) < digitData.minValue){
            setMostrarError(true);
            setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
            sendCount(digitData.minValue.toString());
            return;
          }
          else{
            setMostrarError(false);
          }
        }
        if(digitData.maxValue != undefined){
          if(parseFloat(ceroCount) > digitData.maxValue){
            setMostrarError(true);
            setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
            sendCount(digitData.maxValue.toString());
            return;
          }
          else{
            setMostrarError(false);
          }
        }
        setCount((ceroCount + " " + digitData.subfix).trim());
        sendCount(ceroCount);
      } else {
        document.getElementById(digitData.id)?.blur();
        let StrToNum = parseFloat(count);
        let countText = StrToNum.toFixed(digitData.decimals).toString();
        if(digitData.minValue != undefined){
          if(parseFloat(countText) < digitData.minValue){
            setMostrarError(true);
            setCount((digitData.minValue.toString() + " " + digitData.subfix).trim());
            sendCount(digitData.minValue.toString());
            return;
          }
          else{
            setMostrarError(false);
          }
        }
        if(digitData.maxValue != undefined){
          if(parseFloat(countText) > digitData.maxValue){
            setMostrarError(true);
            setCount((digitData.maxValue.toString() + " " + digitData.subfix).trim());
            sendCount(digitData.maxValue.toString());
            return;
          }
          else{
            setMostrarError(false);
          }
        }
        setCount((countText + " " + digitData.subfix).trim());
        sendCount(countText);
      }
    }
  };

  // console.log("DigitData");
  // console.log(digitData);

  return (
    <div className="flex flex-col">
      {
        (mostrarError && digitData.errorMessage !== undefined) && <div>
          <p className="text-xs text-bold text-red-100">{digitData.errorMessage}</p>
        </div>
      }
      <div className="my-1 relative inline-flex rounded-md">
        <button
            onClick={onSubHandler}
            className={`relative p-2 inline-flex items-center rounded-l-md border border-1 bg-white text-xs font-medium focus:outline-none focus:ring-none focus:border-none hover:bg-gray-50 ${mostrarError ? "border-red-100 text-red-100" : "border-gray-200 text-gray-500"}`}
        >
            <MdRemove className={`text-gray-600 text-lg ${mostrarError ? "text-red-100" : "text-gray-600"}`} />
        </button>

        <input
            id={digitData.id}
            placeholder={digitData.placeholder}
            type="text"
            value={count + (type === "variacion" ? "%" : "")}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onKeyDown={focusHandler}
            // onBlur={onBlurHandler}
            //${sizeFull ? "w-full" : "w-20/24"}
            className={`relative w-full inline-flex text-center border border-1 bg-white text-xs font-medium text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 ${mostrarError ? "border-red-100 text-red-100" : "border-gray-200 text-gray-400"}`}
        />

        <button
            onClick={onAddHandler}
            className={`relative p-2 inline-flex items-center rounded-r-md border border-1 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-none focus:border-none ${mostrarError ? "border-red-100 text-red-100" : "border-gray-200 text-gray-500"}`}
        >
            <MdAdd className={`text-gray-600 text-lg ${mostrarError ? "text-red-100" : "text-gray-600"}`} />
        </button>
      </div>
    </div>
  );
};

export { Digit };
