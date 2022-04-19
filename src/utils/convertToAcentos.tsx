const convertToAcentos = (str: string) => {
    return str
        //acentos en minus y mayus
        .replaceAll("&aacute;", "á")
        .replaceAll("&eacute;", "é")
        .replaceAll("&iacute;", "í")
        .replaceAll("&oacute;", "ó")
        .replaceAll("&uacute;", "ú")
        .replaceAll("&Aacute;", "Á")
        .replaceAll("&Eacute;", "É")
        .replaceAll("&Iacute;", "Í")
        .replaceAll("&Oacute;", "Ó")
        .replaceAll("&Uacute;", "Ú")

        //letra enie
        .replaceAll("&ntilde;", "ñ")
        .replaceAll("&Ntilde;", "Ñ");
}

export default convertToAcentos;