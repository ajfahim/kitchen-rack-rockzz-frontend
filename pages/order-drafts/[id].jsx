import { getOrderDraft, updateOrderDraft } from '@/dataFetcher/orderDrafts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

dayjs.extend(weekday);
dayjs.extend(localeData);

const EditOrderDraft = () => {
    const { query, push } = useRouter();
    const [id, setId] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        setId(query?.id);
    }, [query?.id]);

    const { data: orderDraft, isLoading } = useQuery({
        queryKey: ['order-drafts', id],
        queryFn: () => getOrderDraft(id),
    });
    const processingDate = dayjs(orderDraft?.processingDate);

    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const orderDraft = await updateOrderDraft(values, id);
            orderDraft._id && toast.success(`Successfully updated the order draft`);
            orderDraft._id && push('/order-drafts');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-drafts', id] });
        },
    });

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['order-drafts', id] });
        form.resetFields();
        form.setFieldsValue({ ...orderDraft, processingDate: processingDate });
    }, [orderDraft?._id]);

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between'>
                <h1>Edit Order Draft</h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex-col lg:flex-row-reverse'>
                    <div className='shadow-2xl bg-base-100'>
                        <div className='card-body'>
                            <Form
                                form={form}
                                onFinish={(values) => {
                                    console.log(
                                        '🚀 ~ file: add.jsx:44 ~ CerateOrder ~ values:',
                                        values
                                    );
                                    mutation.mutate(values);
                                }}
                                onFinishFailed={(e) => console.log(e)}
                            >
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className='form-control'>
                                        <label className='label'>
                                            <span className='label-text'>
                                                Order Processing Date
                                            </span>
                                        </label>

                                        <Form.Item
                                            name='processingDate'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'processingDate is required',
                                                },
                                            ]}
                                        >
                                            <DatePicker className='w-full' />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Customer details</span>
                                    </label>

                                    <Form.Item
                                        // initialValue={customerDeliveryAddress}
                                        name='customerDetails'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'customerDetails is required',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} className='w-full' />
                                    </Form.Item>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Order details</span>
                                    </label>

                                    <Form.Item
                                        // initialValue={customerDeliveryAddress}
                                        name='orderDetails'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'orderDetails is required',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} className='w-full' />
                                    </Form.Item>
                                </div>

                                <div className='form-control mt-6 w-full'>
                                    <Form.Item>
                                        <button type='submit' className='btn btn-primary w-full'>
                                            Submit
                                        </button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOrderDraft;
