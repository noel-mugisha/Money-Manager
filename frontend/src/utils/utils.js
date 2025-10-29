import moment from "moment";

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

export const prepareIncomeLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];

    const groupedByDate = transactions.reduce((acc, transaction) => {
        const dateKey = moment(transaction.date).format('YYYY-MM-DD');
        
        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: [],
                month: moment(transaction.date).format('Do MMM'),
            };
        }
        acc[dateKey].totalAmount += Number(transaction.amount);
        acc[dateKey].items.push(transaction);

        return acc;
    }, {});
    const chartData = Object.values(groupedByDate).sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );

    return chartData;
};