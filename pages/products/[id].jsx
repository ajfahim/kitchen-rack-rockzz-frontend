import DynamicInputFields from '@/components/common/form/ProductsInputFields';
import VariationFields from '@/components/common/form/variationsInputFields ';
import { postCustomer } from '@/dataFetcher/customer';
import { updateProduct } from '@/dataFetcher/product';
import { getProduct } from '@/dataFetcher/product';
import { postProduct } from '@/dataFetcher/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Form, Input, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const EditProduct = () => {
    const [hasVariation, setHasVariation] = useState(false);
    const { query, push } = useRouter();
    const [id, setId] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        setId(query?.id);
    }, [query?.id]);

    const { data: product, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getProduct(id),
    });

    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: async (values) => {
            const product = await updateProduct(values, id);
            product._id && toast.success(`Successfully updated ${product.name}`);
            product._id && push('/products');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', id] });
        },
    });

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['products', id] });
        setHasVariation(product?.hasVariation);
        form.resetFields();

        form.setFieldsValue({ ...product });
    }, [product?._id]);

    return (
        <>
            {/* page title  */}
            <div className='font-black text-2xl text-primary flex items-center justify-between'>
                <h1>Add Product</h1>
            </div>

            <div className='lg:w-1/2 mx-auto shadow-lg card-body'>
                <Form
                    form={form}
                    onFinish={(values) => {
                        values.hasVariation = hasVariation;
                        mutation.mutate(values);
                    }}
                >
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Product Name</span>
                        </label>
                        <Form.Item
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Product name!',
                                },
                            ]}
                        >
                            <Input className='input input-bordered' placeholder='Product Name' />
                        </Form.Item>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Has variation ?</span>
                        </label>
                        <Form.Item name='hasVariation'>
                            <Checkbox
                                onChange={() => setHasVariation(!hasVariation)}
                                defaultChecked={hasVariation}
                            />
                        </Form.Item>
                    </div>
                    {hasVariation ? (
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Variations</span>
                            </label>

                            <VariationFields name='variations' unit='unit' price='price' />
                        </div>
                    ) : (
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Unit Price</span>
                            </label>
                            <Form.Item
                                rules={[{ required: true, message: 'Price is missing' }]}
                                name='unitPrice'
                            >
                                <InputNumber
                                    className='w-full py-2'
                                    min={1}
                                    addonAfter='৳'
                                    placeholder='Price'
                                />
                            </Form.Item>
                        </div>
                    )}

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

export default EditProduct;
