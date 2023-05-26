import { getCustomer, updateCustomer } from '@/dataFetcher/customer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
// import React from 'react';

const EditCustomer = () => {
    const { query, push } = useRouter();
    const [id, setId] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        setId(query?.id);
    }, [query?.id]);

    const { data: customer, isLoading } = useQuery({
        queryKey: ['customers', id],
        queryFn: () => getCustomer(id),
    });

    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const customer = await updateCustomer(values, id);
            customer._id && toast.success(`Successfully added ${customer.name}`);
            customer._id && push('/customers');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers', id] });
        },
    });

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['customers', id] });
        form.resetFields();
        form.setFieldsValue({ ...customer });
    }, [customer?._id]);

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between'>
                <h1>Edit Customer</h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex-col lg:flex-row-reverse'>
                    <div className='shadow-2xl bg-base-100'>
                        <div className='card-body'>
                            <Form form={form} onFinish={(values) => mutation.mutate(values)}>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Name</span>
                                    </label>
                                    <Form.Item
                                        name='name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input customer name!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className='input input-bordered'
                                            placeholder='Customer name'
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Email</span>
                                    </label>
                                    <Form.Item
                                        name='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input customer email!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            type='email'
                                            placeholder='Customer Email'
                                            className='input input-bordered'
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Phone</span>
                                    </label>
                                    <Form.Item
                                        name='phone'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input customer phone number!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Customer phone'
                                            className='input input-bordered'
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Address</span>
                                    </label>
                                    <Form.Item
                                        name='address'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input customer address!',
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            rows={3}
                                            placeholder='Customer address'
                                            className='input input-bordered'
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form-control mt-6'>
                                    <button className='btn btn-primary'>Submit</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCustomer;
