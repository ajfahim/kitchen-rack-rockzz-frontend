import Table from '@/components/orderDrafts/table';
import { getOrderDrafts } from '@/dataFetcher/orderDrafts';
import { useQuery } from '@tanstack/react-query';
import { DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

const OrderDrafts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [selectedDate, setSelectedDate] = useState(null);

    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    
    const { data: orderDrafts, isLoading } = useQuery({
        queryKey: ['order-drafts', page, limit, selectedDate],
        queryFn: () => getOrderDrafts(page, limit, selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null),
    });

    const OrderDraftsTableColumns = [
        'Order Draft Id',
        'Customer Details',
        'Order Details',
        'Processing Date',
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPage(1); // Reset to first page when date changes
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)]">
            {/* page title and actions */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4'>
                <h1 className='font-black text-2xl text-primary'>Order Drafts</h1>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <Link 
                        className='btn btn-secondary whitespace-nowrap w-full sm:w-auto text-center' 
                        href={'/order-drafts/add'}
                    >
                        Create New Order Draft
                    </Link>
                    <div className="relative w-full sm:w-auto">
                        <DatePicker 
                            onChange={handleDateChange}
                            value={selectedDate}
                            placeholder="Filter by date"
                            allowClear
                            style={{ width: '100%' }}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            dropdownAlign={{ offset: [0, 0] }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 relative min-h-[500px]">
                <Spin spinning={isLoading} size="large">
                    <Table
                        columns={OrderDraftsTableColumns}
                        data={orderDrafts}
                        onPageChange={onPageChange}
                        onLimitChange={onLimitChange}
                        currentPage={page}
                        limit={limit}
                    />
                </Spin>
            </div>
        </div>
    );
};

export default OrderDrafts;
