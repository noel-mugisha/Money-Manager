
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addThousandsSeparator } from '../utils/utils';

const currencySymbol = "Rwf";

const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        
        // Group items by category name for display
        const categoryGroup = data.items.reduce((acc, item) => {
            const categoryName = item.category?.name || 'Uncategorized';
            acc[categoryName] = (acc[categoryName] || 0) + Number(item.amount);
            return acc;
        }, {});

        return (
            <div className="p-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl text-gray-800">
                <p className="text-sm font-semibold mb-1 p-1 bg-purple-100 rounded">
                    Total: {currencySymbol} {addThousandsSeparator(data.totalAmount)}
                </p>
                <p className="text-xs text-gray-500 mb-2">Details:</p>
                <div className="space-y-1 text-xs">
                    {Object.entries(categoryGroup).map(([name, amount]) => (
                        <p key={name} className="flex justify-between">
                            <span className="font-medium mr-4">{name}:</span>
                            <span className="font-mono text-gray-700">
                                {currencySymbol} {addThousandsSeparator(amount)}
                            </span>
                        </p>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
// --- End Custom Tooltip Component ---


const CustomLineChart = ({ data }) => {
    const maxAmount = data.length > 0 ? Math.max(...data.map(d => d.totalAmount)) : 0;
    const domainMax = maxAmount > 0 ? maxAmount * 1.2 : 10000;

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke="#e5e7eb" 
                    />
                    
                    {/* X-Axis (Date) */}
                    <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }} 
                    />
                    
                    {/* Y-Axis (Amount) - Styled to be minimal */}
                    <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(value) => addThousandsSeparator(value)}
                        domain={[0, domainMax]}
                        tick={{ fontSize: 12, fill: '#6b7280' }} 
                        width={60}
                    />
                    
                    {/* Custom Tooltip */}
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* The main Area Chart line and fill */}
                    <Area 
                        type="monotone" // Creates the smooth, curved line seen in the screenshot
                        dataKey="totalAmount" 
                        stroke="#8b5cf6" // Purple stroke
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                        activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} // Dot style
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;