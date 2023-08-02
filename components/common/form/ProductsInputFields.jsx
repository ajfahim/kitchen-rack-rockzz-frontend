import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { getProductByName } from '@/dataFetcher/product';

const ProductsFields = ({ name, product, qty, setSelectedVariation }) => {
    const [productOptions, setProductOptions] = useState([]);
    const [productVariations, setProductVariations] = useState([]);

    const handleSearch = async (value) => {
        if (value) {
            const x = await getProductByName(value);
            setProductOptions(x);
        }
    };

    const onProductSelect = (index, value, option) => {
        if (option.hasVariation) {
            const newProductVariations = [...productVariations];

            newProductVariations[index] = option.variations;

            setProductVariations(newProductVariations);
        } else {
            const newProductVariations = [...productVariations];
            newProductVariations[index] = [];
            setProductVariations(newProductVariations);
        }
    };

    return (
        <>
            <Form.List name={name}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => {
                            const hasVariations =
                                productVariations[index] && productVariations[index].length > 0;
                            return (
                                <div
                                    key={key}
                                    className='flex gap-2 justify-center items-center h-full mb-2'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, product]}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Unit',
                                            },
                                        ]}
                                    >
                                        <Select
                                            allowClear
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder='search products...'
                                            optionFilterProp='children'
                                            onSelect={(value, option) =>
                                                onProductSelect(index, value, option)
                                            }
                                            onSearch={handleSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                            options={productOptions}
                                        />
                                    </Form.Item>

                                    <Form.Item {...restField} name={[name, 'variation']}>
                                        <Select
                                            disabled={!hasVariations}
                                            style={{ width: 100 }}
                                            allowClear
                                            onSelect={(values, data) => {
                                                setSelectedVariation(data);
                                            }}
                                            options={
                                                hasVariations
                                                    ? productVariations[index].map((pv) => ({
                                                          label: pv.unit,
                                                          value: pv._id,
                                                          price: pv.price,
                                                      }))
                                                    : []
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, qty]}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Quantity',
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: 100 }}
                                            min={1}
                                            placeholder='Quantity'
                                        />
                                    </Form.Item>

                                    <AiOutlineMinusCircle
                                        className='self-start mt-2 text-xl cursor-pointer hover:text-error'
                                        onClick={() => remove(name)}
                                    />
                                </div>
                            );
                        })}
                        <Form.Item>
                            <button
                                className='border-2 hover:text-success hover:border-success border-dashed w-full py-2 flex gap-2 items-center justify-center font-semibold'
                                onClick={() => add()}
                            >
                                <AiOutlinePlusCircle size={18} />
                                Add Products
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );
};

export default ProductsFields;
