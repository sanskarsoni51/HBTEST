import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface QuantityControlProps {
  productId: string; // Adjust based on your actual ID type
  initialQuantity: number;
  changeqty: (data: { itemId: string; quantity: number }) => void; // Function type for changing quantity
  removeqty: (id: string) => void; // Function type for removing from cart
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  productId,
  initialQuantity,
  changeqty,
  removeqty,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    changeqty({ itemId: productId, quantity: newQuantity });
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      changeqty({ itemId: productId, quantity: newQuantity });
    } else {
      removeqty(productId);
      toast({
        title: "Product removed from cart",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center">
      <Button onClick={decrement}>-</Button>
      <span className="mx-2">{quantity}</span>
      <Button onClick={increment}>+</Button>
    </div>
  );
};

export default QuantityControl;
