import React from 'react';

const OrderInfoModal = ({ data = [] }) => {
    return (
        <>
            {/* Put this part before </body> tag */}
            <input type='checkbox' id='info-modal' className='modal-toggle' />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Detail Information</h3>
                    <div className='py-4'>
                        <table className='table w-full'>
                            <thead>
                                <tr>
                                    <td>Product</td>
                                    <td>Quantity</td>
                                    <td>Variation</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data?.map((d) => (
                                        <tr key={d._id}>
                                            <td>{d?.product?.name}</td>
                                            <td>{d?.quantity}</td>
                                            <td>
                                                {d?.product?.hasVariation ? (
                                                    <span>
                                                        {
                                                            d.product.variations.filter(
                                                                (f) => f._id === d?.variation
                                                            )[0].unit
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className='text-red-500'>N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='modal-action'>
                        <label htmlFor='info-modal' className='btn'>
                            Okay
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderInfoModal;
