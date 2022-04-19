import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

//Containers
//import { Appbar } from './Appbar';
import Sidebar from '../../components/Sidebar';
import Appbar from '../../components/Appbar';

//Mocks | Dummy data
import { appBarMockData } from '../../mocks/Appbar';

import { FooterComponent } from '../FooterComponent';

interface propsFromState {

    //styleContenido?: any;
    
    childrenContentIzquierda?: React.ReactNode;
    classesContentIzquierda?: string;
    styleContentIzquierda?: any;

    childrenContentPrincipal: React.ReactNode;
    classesContentPrincipal?: string;
    styleContentPrincipal?: any;

    childrenContentDerecha?: React.ReactNode; // si no se manda este prop, no sale la columna de alado
    classesContentDerecha?: string;
    styleContentDerecha?: any;
    scrollEnContentDerecha?: boolean;

    classesSidebar?: string;
    styleSidebar?: any;

    /* titulo de la pag */
    titulo?: string;

    /* mensaje para las alertas verdes que salen al inicio de 
        la pag. estos props solo se mandan cuando hay que 
        mostrar una alerta verde, por ejemplo cuando 
        agregan una emisora a una lista, etc */
    //messageAlert?: string;
    //alertShow?: boolean;
}

type AllProps = propsFromState; 


/**
 * 
 * @param titulo: [Optional] Título que va al inicio de la página (Al lado del sidebar, abajo del navbar).
 * @param childrenContentPrincipal: [Required] Componente de react que va en el contenido principal. 
 * @param classesContentPrincipal: [Optional] String para agregar a las clases que tiene el contenedor del componente principal. Se agregan al final de las clases, entonces es posible que sobreescriba algunas clases del mismo tipo que ya están escritas.
 * @param styleContentPrincipal: [Optional] Objeto de estilos para agregar a los estilos que tiene el contenedor del componente principal. Es posible que estos estilos sobreescriban lo que esté definido en las clases si el estilo es del mismo tipo que las clases.
 * @param childrenContentIzquierda: [Optional] Componente de react que va en el contenido de la izquierda.
 * @param classesContentIzquierda: [Optional] String para agregar a las clases que tiene el contenedor del componente de la izquierda. Se agregan al final de las clases, entonces es posible que sobreescriba algunas clases del mismo tipo que ya están escritas.
 * @param styleContentIzquierda: [Optional] Objeto de estilos para agregar a los estilos que tiene el contenedor del componente de la izquierda. Es posible que estos estilos sobreescriban lo que esté definido en las clases si el estilo es del mismo tipo que las clases.
 * @param childrenContentDerecha: [Optional] Componente de react que va en el contenido de la derecha.
 * @param classesContentDerecha: [Optional] String para agregar a las clases que tiene el contenedor del componente de la derecha. Se agregan al final de las clases, entonces es posible que sobreescriba algunas clases del mismo tipo que ya están escritas.
 * @param styleContentDerecha: [Optional] Objeto de estilos para agregar a los estilos que tiene el contenedor del componente de la derecha. Es posible que estos estilos sobreescriban lo que esté definido en las clases si el estilo es del mismo tipo que las clases.
 * @param messageAlert: [Optional] String, es el mensaje que sale en la alerta verde al inicio de la pag (por ejemplo, cuando agregamos una emisora a una lista).
 * @param alertShow: [Optional] Boolean, true si vamos a mostrar la alerta verde, false si no vamos a mostrar la alerta verde. Si messageAlerta es undefined o no tiene texto, no se mostrara la alerta aunque alertShow sea true.
 * 
 * 
 * @returns componente PageLayout
 */
const PageLayout: React.FC<AllProps> = ({ childrenContentIzquierda, classesContentIzquierda, styleContentIzquierda, childrenContentPrincipal, classesContentPrincipal, styleContentPrincipal,  childrenContentDerecha, classesContentDerecha, styleContentDerecha, scrollEnContentDerecha = true, titulo, classesSidebar, styleSidebar }) => {

    //sacar el tamaño del navegador
    //HOOKS
    const [sizeNav, setSizeNav] = useState(window.innerWidth);

    const sendSizeNav = (data: number) => {
        if(data === sizeNav){
            return;
        }
        setSizeNav(data);
    };

    useEffect(() => {
        function handleResize() {
            //console.log("window.innerWidth: ", window.innerWidth);
            //console.log("window.outerWidth: ", window.outerWidth);
            sendSizeNav(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return(
        <div className="bg-white flex flex-row justify-end">

            {/* Sidebar */}
            <div 
                className={`h-full ${classesSidebar !== undefined ? classesSidebar : ""} `}
                style={ styleSidebar !== undefined ? styleSidebar : {} } //si le mandamos el styleSidebar entonces lo agregamos a esta seccion :)
            >
                <Sidebar />
            </div>
            
            {/* Appbar y Contenido */}
            <div 
                className={`flex flex-col pl-2`}
                style={{ width: sizeNav - 46/* el sidebar mide 46px */ }}
                //style={ styleContenido !== undefined ? styleContenido : {} } //si le mandamos el styleContenido entonces lo agregamos a esta seccion :)
            >
                {/* {
                (messageAlert !== undefined && alertShow !== undefined) && (messageAlert.length > 0) && <Alert className = "z-40 bg-green-50 text-black" color="info" style={{position: 'fixed', left: '10%', right: "10%" }} isOpen={alertShow} >
                    {messageAlert}
                </Alert>
                } */}

                {/* Appbar */}
                <div className="w-full bg-white z-40 flex flex-row sticky inset-y-0">
                    <Appbar appBarData={appBarMockData}/>
                </div>

                {/* Contenido */}
                <div className="w-full flex flex-row">
                    {/* Contenido a la izquierda */}
                    {
                        childrenContentIzquierda !== undefined && 
                        <div
                            className={`w-4/24 p-2 ${classesContentIzquierda !== undefined ? classesContentIzquierda : ""}`}
                            style={ styleContentIzquierda !== undefined ? styleContentIzquierda : {} } //si le mandamos el styleContentIzquierda entonces lo agregamos a esta seccion :)
                        >
                            {childrenContentIzquierda}
                        </div>
                    }

                    {/* Contenido principal */}
                    <div 
                        className={`row2 px-10 py-4 ${(childrenContentIzquierda !== undefined || childrenContentDerecha !== undefined) ? "w-18/24" : "w-full"} ${classesContentPrincipal !== undefined ? classesContentPrincipal : " "} `}
                        style={ styleContentPrincipal !== undefined ? styleContentPrincipal : {} } //si le mandamos el styleContentPrincipal entonces lo agregamos a esta seccion :)
                    >
                        {/* contenido principal */}
                        {
                            titulo !== undefined && <h1 className="font-sans text-2xl font-medium">{titulo}</h1>
                        }
                        {childrenContentPrincipal}
                    </div>

                    {/* Contenido a la derecha */}
                    {
                        /* si le mandaron contenido a la derecha, y tmb que no le 
                            hayan mandado contenido a la izq. Es decir, si le 
                            mandaron contenido a la izq, por default ya no va a 
                            haber contenido a la derecha. */
                        (childrenContentDerecha !== undefined && childrenContentIzquierda === undefined) && 
                            <div 
                                className={`${(scrollEnContentDerecha === false) ? "" : "sticky inset-x-0 top-0 overflow-y-auto h-screen"} ${classesContentDerecha !== undefined ? classesContentDerecha : " w-6/24 py-3 px-2 "} `}
                                style={ styleContentDerecha !== undefined ? styleContentDerecha : {} } //si le mandamos el styleContentDerecha entonces lo agregamos a esta seccion :)
                            >
                                {/* contenido col derecha */}
                                {childrenContentDerecha}
                            </div>
                    }
                </div>

                {/* Footer */}
                <FooterComponent />

            </div>
        </div>
    );
};

export default PageLayout;