import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../utils/utils"; 
import CustomLineChart from "./CustomLineChart"; 

const IncomeOverview = ({transactions}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions); 
        setChartData(result);
    }, [transactions])

    return (
        <div className="card p-5"> 
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-xl font-semibold text-gray-800">Income Overview</h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
            </div>
            <div className="mt-8 h-80">
                 {chartData && chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
                 ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                       No income data available for chart.
                    </div>
                 )}
            </div>
        </div>
    )
}

export default IncomeOverview;