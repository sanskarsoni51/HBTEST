"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAddProductMutation } from "@/redux/api/adminApi";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/api/prductsApi";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const productFormSchema = z.object({
  name: z.string().min(1, "Full name is required").max(100),
  description: z.string().min(5).optional(),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().positive("Quantity must be a positive integer"),
  category: z.string(),
});

export type NewProductInput = TypeOf<typeof productFormSchema>;

// Main Function
export function AddProduct() {
  const [cat, setCat] = useState<Array<{ name: string }> | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [color, setColor] = useState<string[]>([]);
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  });

  const getCategory = useGetCategoriesQuery(null);
  useEffect(() => {
    const temCat: Array<{ name: string }> = [];

    if (getCategory.isSuccess) {
      if (getCategory.data?.categories) {
        getCategory.data.categories.forEach((c: any) => {
          temCat.push({ name: `${c.name}` });
        });
        setCat(temCat);
      }
    }
  }, [getCategory.data]);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  const handlecolor = (id: string) => {
    const checkBox = document.getElementById(id);
    if (checkBox?.checked == true) {
      setColor([...color, id]);
    } else {
      setColor(color.filter((cId) => cId != id));
    }
  };

  // 👇 Calling the Register Mutation
  const [addNewProduct, { isSuccess, isLoading, isError, data, error }] =
    useAddProductMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setImages(files);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Registration Successful!",
        variant: "default",
        duration: 2000,
      });
    }

    if (isError) {
      if (error) {
        toast({
          title: "Registration Failed",
          description: `${error}`,
          variant: "destructive",
          duration: 2000,
        });
      } else {
        toast({
          title: "Network Error. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<NewProductInput> = (values) => {
    addNewProduct({
      images: images,
      productInfo: {
        productName: values.name,
        category: [values.category],
        price: values.price,
        qtyavailable: values.quantity,
        images: [],
        colors: color,
        description: values.description,
        pid: 0,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-brown text-xl font-semibold"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Name:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name of Product" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Description:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about product."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Category:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {cat?.map((c, i) => {
                        return (
                          <SelectItem key={i} value={c.name}>
                            {c.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Price:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Price" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel className="flex flex-row font-semibold">
                Price:
                <FormMessage className="ml-3 font-medium" />
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Quantity" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="text-sm gap-2">
          <div>Colors:</div>
          <input
            type="checkbox"
            id="black"
            name="black"
            value="#121212"
            onClick={() => {
              handlecolor("black");
            }}
          />
          <label htmlFor="black"> Black</label>
          <input
            type="checkbox"
            id="red"
            name="red"
            value="#ff0000"
            onClick={() => {
              handlecolor("red");
            }}
          />
          <label htmlFor="red"> Red</label>
          <input
            type="checkbox"
            id="blue"
            name="blue"
            value="#000dff"
            onClick={() => {
              handlecolor("blue");
            }}
          />
          <label htmlFor="blue"> Blue</label>
          <input
            type="checkbox"
            id="green"
            name="green"
            value="#faf600"
            onClick={() => {
              handlecolor("green");
            }}
          />
          <label htmlFor="green"> Green</label>
        </div>
        <div className="text-sm">Images:</div>
        <input
          className="w-full text-sm"
          type="file"
          accept="image/*"
          name="images[]"
          multiple
          onChange={handleImageChange}
        />
        <Button className="w-full mb-3 mt-2" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
