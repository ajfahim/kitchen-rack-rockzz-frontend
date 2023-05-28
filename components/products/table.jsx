import { delCustomer } from '@/dataFetcher/customer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import ConfirmationModal from '../common/confirmationModal';
import Pagination from '../common/pagination';
import Link from 'next/link';
import { delProduct } from '@/dataFetcher/product';
import InfoModal from '../common/infoModal';

const Table = ({ columns, data, onPageChange, onLimitChange, currentPage, limit }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [infoModal, setInfoModal] = useState([]);
    const [item, setItem] = useState({});
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (_id) => {
            const res = await delProduct(_id);
            res.id && toast.success(`Successfully deleted ${res?.name}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setConfirmation(false);
        },
    });

    useEffect(() => {
        if (confirmation === true) {
            mutation.mutate(item._id);
        }
    }, [confirmation]);

    return (
        <>
            <div className='overflow-x-auto'>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns?.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map((d, index) => (
                            <tr key={d._id}>
                                <td>{index + 1}</td>
                                <td>{d.name}</td>
                                <td>
                                    {d.hasVariation === true ? (
                                        <label
                                            htmlFor='info-modal'
                                            className='text-success underline cursor-pointer'
                                            onClick={() => setInfoModal(d.variations)}
                                        >
                                            Yes
                                        </label>
                                    ) : (
                                        <span className='text-error'>No</span>
                                    )}
                                </td>
                                <td>{d.unitPrice ? `৳${d.unitPrice}` : 'N/A'}</td>

                                <td className='space-x-1'>
                                    <span>
                                        <Link href={`/products/${d._id}`}>
                                            <label className='btn btn-sm btn-info btn-square'>
                                                <BsPencilSquare size={16} />
                                            </label>
                                        </Link>
                                    </span>
                                    <span>
                                        <label
                                            htmlFor='confirmation-modal'
                                            className='btn btn-sm btn-error btn-square'
                                            onClick={() => setItem(d)}
                                        >
                                            <BsTrash size={16} />
                                        </label>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <Pagination
                    totalPages={data?.totalPages}
                    totalCount={data?.totalCount}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                    limit={limit}
                />
            </div>
            <ConfirmationModal name={item?.name} state={setConfirmation} />
            <InfoModal data={infoModal} />
        </>
    );
};

export default Table;
