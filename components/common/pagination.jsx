import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
    totalPages,
    totalCount,
    currentPage,
    onPageChange,
    onLimitChange,
    limit,
}) => {
    const handleClick = (data) => {
        onPageChange(data.selected + 1);
    };
    return (
        <>
            <div className='flex gap-1'>
                {totalCount > 10 && (
                    <div>
                        Show
                        <select
                            value={limit}
                            onChange={(e) => {
                                onLimitChange(+e.target.value);
                            }}
                            className='h-[24px] px-1 rounded mx-2 text-center focus:outline-0'
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                )}
                <p>
                    Showing {(currentPage - 1) * limit + 1 || 0}
                    &nbsp;to {Math.min(totalCount || 0, currentPage * limit || 0)} of{' '}
                    {totalCount || 0} entries
                </p>
            </div>
            {totalPages > 1 && (
                <ReactPaginate
                    // initialPage={currentPage}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLable={'...'}
                    pageCount={totalPages}
                    onPageChange={handleClick}
                    // marginPagesDisplayed={2}
                    // pageRangeDisplayed={2}
                    containerClassName={'flex justify-end my-3 space-x-1'}
                    pageLinkClassName={'btn btn-sm'}
                    previousLinkClassName={'btn btn-sm btn-outline w-[100px]'}
                    nextLinkClassName={'btn btn-sm btn-outline w-[100px]'}
                    breakLinkClassName={'btn btn-sm btn-outline'}
                    activeLinkClassName={
                        'bg-primary text-primary-content border-primary font-bold hover:opacity-70 hover:bg-primary hover:text-primary-content hover:border-primary'
                    }
                    disabledLinkClassName='btn btn-disabled'
                />
            )}
        </>
    );
};

export default Pagination;
