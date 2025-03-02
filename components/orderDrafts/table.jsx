import { delOrderDraft } from '@/dataFetcher/orderDrafts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Table as AntTable, Tooltip, Typography } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import ConfirmationModal from '../common/confirmationModal';

const { Paragraph } = Typography;

const Table = ({ data, onPageChange, onLimitChange, limit }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [item, setItem] = useState({});
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (_id) => {
            const res = await delOrderDraft(_id);
            res.id && toast.success(`Successfully deleted order draft with id:${res?.id}`);
            setConfirmation(false);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
        },
    });
    useEffect(() => {
        if (confirmation === true) {
            mutation.mutate(item._id);
        }
    }, [confirmation]);

    const antColumns = [
        {
            title: '#',
            key: 'index',
            width: 50,
            render: (_, __, index) => index + 1,
            fixed: 'left',
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            ellipsis: {
                showTitle: false,
            },
            render: (id) => (
                <Tooltip placement='topLeft' title={id}>
                    {id}
                </Tooltip>
            ),
        },
        {
            title: 'Customer Details',
            dataIndex: 'customerDetails',
            key: 'customerDetails',
            width: 200,
            render: (text) => (
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: 'more',
                    }}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {text}
                </Paragraph>
            ),
        },
        {
            title: 'Order Details',
            dataIndex: 'orderDetails',
            key: 'orderDetails',
            width: 200,
            render: (text) => (
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: 'more',
                    }}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {text}
                </Paragraph>
            ),
        },
        {
            title: 'Processing Date',
            dataIndex: 'processingDate',
            key: 'processingDate',
            width: 120,
            render: (date) => moment.utc(date).format('DD MMM YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <div className='flex items-center justify-center space-x-1'>
                    <Link href={`/order-drafts/${record._id}`}>
                        <button className='btn btn-sm btn-info btn-square'>
                            <BsPencilSquare size={16} />
                        </button>
                    </Link>
                    <button className='btn btn-sm btn-error btn-square'>
                        <label
                            htmlFor='confirmation-modal'
                            className='btn btn-sm btn-error btn-square'
                            onClick={() => setItem(record)}
                        >
                            <BsTrash size={16} />
                        </label>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className='overflow-x-auto'>
                <AntTable
                    columns={antColumns}
                    dataSource={data?.docs}
                    rowKey='_id'
                    pagination={{
                        total: data?.totalDocs,
                        current: data?.page,
                        pageSize: data?.limit,
                        onChange: (page, pageSize) => {
                            onPageChange(page);
                            if (pageSize !== limit) {
                                onLimitChange(pageSize);
                            }
                        },
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                    scroll={{ x: 'max-content' }}
                    size='middle'
                />
            </div>
            <ConfirmationModal name={item?.name || 'This order draft'} state={setConfirmation} />
        </>
    );
};

export default Table;
