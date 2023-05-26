import Table from '@/components/customers/table';
import Link from 'next/link';
import React from 'react';

const Products = () => {
    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between my-4'>
                <h1>Products</h1>
                <Link className='btn btn-secondary' href={'/products/add'}>
                    Add Product
                </Link>
            </div>
            {/* <div>
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
            </div> */}
        </>
    );
};

export default Products;
