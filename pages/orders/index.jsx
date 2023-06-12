import Table from '@/components/products/table';
import { getProducts } from '@/dataFetcher/product';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

const Orders = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    const { data: products, isLoading } = useQuery({
        queryKey: ['products', page, limit],
        queryFn: () => getProducts(page, limit),
    });

    const ProductTableColumns = ['Product', 'Variations', 'Unit Price'];
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
                        columns={ProductTableColumns}
                        data={products}
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
