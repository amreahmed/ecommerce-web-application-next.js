"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import Link from "next/link";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in") || window.location.href.toString().includes("sign-up"));
    
  }, []);

  const { user } = useUser();
  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then((res) => {
      console.log("cart items", res.data.data);
      res?.data?.data.forEach((product) => {
        setCart((oldCart) => [
          ...oldCart,
          {
            id: product?.id,
            product: product?.attributes?.products?.data[0],
          },
        ]);
      });
    });
  };

  return (
    !isLoggedIn && (
      <header className="bg-white shadow-md shadow-black">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="text-gray-500 transition hover:text-gray-300/75" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      Explore
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {!user ? (
                  <div className="sm:flex sm:gap-4">
                    <Link
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-green-500"
                      href="/sign-in">
                      Login
                    </Link>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:text-teal-600/75"
                        href="/sign-up">
                        Register
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <h2 className="flex gap-1 cursor-pointer text-black" onClick={() => setOpenCart(!openCart)}>
                      <ShoppingCart className="text-black" />({cart?.length})
                    </h2>
                    <UserButton afterSignOutUrl="/" />
                    {openCart && <Cart />}
                  </div>
                )}

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
