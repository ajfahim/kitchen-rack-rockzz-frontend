import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useRef } from 'react';
import { BsDownload } from 'react-icons/bs';

const OrderedProductsToday = ({ orderedProductsToday }) => {
    const tableRef = useRef(null);

    const handlePrint = () => {
        const input = tableRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${moment(new Date()).format('DD MMMM YYYY')}_Ordered_Products.pdf`);
        });
    };

    return (
        <div className='shadow-xl rounded-xl w-96 p-3'>
            <div className='flex justify-around items-center gap-3'>
                <h1 className='text-secondary-focus mb-2 font-bold'>{`Ordered Products Today (${moment(
                    new Date()
                ).format('DD MMMM YYYY')})`}</h1>
                <button
                    disabled={orderedProductsToday?.length <= 0}
                    className='btn btn-square btn-outline btn-sm'
                    onClick={handlePrint}
                >
                    <BsDownload />
                </button>
            </div>
            <div className='flex justify-center items-center mt-3 max-h-[400px]  overflow-y-auto'>
                {orderedProductsToday?.length <= 0 ? (
                    <p className='w-full flex justify-center items-center'>
                        Looks like <span className='text-primary mx-1'>Rafa vaiya</span> forgot to
                        create orders 👊
                    </p>
                ) : (
                    <table ref={tableRef} className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Variations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedProductsToday?.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <ul className='list-disc list-inside'>
                                            {Object.entries(product.variations).map(
                                                ([variation, quantity]) => (
                                                    <li key={variation}>
                                                        {variation}: {quantity}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderedProductsToday;
