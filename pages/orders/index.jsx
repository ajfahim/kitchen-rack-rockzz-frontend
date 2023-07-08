import Table from '@/components/orders/table';
import { getOrders } from '@/dataFetcher/orders';
import { getProducts } from '@/dataFetcher/product';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

const Orders = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders', page, limit],
        queryFn: () => getOrders(page, limit),
    });

    const OrderTableColumns = [
        'Order Id',
        'Customer Name',
        'Products',
        'Total Price',
        'Processing Date',
        'Delivery Date',
    ];
    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between my-4'>
                <h1>Orders</h1>
                <Link className='btn btn-secondary' href={'/orders/add'}>
                    Create New Order
                </Link>
            </div>
            <div>
                {isLoading ? (
                    'loading...'
                ) : (
                    <Table
                        columns={OrderTableColumns}
                        data={orders}
                        onPageChange={onPageChange}
                        onLimitChange={onLimitChange}
                        currentPage={page}
                        limit={limit}
                        // dataFetcher={getCustomers}
                    />
                )}
            </div>
        </>
    );
};

export default Orders;
