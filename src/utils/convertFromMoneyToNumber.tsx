export const convertFromMoneyToNumber = (money: string) => {
    return money
        .replaceAll("$", "")
        .replaceAll(",", "");
};

//export default convertFromMoneyToNumber;