import { delCustomer } from '@/dataFetcher/customer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import ConfirmationModal from '../common/confirmationModal';
import Pagination from '../common/pagination';

const Table = ({ columns, data, onPageChange, onLimitChange, currentPage, limit }) => {
    console.log('🚀 ~ file: table.jsx:10 ~ Table ~ data:', data);
    const [confirmation, setConfirmation] = useState(false);
    const [item, setItem] = useState({});
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (_id) => {
            const res = await delCustomer(_id);
            res.id && toast.success(`Successfully deleted ${res?.name}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
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
                        {data?.customers?.map((d, index) => (
                            <tr key={d._id}>
                                <th>{index + 1}</th>
                                <td>{d.name}</td>
                                <td>{d.phone}</td>
                                <td>{d.email}</td>
                                <td>{d.address}</td>
                                <td className='flex items-center justify-center space-x-1'>
                                    <span>
                                        <label
                                            // htmlFor='confirmation-modal'
                                            className='btn btn-sm btn-info btn-square'
                                            onClick={() => setItem(d)}
                                        >
                                            <BsPencilSquare size={16} />
                                        </label>
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
        </>
    );
};

export default Table;
