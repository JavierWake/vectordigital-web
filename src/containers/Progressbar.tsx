import React from "react";
import { BsCircleFill } from "react-icons/bs";

const ProgressBar = ({ progressPercentage, type, progressData, id, color, type2 }:any) => {
	return (
		<div className={'w-full overflow-hidden relative ' + ((type === "analistaCompra" || type === "analistaMantener" || type === "analistaVender" ) ? " bg-gray-300 h-2" : (type2 === "trading") ? "bg-white h-6" : "bg-white h-6")}>
			<div style={{ width: `${progressPercentage}%`}} 
				className={"h-full " +
							(type === "compra"  ? " bg-green-50 " : type === "venta"  ? " bg-red-50 " : (type === "analistaCompra" || type === "analistaMantener" || type === "analistaVender") ? " " + color + " " : "") +  
							((type === "venta" || type === "analistaCompra" || type === "analistaMantener" || type === "analistaVender")  ? " float-left " : " float-right")
						}
			>
            </div>
			<p className={
					"absolute z-20 px-2 "+ (type === "compra" ? "right-1 text-right text-green-400" 
						: type === "venta"  ? "left-1 text-left text-red-100" 
						: "")
				}
			>

				{ (type === "analistaCompra" || type === "analistaMantener" || type === "analistaVender" ) ? "" : progressData }
			</p>
		</div>
	);
};

export default ProgressBar;