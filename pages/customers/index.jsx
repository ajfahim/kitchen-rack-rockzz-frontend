import Table from '@/components/customers/table';
import { getCustomers } from '@/dataFetcher/customer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function About() {
    const queryClient = useQueryClient();
    const { data: customers, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    });
    console.log('🚀 ~ file: index.jsx:13 ~ About ~ data:', customers);

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
            <Table columns={CustomerTableColumns} data={customers} />
        </>
    );
}

export default About;
