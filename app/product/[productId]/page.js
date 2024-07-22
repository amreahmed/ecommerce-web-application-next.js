"use client";
import BreadCrumb from "../../_components/BreadCrumb";
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

const Page = ({ params }) => {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (params?.productId) {
      getProductById(params.productId);
    }
  }, [params?.productId]);

  const getProductById = async (productId) => {
    try {
      const res = await ProductApis.getProductById(productId);
      const product = res.data.data;
      console.log(product);
      setProductDetails(product);
      getProductListByCategory(product.attributes.category, productId);
    } catch (error) {
      console.error("Failed to fetch product by ID:", error);
    }
  };

  const getProductListByCategory = async (category, currentProductId) => {
    try {
      const res = await ProductApis.getProductByCategory(category, currentProductId);
      const relatedProducts = res.data.data;
      console.log(relatedProducts);
      setProductList(relatedProducts);
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
    }
  };

  return (
    <div className="px-10 md:px-28 py-8 bg-white">
      <BreadCrumb path={path}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-around mt-10 gap-5 sm:gap-0">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="text-xl mt-24 mb-4">Related Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default Page;
