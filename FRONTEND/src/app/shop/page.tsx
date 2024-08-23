"use client";
import Card1 from "@/components/cards/Card1";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useGetProductsWithFilterMutation,
  useGetCategoriesQuery,
} from "@/redux/api/prductsApi";
import { ProductSchema } from "@/schema/schema";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/Loader/ShopLoader";

const Shop = () => {
  const [product, setProduct] = useState<Array<ProductSchema> | null>(null);
  const [searchQueary, setSearchQueary] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [maxpage, setMaxPage] = useState<number>(0);
  const [cat, setCat] = useState<Array<{ name: string }> | null>(null);

  const [getProducts, { isSuccess, isError, isLoading, data, error }] =
    useGetProductsWithFilterMutation();
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

  useEffect(() => {
    getProducts({
      sort: filter,
      category: category,
      pageNumber: page,
    });
  }, [page, category, filter]);

  function search() {
    getProducts({
      sort: filter,
      category: category,
      pageNumber: page,
      search: searchQueary,
    });
  }

  useEffect(() => {
    if (data) {
      const temproducts: ProductSchema[] = [];
      data.data.forEach((product: any) => {
        const newProduct: ProductSchema = {
          productName: product.productName,
          category: product.category,
          images: product.images,
          description: product.description,
          qtyavailable: product.qtyavailable,
          colors: product.colors,
          pid: product.pid,
          price: product.price,
        };
        temproducts.push(newProduct);
      });
      setProduct(temproducts);
      setMaxPage(data.totalPages);
    }
  }, [data]);
  // Function to handle the change in select value
  const handleFilter = (event: string) => {
    setPage(0);
    setFilter(event);
  };
  const handleCategory = (event: string) => {
    setPage(0);
    setCategory(event);
  };

  const nextPage = (num: number) => {
    if (num >= maxpage) {
      return console.log("You are on the last Page!");
    } else {
      setPage(num);
    }
  };

  const prevPage = (num: number) => {
    if (num < 0) {
      return console.log("You are on the first Page!");
    } else {
      setPage(num);
    }
  };
  if (isError) {
    return <div>Network Error. Please refresh or try again later!-- </div>;
  }
  if (isLoading) {
    return <PageLoader />;
  }
  if (isSuccess) {
    return (
      <div className=" justify-center items-center">
        <div className="flex flex-col mt-10 gap-2">
          <div className="flex flex-row gap-1 mx-5 ">
            <Input
              placeholder="Search Product"
              className="w-full"
              value={searchQueary}
              onChange={(e) => {
                setSearchQueary(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                search();
              }}
            >
              Search
            </Button>
          </div>
          <div className="flex flex-row overflow-scroll gap-2  justify-center mx-5 no-scrollbar">
            <Select
              onValueChange={(e) => {
                handleFilter(e);
              }}
              value={filter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-price">High to Low</SelectItem>
                <SelectItem value="price">Low to High</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(e) => {
                handleCategory(e);
              }}
              value={category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {/*Categories*/}
                {cat === null ? (
                  <></>
                ) : (
                  cat.map((c, i) => {
                    return (
                      <SelectItem key={i} value={c.name}>
                        {c.name}
                      </SelectItem>
                    );
                  })
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4 my-5 ">
          {product &&
            product.map((item, index) => {
              return (
                <li key={index} className="flex item-center justify-center">
                  <Card1 product={item} />
                </li>
              );
            })}
        </ul>
        {maxpage >= 0 ? (
          <nav className="flex space-x-2 justify-center mb-5">
            <Button
              onClick={() => {
                prevPage(page - 1);
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-pale text-brown hover:text-white"
            >
              {"<"}
            </Button>
            <div className="max-w-sm md:max-w-md overflow-scroll no-scrollbar gap-3 flex flex-row">
              {Array.from({ length: maxpage }, (x, i) => (x = i)).map((n) => {
                return (
                  <Button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`text-brown hover:text-white ${
                      page.toString() == n.toString()
                        ? "bg-lbrown text-white"
                        : "bg-pale"
                    }`}
                  >
                    {n + 1}
                  </Button>
                );
              })}
            </div>
            <Button
              onClick={() => {
                nextPage(page + 1);
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-pale text-brown hover:text-white"
            >
              {">"}
            </Button>
          </nav>
        ) : null}
      </div>
    );
  }
};

export default Shop;
