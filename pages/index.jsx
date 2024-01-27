import OrderListPerDay from '@/components/dashboard/orderListPerDay';
import OrderedProductsToday from '@/components/dashboard/orderedProductsToday';
import SalesChart from '@/components/dashboard/salesChart';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Kitchen Rack</title>
            </Head>
            <main className='mt-10'>
                <div className='space-y-10'>
                    <div className='flex items-center justify-center space-x-10'>
                        <OrderedProductsToday />
                        <OrderListPerDay />
                    </div>

                    <SalesChart />
                </div>
            </main>
        </>
    );
}
