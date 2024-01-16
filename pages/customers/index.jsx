import Table from '@/components/customers/table';
import { getCustomers } from '@/dataFetcher/customer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

function Customers() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchInput, setSearchInput] = useState('');

    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    const {
        data: customers,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['customers', page, limit],
        queryFn: () => getCustomers(page, limit, searchInput),
    });

    const CustomerTableColumns = ['Name', 'Phone', 'Email', 'Address'];

    const queryClient = useQueryClient();

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

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
                    <>
                        <form
                            onSubmit={handleSearch}
                            className='flex items-center justify-start gap-x-2 mb-3'
                        >
                            <input
                                type='text'
                                placeholder='Search Customers...'
                                className='input input-bordered input-primary w-full max-w-xs'
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='btn btn-secondary btn-xs sm:btn-sm md:btn-md '
                            >
                                Search
                            </button>
                        </form>
                        <Table
                            columns={CustomerTableColumns}
                            data={customers}
                            onPageChange={onPageChange}
                            onLimitChange={onLimitChange}
                            currentPage={page}
                            limit={limit}
                            // dataFetcher={getCustomers}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default Customers;
