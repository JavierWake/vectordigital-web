import React, { useState, useEffect } from 'react';
import { Dropdown } from "../containers/Dropdown";
import NuestrosProductosFondosCard from './NuestrosProductosFondosCard';
import { ITdsFamilia, ITdsFondoNuevaFamilias } from '../types/FondosNuevaFamiliasTypes';
import getAccentColorPorFamiliaFondo from '../utils/getAccentColorsPorFondo';

//State of the component
interface propsFromState {
    nuevasFamilias: ITdsFamilia[];
    sendFondoSeleccionado: (data: string) => void;
}

type AllProps = propsFromState;

const NuestrosProductosFondos: React.FC<AllProps> = ({ sendFondoSeleccionado, nuevasFamilias}) =>{
    //console.log("entro a nuestros productos");
    //HOOKS 
    const [ddMercadoSeleccionado, setDdMercadoSeleccionado] = useState('Mercado Nacional');
    const [ddFamiliaSeleccionada, setDdFamiliaSeleccionada] = useState("");
    const [colorActivo, setColorActivo] = useState("");
    const [productosDisponiblesUnicos, setProductosDisponiblesUnicos] = useState<ITdsFondoNuevaFamilias[]>([]);
    const [dropdownDataFamilias, setDropdownDataFamilias] = useState<any[]>([])

    const [verMas, setVerMas] = useState(false);

    const sendDdFamiliaSeleccionada = (data: string, userEligio: boolean) => {
        if(ddFamiliaSeleccionada === data && userEligio === true){
            setDdFamiliaSeleccionada(data);
            return;
        }

        if(ddFamiliaSeleccionada === data){
            return;
        }
        setDdFamiliaSeleccionada(data);
    };

    const sendColorActivo = (data: string) => {
        if(colorActivo === data){
            return;
        }
        setColorActivo(data);
    };

    const sendProductosDisponiblesUnicos = (data: ITdsFondoNuevaFamilias[]) => {
        if(productosDisponiblesUnicos === data){
            return;
        }
        setProductosDisponiblesUnicos(data);
    };

    const sendVerMas = (data: boolean) => {
        if(verMas === data){
            return;
        }
        setVerMas(data);
    };

    const sendDropdownDataFamilias = (data: any[]) => {
        if(dropdownDataFamilias === data){
            return;
        }
        setDropdownDataFamilias(data);
    };

    useEffect(() => {
        if(nuevasFamilias != undefined){
            if(nuevasFamilias.length > 0){
                sendDropdownDataFamilias(nuevasFamilias.map((fam: ITdsFamilia) => {
                    const colorFondo: string = getAccentColorPorFamiliaFondo(fam.descripcion).darkColor;                    
                    let famCorrecta: string = fam.descripcion.trim();
                    if(famCorrecta === "Distribucion"){
                        famCorrecta = "Distribución";
                    }
                    return {
                        id: fam.Tipo.trim(),
                        option: famCorrecta,
                        circle_tw_class_bg_color: colorFondo,
                    };
                }));
                sendDdFamiliaSeleccionada(nuevasFamilias[0].descripcion.trim(), false);
            }
        }
    }, [nuevasFamilias]);

    useEffect(() => {
        if(ddFamiliaSeleccionada.length > 0){
            if(nuevasFamilias != undefined){
                if(nuevasFamilias.length > 0){
                    let familiaFilter: ITdsFamilia[];
    
                    if(ddMercadoSeleccionado === "Mercado Internacional" && ddFamiliaSeleccionada === "Fondos Internacionales"){
                        // mostramos solo "Fondos Internacionales"
                        familiaFilter = nuevasFamilias.filter((familia: ITdsFamilia) => {
                            return familia.descripcion.trim() === ddFamiliaSeleccionada.trim();
                        });
        
                        if(familiaFilter.length > 0){
                            const productosUnicos: ITdsFondoNuevaFamilias[] = familiaFilter[0].tdsFondo.filter((fondo: ITdsFondoNuevaFamilias, position: number) => {
                                let index = familiaFilter[0].tdsFondo.map((e: ITdsFondoNuevaFamilias) => e.Emisora).indexOf(fondo.Emisora);
                                return index === position;
                            });
        
                            //SENDs
                            sendProductosDisponiblesUnicos(productosUnicos);
                        }
                        else{
                            sendProductosDisponiblesUnicos([]);
                        }
                    }
                    else if(ddMercadoSeleccionado === "Mercado Internacional"){
                        //mostramos array vacio
                        sendProductosDisponiblesUnicos([]);
                    }
                    else if(ddFamiliaSeleccionada === "Fondos Internacionales"){
                        //mostramos array vacio
                        sendProductosDisponiblesUnicos([]);
                    }
                    else{
                        //mostramos cualquiera de las opciones seleccionadas
                        familiaFilter = nuevasFamilias.filter((familia: ITdsFamilia) => {
                            return familia.descripcion.trim() === ddFamiliaSeleccionada.trim();
                        });
        
                        if(familiaFilter.length > 0){
                            const productosUnicos: ITdsFondoNuevaFamilias[] = familiaFilter[0].tdsFondo.filter((fondo: ITdsFondoNuevaFamilias, position: number) => {
                                let index = familiaFilter[0].tdsFondo.map((e: ITdsFondoNuevaFamilias) => e.Emisora).indexOf(fondo.Emisora);
                                return index === position;
                            });
        
                            //SENDs
                            sendProductosDisponiblesUnicos(productosUnicos);
                        }
                        else{
                            sendProductosDisponiblesUnicos([]);
                        }
                    }

                    const colorFamSelec = getAccentColorPorFamiliaFondo(ddFamiliaSeleccionada);
                    sendColorActivo("border-" + colorFamSelec.darkColor);
    
                }
            }
        }
    }, [ddFamiliaSeleccionada, ddMercadoSeleccionado]);

    const dropDownDataMercado = [
        {
            id: 'nacional',
            option: 'Mercado Nacional',
        },
        {
            id: 'internacional',
            option: 'Mercado Internacional',
        },
    ];

    if(nuevasFamilias.length === 0){
        return (
            <div className="w-full flex flex-col">
                <p className="text-sm text-gray-600 py-4">No hay datos por el momento, intenta más tarde.</p>
            </div>
        );
    }

    return(
        <div className="w-full flex flex-col">
            <div id="dropdowns" className="w-full flex flex-row my-3 items-center">
                <div className="ddMercado w-1/3 h-full pr-4">
                    <Dropdown sendOption={(opcion) => setDdMercadoSeleccionado(opcion)} dropdownData={dropDownDataMercado} initialOption={ddMercadoSeleccionado} side={false} sizeFull={true} fondosFamilia={false} />
                </div>
                <div className="ddFamilia w-1/3 h-full">
                    <Dropdown sendOption={(opcion) => sendDdFamiliaSeleccionada(opcion, true)} dropdownData={dropdownDataFamilias} initialOption={ddFamiliaSeleccionada} side={false} sizeFull={true} fondosFamilia={true}/>
                </div>
            </div>
            <div id="fondosCards" className="flex flex-row flex-wrap justify-between">
                {
                    productosDisponiblesUnicos && productosDisponiblesUnicos.map(function(item: ITdsFondoNuevaFamilias, itemPosition: number){
                        //si verMas === false, solo mostramos los primeros 4 (osea position === 0, 1, 2, 3)
                        if(verMas === false){
                            if(itemPosition >= 4){
                                return;
                            }
                        }
                        //si verMas === true, mostramos todo (osea seguimos con la logica)
                        
                        //si mercSelec === "Mercado Nacional" -> solo mostramos donde Fondo_VCB = true
                        if(ddMercadoSeleccionado === "Mercado Nacional" && !item.Fondo_VCB){
                            return <div key={item.Emisora + item.Serie}></div>;
                        }

                        let estrellasMS: number = 0;
                        if(/\d/.test(item.EstrellasMS) && parseFloat(item.EstrellasMS) > 0){
                            estrellasMS = parseFloat(item.EstrellasMS);
                        }
                        else{
                            estrellasMS = item.EstrellasMS.length;
                        }

                        return(
                            <NuestrosProductosFondosCard key={item.Emisora + item.Serie} item={item} color={colorActivo} estrellas={estrellasMS} sendFondoSeleccionado={sendFondoSeleccionado} />
                        );
                    })
                }
            </div>
            <div id="btnVerMasProductos" className="py-4">
                <div id="cantDeProductos">
                    <p className="text-xs text-gray-500 text-right py-2">{productosDisponiblesUnicos.length.toString() + " " + (productosDisponiblesUnicos.length === 1 ? "producto" : "productos")}</p>
                </div>
                {
                    productosDisponiblesUnicos.length > 4 && <div onClick={() => sendVerMas(!verMas)} className="w-full text-right pb-2 cursor-pointer">
                        <p className="text-sm text-red-600 cursor-pointer hover:underline text-right">
                            {
                                verMas === true ?
                                    "Ver menos productos"
                                :
                                    "Ver más productos"
                            }
                        </p>
                    </div>
                }
            </div>
        </div>
    );
 }

export default NuestrosProductosFondos;