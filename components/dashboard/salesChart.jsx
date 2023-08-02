import { getDailySales, getMonthlySales } from '@/dataFetcher/orders';
import { useQuery } from '@tanstack/react-query';
import { Select, Skeleton } from 'antd';
import React, { PureComponent, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {
    const [timePeriod, setTimePeriod] = useState('daily');

    const { data: dailySales, isLoading } = useQuery({
        queryKey: ['orders', 'daily-sales'],
        queryFn: () => getDailySales(),
    });
    console.log('🚀 ~ file: salesChart.jsx:23 ~ SalesChart ~ dailySales:', dailySales);

    const { data: monthlySales } = useQuery({
        queryKey: ['orders', 'monthly-sales'],
        queryFn: () => getMonthlySales(),
    });
    console.log('🚀 ~ file: salesChart.jsx:29 ~ SalesChart ~ monthlySales:', monthlySales);

    return (
        <div className='shadow-xl rounded-xl  p-3 w-full h-[30rem]'>
            <div>
                <p className='flex justify-center items-center text-2xl font-bold text-secondary-focus '>
                    {` Sales Chart ${
                        timePeriod === 'daily' ? dailySales?.month : monthlySales?.year
                    }`}
                </p>
                <div className='flex justify-end items-center'>
                    <Select
                        onChange={(value) => setTimePeriod(value)}
                        defaultValue={'daily'}
                        options={[
                            { value: 'daily', label: 'Daily' },
                            { value: 'monthly', label: 'Monthly' },
                        ]}
                    />
                </div>
            </div>
            <div className='w-full h-96'>
                {!isLoading ? (
                    <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart
                            width={500}
                            height={400}
                            data={timePeriod === 'daily' ? dailySales?.data : monthlySales?.data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey={timePeriod === 'daily' ? 'date' : 'month'} />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type='monotone'
                                dataKey='totalSales'
                                stroke='#8884d8'
                                fill='#8884d8'
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <span className='w-full h-96'>
                        <Skeleton active />
                    </span>
                )}
            </div>
        </div>
    );
};

export default SalesChart;
