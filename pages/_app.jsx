import MainLayout from '../layout/mainLayout';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/authContext';

export default function App({ Component, pageProps }) {
    const { pathname } = useRouter();
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {' '}
                {pathname === '/login' ? (
                    <Component {...pageProps} />
                ) : (
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                )}
                <Toaster position='top-center' reverseOrder={false} />
            </AuthProvider>
        </QueryClientProvider>
    );
}
