import { postCustomer } from '@/dataFetcher/customer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';

const AddCustomer = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const customer = await postCustomer(values);
            customer._id && toast.success(`Successfully added ${customer.name}`);
            customer._id && router.push('/customers');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between'>
                <h1>Add Customer</h1>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex-col lg:flex-row-reverse'>
                    <div className='shadow-2xl bg-base-100'>
                        <div className='card-body'>
                            <Form onFinish={(values) => mutation.mutate(values)}>
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

export default AddCustomer;
