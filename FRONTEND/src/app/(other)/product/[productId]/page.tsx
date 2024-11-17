"use client";
import React, { Suspense } from "react";
import Product from "./Product";
import { useGetProductByIdQuery } from "@/redux/api/prductsApi";

const ProductView = ({ params }: { params: { productId: number } }) => {
  const p = useGetProductByIdQuery(params.productId);
  if (p.isError) return <div>Error</div>;
  if (p.isSuccess) {
    return (
      <>
        <Suspense fallback={<div>Loading Product</div>}>
          <Product product={p.data.data} />
        </Suspense>
      </>
    );
  }
};

export default ProductView;
