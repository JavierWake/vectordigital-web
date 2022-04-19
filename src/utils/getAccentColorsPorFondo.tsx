const getAccentColorPorFamiliaFondo = (nombreFamFondo: string) => {
    let darkColor: string = "";
    let lightColor: string = "";
    switch(nombreFamFondo.trim().toLowerCase()){
        case "Instrumentos de Deuda".toLowerCase():
        case "Fondos de Deuda".toLowerCase():
        case "Deuda".toLowerCase():
            darkColor = "purple-900";
            lightColor = "purple-850";
            break;
        case "Instrumentos de Cobertura".toLowerCase():
        case "Fondos de Cobertura".toLowerCase():
        case "Cobertura".toLowerCase():
            darkColor = "green-200";
            lightColor = "green-150";
            break;
        case "Instrumentos de Renta Variable".toLowerCase():
        case "Fondos de Renta Variable Nacionales".toLowerCase():
        case "Renta Variable".toLowerCase():
            darkColor = "green-300";
            lightColor = "green-250";
            break;
        case "Fondos Internacionales".toLowerCase():
        case "Fondos de Renta Variable Internacionales".toLowerCase():
            //por mientras el color de naranja Vector
            darkColor = "gray-350";
            lightColor = "gray-650";
            break;
        case "Cartera de fondos".toLowerCase():
        case "Fondos Estrategicos".toLowerCase():
        case "Fondos Estratégicos".toLowerCase():
            darkColor = "red-600";
            lightColor = "red-550";
            break;
        case "Fondos de Fondos".toLowerCase():
            //por mientras el color de naranja Vector
            darkColor = "red-200";
            lightColor = "red-200";
            break;
        case "Distribucion".toLowerCase():
        case "Distribución".toLowerCase():
            //por mientras el color de naranja Vector
            darkColor = "green";
            lightColor = "green";
            break;
        default:
            //por default el color de naranja Vector
            darkColor = "red-600";
            lightColor = "red-550";
            break;
    }
    
    return {darkColor, lightColor};
}

/*
    CODIGO DONDE TENIA LA LOGICA DE LOS COLORES EN LOS CONTAINERS DE LA SECCION DE FONDOS:

    //vars de los colores en NuestrosProductosFondos
    let deudaColorDark: String = "border-purple-900";
    let coberturaColorDark: String = "border-green-200";
    let rentaVariableColorDark: String = "border-green-300";
    let fondosEstrategicosColorDark: String = "border-red-600";

                    //decidir colores en NuestrosProductosFondos
                    if(ddFamiliaSeleccionada === "Instrumentos de Deuda"){
                        sendColorActivo("border-purple-900");
                    }
                    else if(ddFamiliaSeleccionada === "Instrumentos de Cobertura"){
                        sendColorActivo("border-green-200");
                    }
                    else if(ddFamiliaSeleccionada === "Instrumentos de Renta Variable"){
                        sendColorActivo("border-green-300");
                    }
                    else if(ddFamiliaSeleccionada === "Fondos Internacionales") {
                        sendColorActivo("border-red-600");//PENDIENTE: cambiar el color
                    }
                    else if(ddFamiliaSeleccionada === "Cartera de fondos"){
                        sendColorActivo("border-red-600");//color fondos estrategicos
                    }
                    else if(ddFamiliaSeleccionada === "Fondos de fondos"){
                        sendColorActivo("border-red-600");//PENDIENTE: cambiar el color
                    }
                    else if(ddFamiliaSeleccionada === "Distribucion"){
                        sendColorActivo("border-red-600");//PENDIENTE: cambiar el color
                    }
                    else {
                        //por alguna razon no esta activada ninguna familia, activamos la primera familia de nuevasFamilias y ponemos datos de DEUDA
                        sendDdFamiliaSeleccionada(nuevasFamilias[0].descripcion.trim(), false);
                    }
*/

export default getAccentColorPorFamiliaFondo;