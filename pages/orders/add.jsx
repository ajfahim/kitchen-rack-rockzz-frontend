import ProductsFields from '@/components/common/form/ProductsInputFields';
import { getCustomerByName } from '@/dataFetcher/customer';
import { createOrder } from '@/dataFetcher/orders';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CerateOrder = () => {
    const [customerOptions, setCustomerOptions] = useState([]);
    const router = useRouter();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const order = await createOrder(values);
            order._id && toast.success(`Successfully created the order`);
            order._id && router.push('/orders');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
    });

    const handleSearch = async (value) => {
        if (value) {
            const x = await getCustomerByName(value);
            setCustomerOptions(x);
        }
    };

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
                        mutation.mutate(values);
                    }}
                    onFinishFailed={(e) => console.log(e)}
                >
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Customer</span>
                        </label>

                        <Form.Item
                            name='customer'
                            rules={[
                                {
                                    required: true,
                                    message: 'Customer is required',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder='search customers...'
                                optionFilterProp='children'
                                // onChange={onChange}
                                onSearch={handleSearch}
                                onSelect={(value, option) => {
                                    form.setFieldsValue({ deliveryAddress: option.address });
                                }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={customerOptions}
                            />
                        </Form.Item>
                    </div>

                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Products</span>
                        </label>

                        <ProductsFields name='products' product='product' qty='quantity' />
                    </div>

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
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Delivery Date</span>
                            </label>

                            <Form.Item
                                name='deliveryDate'
                                rules={[
                                    {
                                        required: true,
                                        message: 'deliveryDate is required',
                                    },
                                ]}
                            >
                                <DatePicker className='w-full' />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Delivery Address</span>
                        </label>

                        <Form.Item
                            // initialValue={customerDeliveryAddress}
                            name='deliveryAddress'
                            rules={[
                                {
                                    required: true,
                                    message: 'deliveryAddress is required',
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
