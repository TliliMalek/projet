import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import { getallproducts } from "../../JS/actions/productactions";



const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallproducts());
  }, []);
  const products = useSelector((state) => state.prod.products);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {products.map((el) => (
        <ProductCard key={el._id} prd={el} />
      ))}
    </div>
  );
};

export default ProductList;
