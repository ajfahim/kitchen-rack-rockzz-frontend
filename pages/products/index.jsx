import Table from '@/components/products/table';
import { getProducts } from '@/dataFetcher/product';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

const Products = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchInput, setSearchInput] = useState('');

    const onPageChange = (data) => setPage(data);
    const onLimitChange = (data) => setLimit(data);
    const {
        data: products,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['products', page, limit],
        queryFn: () => getProducts(page, limit, searchInput),
    });

    const ProductTableColumns = ['Product', 'Variations', 'Unit Price'];

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };
    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between my-4'>
                <h1>Products</h1>
                <Link className='btn btn-secondary' href={'/products/add'}>
                    Add Product
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
                            columns={ProductTableColumns}
                            data={products}
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
};

export default Products;
