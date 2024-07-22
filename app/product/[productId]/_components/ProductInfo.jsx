'use client';
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react';
import React, { useContext } from 'react'
import SkeletonProductInfo from './SkeletonProductInfo';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../../_utils/CartApis';
import { CartContext } from '../../../_context/CartContext';

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      /*logic to add to cart*/
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      CartApis.addToCart(data)
        .then((res) => {
          console.log("cart created successfully", res.data.data);
          setCart((oldCart) => [
            ...oldCart,
            {
              id: res?.data?.data?.id,
              product,
            },
          ]);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
    return (
        <>
         {product?.id ? (
          <div>
      <h2 className="text-xl text-black">{product?.attributes?.title}</h2>
      <h2 className="text-md text-black">{product?.attributes?.category}</h2>
      <h2 className="text-sm mt-5 text-black">{product?.attributes?.description[0]?.children[0]?.text}</h2>
      <h2 className="text-xs text-gray-500 mt-3 flex gap-2 items-center">
        {product?.attributes?.instantDelivery ? <BadgeCheck className="text-green-500 w-5 h-5" /> : <AlertOctagon />} Eligible For Instant
        Delevery
      </h2>
      <h2 className="text-3xl text-primary mt-3 pb-3">$ {product?.attributes?.price}</h2>

      <button onClick={() => handleAddToCart()} className="flex gap-2 bg-primary hover:bg-green-500 p-3 rounded-lg ">
        <ShoppingCart />
        Add To Cart
      </button>
      </div>
         ) : <SkeletonProductInfo />}   
        </>
           
  );
}

export default ProductInfo