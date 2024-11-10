import AdminProductCard from "@/components/cards/AdminProductCard";
import { ProductSchema } from "@/schema/schema";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewProduct from "./AddNewProduct";
import { AddProduct } from "./test";

const AdminProducts = () => {
  const [data, setData] = useState<ProductSchema[]>([]);
  useEffect(() => {
    const product: ProductSchema[] = [
      {
        pid: 2,
        qtyavailable: 5,
        price: 30,
        images: ["/bs.jpg", "/bs.jpg"],
        productName: "Jeans",
        description: "Stylish denim jeans",
        colors: ["black", "blue"],
        category: ["necklace"],
      },
    ];

    setData(product);
  }, []);
  return (
    <div className="h-screen overflow-auto no-scrollbar">
      <div className="w-[1200px]  grid grid-cols-4 gap-6 ">
        <AdminProductCard product={data[0]} />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-5 right-16 text-center p-3 rounded-full text-pale bg-lbrown text-2xl"
            variant="outline"
          >
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add a new Product and its details to the store
            </DialogDescription>
          </DialogHeader>
          {/* <AddNewProduct /> */}
          <AddProduct/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
