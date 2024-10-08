import { delOrder } from '@/dataFetcher/orders';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import ConfirmationModal from '../common/confirmationModal';
import OrderInfoModal from '../common/orderInfoModal';
import Pagination from '../common/pagination';

const Table = ({ columns, data, onPageChange, onLimitChange, currentPage, limit }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [infoModal, setInfoModal] = useState([]);
    const [item, setItem] = useState({});
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (_id) => {
            const res = await delOrder(_id);
            res.id && toast.success(`Successfully deleted order with id:${res?.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
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
                        {data?.orders?.map((d, index) => (
                            <tr key={d._id}>
                                <td>{index + 1}</td>
                                <td>{d?._id}</td>
                                <td>{d?.customer?.name}</td>
                                <td>
                                    {/* <label
                                        htmlFor='info-modal'
                                        className='text-info underline cursor-pointer'
                                        onClick={() => setInfoModal(d?.products)}
                                    >
                                        View Products
                                    </label> */}
                                    {d.products.map((d) => {
                                        return (
                                            <tr key={d.product?._id}>
                                                <td>{d?.product?.name}</td>
                                                <td>{d?.quantity}</td>
                                                <td>
                                                    {d?.product?.hasVariation ? (
                                                        <span>
                                                            {
                                                                d?.product.variations.filter(
                                                                    (f) => f._id === d?.variation
                                                                )[0].unit
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className='text-red-500'>N/A</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </td>
                                <td>৳{d?.totalPrice}</td>
                                <td>{moment(d?.processingDate).format('DD MMM YYYY')}</td>
                                <td>{moment(d?.deliveryDate).format('DD MMM YYYY')}</td>

                                <td className='space-x-1'>
                                    {/* edit order has issues  */}
                                    {/* <span>
                                        <Link href={`/orders/${d._id}`}>
                                            <label className='btn btn-sm btn-info btn-square'>
                                                <BsPencilSquare size={16} />
                                            </label>
                                        </Link>
                                    </span> */}
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
            <OrderInfoModal data={infoModal} />
        </>
    );
};

export default Table;
