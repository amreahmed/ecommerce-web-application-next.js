import { List } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const ProductItem = ({ product }) => {
    return (
      <div className='hover:border p-1 hover:shadow-md rounded-lg border-primary hover:cursor-pointer'>
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner"
          width={400}
          height={350}
          className="rounded-t-lg h-[170px] object-cover"
        />
        <div className='flex justify-between p-3 items-center bg-gray-800 rounded-b-lg'>
          <div className="p-3">
            <h2 className="text-sm font-mediumflex gap-2flex gap-2">{product?.attributes?.title}</h2>

            <h2 className="text-xs text-gray-400 flex gap-1 items-center">
              <List className=" w-4 h-4 " />
              {product?.attributes?.category}
            </h2>
                </div>
                <h2>
                    {product?.attributes?.price}$
                </h2>
        </div>
      </div>
    );
};

export default ProductItem