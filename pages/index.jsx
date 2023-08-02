import OrderedProductsToday from '@/components/dashboard/orderedProductsToday';
import SalesChart from '@/components/dashboard/salesChart';
import { getOrderedProductsByDate } from '@/dataFetcher/orders';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function Home() {
    const { data: orderedProductsToday, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrderedProductsByDate(),
    });

    return (
        <>
            <Head>
                <title>Kitchen Rack</title>
            </Head>
            <main className='mt-10'>
                <div className='space-y-10'>
                    <OrderedProductsToday orderedProductsToday={orderedProductsToday} />
                    <SalesChart />
                </div>
            </main>
        </>
    );
}
