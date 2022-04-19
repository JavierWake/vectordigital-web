export const hideCuentaDeBanco = (str: string) => {
    if(str.length <= 4){
        return str;
    }

    //987654321
    let returnStr = str.substring(0, str.length - 4);

    //reemplazamos los digitos por asteriscos
    returnStr = returnStr.replaceAll(
        /\d/g,
        function() {
            return "*";
        }
    );

    returnStr += str.substring(str.length - 4);
    
    if(returnStr.length !== str.length){
        return str;
    }

    return returnStr;
}

//export default hideCuentaDeBanco;