import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(...registerables);

interface Props {
    currency: string;
}

const fetchDataForDate = async (date: string, { currency }: Props) => {
    const response = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=cur_live_0ZnsS5cJ1nYkxjlidEdzDRFKZmfc2VVr4hzdo2M0&currencies=${currency}&date=${date}`
    );
    const data = await response.json();
    console.log(data['data'][currency]['value']);
    return data['data'][currency]['value'];
};

const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().slice(0, 10));
        console.log(date);
    }
    return dates.reverse();
};

const LineChart = ({ currency }: Props) => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchAndStoreData = async () => {
            const dataMap: Record<string, number> = {};
            const datesList = getDates();

            for (const date of datesList) {
                const data = await fetchDataForDate(date, { currency });
                dataMap[date] = data;
            }
            console.log(dataMap);
            const chartData = {
                labels: Object.keys(dataMap),
                datasets: [
                    {
                        label: currency,
                        data: Object.values(dataMap),
                        backgroundColor: 'gray',
                        borderColor: 'gray',
                        borderWidth: 1,
                    },
                    {
                        label: 'USD',
                        data: [1,1,1,1,1,1],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
            
                    }
                ],
            };
            setChartData(chartData);
        };

        fetchAndStoreData();
    }, [currency]);

    return (
        <div>
            {chartData && <Line data={chartData} />}
        </div>
    );
};

export default LineChart;
