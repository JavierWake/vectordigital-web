const convertToTitleCase = (str: string) => {
    if(str.length <= 1){
        return str.toUpperCase();
    }
    
    return str.replace(
        /[a-zA-ZÀ-ÿ]*/g,
        function(txt: string) {
            if(txt.length === 0){
                return "";
            }
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}

export default convertToTitleCase;