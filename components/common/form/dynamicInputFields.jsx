import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Button, Form, Input, InputNumber, Space } from 'antd';
const onFinish = (values) => {
    console.log('Received values of form:', values);
};
const DynamicInputFields = ({ name, unit, price }) => (
    <>
        <Form.List rules={[{ required: true, message: 'Variations are required' }]} name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div
                            key={key}
                            className='flex gap-2 justify-center items-center h-full mb-2'
                        >
                            {/* Render the error message for variations */}
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                    prevValues[name] !== currentValues[name]
                                }
                                dependencies={[name]}
                                rules={[
                                    {
                                        validator: (_, values) => {
                                            if (!values || values.length < 1) {
                                                return Promise.reject('Variations are required');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                                help={
                                    restField.errors?.[name] &&
                                    restField.errors[name].errors?.[0].message
                                }
                            >
                                <></>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, unit]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing first name',
                                    },
                                ]}
                            >
                                <Input placeholder='Unit' />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, price]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing last name',
                                    },
                                ]}
                            >
                                <InputNumber min={1} addonAfter='৳' placeholder='Price' />
                            </Form.Item>
                            <AiOutlineMinusCircle
                                className='self-start mt-2 text-xl cursor-pointer hover:text-error'
                                onClick={() => remove(name)}
                            />
                        </div>
                    ))}
                    <Form.Item>
                        <button
                            className='border-2 hover:text-success hover:border-success border-dashed w-full py-2 flex gap-2 items-center justify-center font-semibold'
                            onClick={() => add()}
                        >
                            <AiOutlinePlusCircle size={18} />
                            Add Variations
                        </button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    </>
);
export default DynamicInputFields;
