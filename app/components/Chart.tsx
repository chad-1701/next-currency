// 'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerables);

interface Props {
    currency: string;
}

const fetchDataForDate = async (date: string, currency: string) => {
   
    const response = await fetch (`https://api.currencyapi.com/v3/historical?apikey=cur_live_qh7SqW0pCQEpdeio1zUCYkWrrnBdjMTEDZBNh7bP&currencies=${currency}&date=${date}`);
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

const fetchAndStoreData = async (currency: string) => {
    const dataMap: Record<string, number> = {};
    const datesList = getDates();

    for (const date of datesList) {
        
        const data = await fetchDataForDate(date, currency);
        dataMap[date] = data;
    }
    console.log(dataMap);
    return dataMap;
};

const LineChart = async ({ currency }: Props) => {
    const cachedData: Record<string, number> = {}
  
        const dataMap = await fetchAndStoreData(currency);
            
                const chartData = {
                    labels: Object.keys(dataMap),
                    datasets: [
                        {
                            label: currency,
                            data: Object.values(dataMap),
                        },
                        {
                            label: "USD",
                            data: [1,1,1,1,1,1],
                        },
                    ],
                };
            
    

    return (
        <div>
            <Line data={chartData}></Line>
        </div>
    );
};

export default LineChart;
