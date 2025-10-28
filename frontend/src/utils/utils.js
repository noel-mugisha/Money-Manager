
export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const numStr = num.toString();
    const parts = numStr.split('.'); 
    
    let integerPart = parts[0];
    const fractionalPart = parts[1];
    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
    );
    
    return fractionalPart ? `${formattedIntegerPart}.${fractionalPart}` : formattedIntegerPart;
};