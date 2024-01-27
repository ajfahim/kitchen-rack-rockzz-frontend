import { getDailySales, getMonthlySales } from '@/dataFetcher/orders';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const SalesChart = () => {
    const [timePeriod, setTimePeriod] = useState('daily');
    const [year, setYear] = useState(dayjs().year());
    console.log('🚀 ~ SalesChart ~ year:', year);
    const queryClient = useQueryClient();
    const { data: dailySales, isLoading } = useQuery({
        queryKey: ['orders', 'daily-sales'],
        queryFn: () => getDailySales(),
    });

    const { data: monthlySales, isLoading: isMonthlyChartLoading } = useQuery({
        queryKey: ['orders', year],
        queryFn: () => getMonthlySales(year),
    });

    return (
        <div className='shadow-xl rounded-xl  p-3 w-full h-[30rem]'>
            <div>
                {!isLoading && !isMonthlyChartLoading ? (
                    <p className='flex justify-center items-center text-2xl font-bold text-secondary-focus '>
                        {` Sales Chart ${
                            timePeriod === 'daily' ? dailySales?.month : monthlySales?.year
                        }`}
                    </p>
                ) : (
                    <span className='w-full h-96'>
                        <Skeleton active />
                    </span>
                )}
                <div className='flex justify-end items-center gap-3 pr-10'>
                    <Select
                        className='w-[100px]'
                        onChange={(value) => setTimePeriod(value)}
                        defaultValue={'daily'}
                        options={[
                            { value: 'daily', label: 'Daily' },
                            { value: 'monthly', label: 'Monthly' },
                        ]}
                    />
                    {timePeriod === 'monthly' && (
                        <DatePicker
                            picker='year'
                            allowClear={false}
                            onChange={(value) => {
                                setYear(dayjs.tz(value, 'Asia/Dhaka').year());
                                queryClient.invalidateQueries({
                                    queryKey: ['orders', year],
                                });
                            }}
                        />
                    )}
                </div>
            </div>
            <div className='w-full h-96'>
                {!isLoading && !isMonthlyChartLoading ? (
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
