"use client";
import React, { useEffect, useState } from "react";
import ProductList from './ProductList'
import ProductApis from '../_utils/ProductApis'

const ProductSection = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => { 
        getLatestProducts_();
    }, [])
    const getLatestProducts_ = () => {
        // call the API to get the latest products
        ProductApis.getLatestProducts().then((response) => {
            console.log(response.data.data);
            setProductList(response.data.data);
        });
    }
    return (
      <>
        <div className="px-10 md:px-20 bg-white">
          <h2 className="my-4 text-xl ">Our Latest Products</h2>
          <ProductList productList={productList} />
        </div>
      </>
    );
}

export default ProductSection