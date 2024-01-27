import { getOrderListByDate } from '@/dataFetcher/orders';
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

const OrderListPerDay = () => {
    const [date, setDate] = useState(new Date());

    const queryClient = useQueryClient();
    const { data: orderListToday, isLoading } = useQuery({
        queryKey: ['orders', date],
        queryFn: () => getOrderListByDate(date),
    });
    const printableRef = useRef(null);

    return (
        <div className='w-1/2'>
            <h1 className='text-secondary-focus block text-2xl mb-2 font-bold'>
                Customer wise order list
            </h1>
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
                                disabled={orderListToday?.orders?.length <= 0}
                                className='btn btn-square btn-outline btn-sm'
                            >
                                <BsDownload />
                            </button>
                        )}
                        content={() => printableRef.current}
                    />
                </div>
                <div
                    id='print-area-order-list'
                    className='flex flex-col justify-center items-center mt-3 '
                    ref={printableRef}
                >
                    <h3 className='text-secondary-focus block text-xl mb-2 font-bold'>{`Customer wise order list (${dayjs(
                        date
                    ).format('DD MMMM YYYY')})`}</h3>
                    {isLoading ? (
                        <Skeleton active />
                    ) : orderListToday?.orders?.length <= 0 ? (
                        <p className='w-full flex justify-center items-center'>
                            Looks like <span className='text-primary mx-1'>Rafa vaiya</span> forgot
                            to create orders 👊
                        </p>
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>qty</th>
                                    <th>variations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderListToday?.orders?.map((d, index) => (
                                    <tr key={d._id}>
                                        <td>{index + 1}</td>
                                        <td className='!max-w-[300px] !text-wrap'>
                                            {d.customer.name}
                                        </td>
                                        <td>
                                            {d.products.map((d) => {
                                                return (
                                                    <tr key={d.product._id}>
                                                        <td>{d?.product?.name}</td>
                                                    </tr>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            {d.products.map((d) => {
                                                return (
                                                    <tr key={d.product._id}>
                                                        <td>{d?.quantity}</td>
                                                    </tr>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            {d.products.map((d) => {
                                                return (
                                                    <tr key={d.product._id}>
                                                        <td>
                                                            {d?.product?.hasVariation ? (
                                                                <span>
                                                                    {
                                                                        d.product.variations.filter(
                                                                            (f) =>
                                                                                f._id ===
                                                                                d?.variation
                                                                        )[0].unit
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-500'>
                                                                    N/A
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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

export default OrderListPerDay;
