import ProductsFields from '@/components/common/form/ProductsInputFields';
import { getCustomerByName } from '@/dataFetcher/customer';
import { createOrder, getOrder, updateOrder } from '@/dataFetcher/orders';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

const EditOrder = () => {
    const [customerOptions, setCustomerOptions] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState();
    console.log('🚀 ~ file: add.jsx:13 ~ CerateOrder ~ selectedVariation:', selectedVariation);
    const router = useRouter();
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    useEffect(() => {
        setId(router.query?.id);
    }, [router.query?.id]);

    const { data: order, isLoading } = useQuery({
        queryKey: ['orders', id],
        queryFn: () => getOrder(id),
    });
    // console.log('🚀 ~ file: [id].jsx:27 ~ EditOrder ~ order:', order);
    const processingDate = dayjs(order?.processingDate);
    // console.log('🚀 ~ file: [id].jsx:29 ~ EditOrder ~ processingDate:', processingDate);
    const deliveryDate = dayjs(order?.deliveryDate);
    // console.log('🚀 ~ file: [id].jsx:31 ~ EditOrder ~ deliveryDate:', deliveryDate);

    const mutation = useMutation({
        mutationFn: async (values) => {
            const order = await updateOrder(values, id);
            order._id && toast.success(`Successfully updated the order`);
            order._id && router.push('/orders');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });

    const handleSearch = async (value) => {
        if (value) {
            const x = await getCustomerByName(value);
            setCustomerOptions(x);
        }
    };
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['orders', id] });
    }, [id]);

    useEffect(() => {
        console.log('🚀 ~ file: [id].jsx:64 ~ useEffect ~ order:', order);
        form.resetFields();
        order &&
            form.setFieldsValue({
                ...order,
                processingDate,
                deliveryDate,
            });
    }, [order]);

    if (isLoading) return 'loading...';

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

                        <ProductsFields
                            setSelectedVariation={setSelectedVariation}
                            name='products'
                            product='product'
                            qty='quantity'
                            form={form}
                        />
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

export default EditOrder;
