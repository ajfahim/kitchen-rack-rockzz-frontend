import { getOrderedProductsByDate } from '@/dataFetcher/orders';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';

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

    return (
        <div className=''>
            <h1 className='text-secondary-focus block text-2xl mb-2 font-bold'>Ordered Products</h1>
            <div className='shadow-xl rounded-xl  p-3 max-h-[600px] overflow-y-scroll'>
                <div className='flex justify-between items-center gap-3'>
                    <DatePicker
                        allowClear={false}
                        onChange={(value) => {
                            setDate(dayjs.tz(value, 'Asia/Dhaka').toDate());
                            queryClient.invalidateQueries({ queryKey: ['orders', date] });
                        }}
                    />
                    <ReactToPrint
                        trigger={() => (
                            <button
                                disabled={orderedProductsToday?.length <= 0}
                                className='btn btn-square btn-outline btn-sm'
                            >
                                <BsDownload />
                            </button>
                        )}
                        content={() => tableRef.current}
                    />
                    {/* <button
                        disabled={orderedProductsToday?.length <= 0}
                        className='btn btn-square btn-outline btn-sm'
                        onClick={handlePrint}
                    >
                        <BsDownload />
                    </button> */}
                </div>
                <div
                    ref={tableRef}
                    id='print-area'
                    className='flex flex-col justify-center items-center mt-3'
                >
                    <h3 className='text-secondary-focus block text-xl mb-2 font-bold'>{`Ordered Products (${dayjs(
                        date
                    ).format('DD MMMM YYYY')})`}</h3>
                    {isLoading ? (
                        <Skeleton active />
                    ) : orderedProductsToday?.length <= 0 ? (
                        <p className='w-full flex justify-center items-center'>
                            Looks like <span className='text-primary mx-1'>Rafa vaiya</span> forgot
                            to create orders 👊
                        </p>
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Variations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedProductsToday?.map((product, index) => (
                                    <tr className='border-b-2 border-gray-700' key={index}>
                                        <td>{index + 1}</td>
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
        </div>
    );
};

export default OrderedProductsToday;
