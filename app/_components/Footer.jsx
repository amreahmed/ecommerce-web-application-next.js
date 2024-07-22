"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
     setIsLoggedIn(
       window.location.href.toString().includes("sign-in") || window.location.href.toString().includes("sign-up")
     );
  }, []);

  return (
    !isLoggedIn && (
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Image src="/logo.svg" alt="logo" width={35} height={35} />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
