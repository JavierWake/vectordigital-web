const getNameInitials = (fullName: string) => {

    const fullNameSplit: string[] = fullName.split(" ");
    
    // console.log("fullNameSplit");
    // console.log(fullNameSplit);

    let initials: string = "";

    if(fullNameSplit.length > 0){
        initials += fullNameSplit[0].length > 0 ? fullNameSplit[0].charAt(0) : "";
        if(fullNameSplit.length > 1){
            initials += fullNameSplit[fullNameSplit.length - 1].length > 0 ? fullNameSplit[fullNameSplit.length - 1].charAt(0) : "";
        }
    }

    //console.log(initials);

    return initials.toUpperCase();
};

export default getNameInitials;