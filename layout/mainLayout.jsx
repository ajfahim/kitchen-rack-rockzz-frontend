import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';

function MainLayout({children}) {
  const router = useRouter();
  const menuItems = [
    {
      id: 1,
      href: '/',
      title: 'Homepage',
    },
    {
      id: 2,
      href: '/about',
      title: 'About',
    },
    {
      id: 3,
      href: '/contact',
      title: 'Contact',
    },
  ];

  return (
    <div className="drawer-mobile drawer">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start p-5">
        {/* <!-- Page content here --> */}
        <label
          htmlFor="sidebar"
          className="btn-primary drawer-button btn lg:hidden"
        >
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
        <div className="w-full">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay" />
        <ul className="menu w-80 space-y-2 bg-base-100 p-4 text-base-content">
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