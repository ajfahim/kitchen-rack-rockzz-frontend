import { AuthContext } from "@/contexts/authContext";
import useToken from "@/hooks/useToken";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  return (
    <div className="navbar bg-primary-content text-primary py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <label htmlFor="sidebar" className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
            <li>
              <Link href="/">Item 1</Link>
            </li>
            <li>
              <Link href="/" className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </Link>
              <ul className="p-2">
                <li>
                  <Link href="/">Submenu 1</Link>
                </li>
                <li>
                  <Link href="/">Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/">Item 3</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Kitchen Rack
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">

      </div>
      <div className="navbar-end flex space-x-3 justify-end items-center">
        {isAuthenticated
          ?
          <div className="flex space-x-3">
            <div className="avatar tooltip tooltip-bottom" data-tip={"Hello" + "name"}>
              <div className="w-12 rounded-full">
                {/* <img alt={image} width={12} height={12} src={session?.user?.image} /> */}
              </div>
            </div>
            <div>
              <button onClick={() => {
                localStorage.removeItem("authToken");
                setIsAuthenticated(false)
              }} className="btn btn-warning">Sign Out</button>
            </div>
          </div>
          :
          <div>
            <Link href="/login" className="btn btn-primary">Sign In</Link>
          </div>
        }



      </div>
    </div >
  );
}

export default Navbar;
