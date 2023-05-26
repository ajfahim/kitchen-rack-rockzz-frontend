import Table from '@/components/customers/table';
import { getCustomers } from '@/dataFetcher/customer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Customers() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    const { data: customers, isLoading } = useQuery({
        queryKey: ['customers', page, limit],
        queryFn: () => getCustomers(page, limit),
    });

    const CustomerTableColumns = ['Name', 'Phone', 'Email', 'Address'];

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between my-4'>
                <h1>Customers</h1>
                <Link className='btn btn-secondary' href={'/customers/add'}>
                    Add Customer
                </Link>
            </div>
            <div>
                {isLoading ? (
                    'loading...'
                ) : (
                    <Table
                        columns={CustomerTableColumns}
                        data={customers}
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
}

export default Customers;
