import { List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProductItem = ({ product }) => {
    return (
      <Link href={`/product/${product?.id}`} className='hover:border p-1 hover:shadow-md rounded-lg border-primary hover:cursor-pointer'>
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner"
          width={400}
          height={350}
          className="rounded-t-lg h-[170px] object-cover"
        />
        <div className='flex justify-between p-3 items-center  rounded-b-lg border border-green-700'>
          <div className="p-3">
            <h2 className="text-sm text-black font-mediumflex gap-2flex gap-2">{product?.attributes?.title}</h2>

            <h2 className="text-xs text-black flex gap-1 items-center">
              <List className=" w-4 h-4 " />
              {product?.attributes?.category}
            </h2>
                </div>
                <h2 className='text-black'>
                    {product?.attributes?.price}$
                </h2>
        </div>
      </Link>
    );
};

export default ProductItem