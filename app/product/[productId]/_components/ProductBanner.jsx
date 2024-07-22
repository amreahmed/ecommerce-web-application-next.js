import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  const imageUrl = product?.attributes?.banner?.data?.attributes?.url;

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="product details"
          width={600}
          height={400}
          className="rounded-lg"
          priority={true} // Added priority property
        />
      ) : (
        <div className="w-[600px] h-[400px] bg-slate-600 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
};

export default ProductBanner;
