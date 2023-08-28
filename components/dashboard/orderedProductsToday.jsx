import { getOrderedProductsByDate } from '@/dataFetcher/orders';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Skeleton } from 'antd';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { BsDownload } from 'react-icons/bs';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const OrderedProductsToday = () => {
    const [date, setDate] = useState(new Date());

    const queryClient = useQueryClient();
    const { data: orderedProductsToday, isLoading } = useQuery({
        queryKey: ['orders', date],
        queryFn: () => getOrderedProductsByDate(date),
    });

    const tableRef = useRef(null);

    const handlePrint = () => {
        const printArea = document.getElementById('print-area');
        let printContents = printArea.innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className='shadow-xl rounded-xl w-1/2 p-3'>
            <div className='flex justify-between items-center gap-3'>
                <DatePicker
                    allowClear={false}
                    onChange={(value) => {
                        setDate(dayjs.tz(value, 'Asia/Dhaka').toDate());
                        queryClient.invalidateQueries({ queryKey: ['orders', date] });
                    }}
                />
                <button
                    disabled={orderedProductsToday?.length <= 0}
                    className='btn btn-square btn-outline btn-sm'
                    onClick={handlePrint}
                >
                    <BsDownload />
                </button>
            </div>
            <div
                id='print-area'
                className='flex flex-col justify-center items-center mt-3 max-h-[400px]  overflow-y-auto'
            >
                <h1 className='text-secondary-focus text-2xl mb-2 font-bold'>{`Ordered Products (${dayjs(
                    date
                ).format('DD MMMM YYYY')})`}</h1>
                {isLoading ? (
                    <Skeleton active />
                ) : orderedProductsToday?.length <= 0 ? (
                    <p className='w-full flex justify-center items-center'>
                        Looks like <span className='text-primary mx-1'>Rafa vaiya</span> forgot to
                        create orders 👊
                    </p>
                ) : (
                    <table ref={tableRef} className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Variations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedProductsToday?.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <ul className='list-disc list-inside'>
                                            {Object.entries(product.variations).map(
                                                ([variation, quantity]) => (
                                                    <li key={variation}>
                                                        {variation}: {quantity}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderedProductsToday;
