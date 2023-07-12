import Navbar from '@/components/common/Navbar';
import { AuthContext } from '@/contexts/authContext';
import { verify } from '@/dataFetcher/user';
import useToken from '@/hooks/useToken';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

function MainLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    console.log('🚀 ~ file: mainLayout.jsx:14 ~ MainLayout ~ isAuthenticated:', isAuthenticated);

    const menuItems = [
        {
            id: 1,
            href: '/',
            title: 'Homepage',
        },
        {
            id: 2,
            href: '/customers',
            title: 'Customers',
        },
        {
            id: 3,
            href: '/products',
            title: 'Products',
        },
        {
            id: 4,
            href: '/orders',
            title: 'Orders',
        },
    ];

    return (
        <div className='drawer-mobile drawer'>
            <input id='sidebar' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col items-start justify-start'>
                {/* <!-- Page content here --> */}
                <Navbar />
                {isAuthenticated ? (
                    <div className='w-full p-5'>{children}</div>
                ) : (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <p>
                            Please{' '}
                            <Link className='underline text-secondary' href={'/login'}>
                                Sign in
                            </Link>{' '}
                            first
                        </p>
                    </div>
                )}
            </div>
            <div className='drawer-side shadow-lg'>
                <label htmlFor='sidebar' className='drawer-overlay' />
                <ul className='menu w-80 space-y-2 bg-base-100 p-4 text-base-content'>
                    {/* <!-- Sidebar content here --> */}
                    {menuItems.map((item) => (
                        <li
                            key={item?.id}
                            className={`${
                                router.pathname === item.href && 'bg-primary text-white'
                            } drawer-button rounded`}
                        >
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MainLayout;
