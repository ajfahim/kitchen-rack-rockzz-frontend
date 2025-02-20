import { createOrderDraft } from '@/dataFetcher/orderDrafts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const CerateOrder = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const order = await createOrderDraft(values);
            order._id && toast.success(`Successfully created the order draft`);
            order._id && router.push('/order-drafts');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
        },
    });

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between'>
                <h1>Create New Order</h1>
            </div>

            <div className='lg:w-1/2 mx-auto shadow-lg card-body'>
                <Form
                    form={form}
                    onFinish={(values) => {
                        console.log('🚀 ~ file: add.jsx:44 ~ CerateOrder ~ values:', values);
                        mutation.mutate(values);
                    }}
                    onFinishFailed={(e) => console.log(e)}
                >
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Order Processing Date</span>
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
        </>
    );
};

export default CerateOrder;
