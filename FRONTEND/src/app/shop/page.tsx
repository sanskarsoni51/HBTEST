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
          variants: product.variants,
        };
        temproducts.push(newProduct);
      });
      setProduct(temproducts);
      setMaxPage(data.totalPages);
    }
  }, [data]);

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
    return <div>Network Error. Please refresh or try again later!</div>;
  }
  if (isLoading) {
    return <PageLoader />;
  }
  if (isSuccess) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-start">
        {/* Filters on the left */}
        <div className="flex flex-col gap-4 p-5 md:w-1/4">
          <Input
            placeholder="Search Product"
            className="h-8 text-lg"
            value={searchQueary}
            onChange={(e) => {
              setSearchQueary(e.target.value);
            }}
          />
          <Button onClick={search} className="h-8">
            Search
          </Button>

          <Select onValueChange={handleFilter} value={filter}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-price">High to Low</SelectItem>
              <SelectItem value="price">Low to High</SelectItem>
            </SelectContent>
          </Select>

          {/* Show all categories without dropdown */}
          <h2 className="font-bold">Categories</h2>
          <div className="flex flex-col gap-2">
            {cat === null ? (
              <span>Loading categories...</span>
            ) : (
              cat.map((c, i) => (
                <Button
                  key={i}
                  onClick={() => handleCategory(c.name)}
                  className={`text-left ${
                    category === c.name
                      ? "bg-lbrown text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {c.name}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Product display on the right */}
        <div className="md:w-3/4">
          <ul className="grid grid-cols-2 lg:grid-cols-4 my-5 gap-20">
            {product &&
              product.map((item, index) => (
                <li key={index} className="flex item-center justify-center">
                  <Card1 product={item} />
                </li>
              ))}
          </ul>
          {maxpage > 1 && (
            <nav className="flex space-x-2 justify-center mb-5">
              <div className="max-w-sm md:max-w-md overflow-scroll no-scrollbar gap-3 flex flex-row">
                {/* Show the first page */}
                <Button
                  onClick={() => setPage(0)}
                  className={`text-brown hover:text-white ${
                    page === 0 ? "bg-lbrown text-white" : "bg-pale"
                  }`}
                >
                  {"<"}
                </Button>

                {page > 3 && <span className="text-gray-500">...</span>}

                {/* Show pages around the current page */}
                {Array.from({ length: maxpage }, (x, i) => (x = i))
                  .filter((n) => n >= page - 2 && n <= page + 2)
                  .map((n) => (
                    <Button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`text-brown hover:text-white ${
                        page === n ? "bg-lbrown text-white" : "bg-pale"
                      }`}
                    >
                      {n + 1}
                    </Button>
                  ))}

                {page < maxpage - 3 && (
                  <span className="text-gray-500">...</span>
                )}

                {maxpage > 1 && (
                  <Button
                    onClick={() => setPage(maxpage - 1)}
                    className={`text-brown hover:text-white ${
                      page === maxpage - 1 ? "bg-lbrown text-white" : "bg-pale"
                    }`}
                  >
                    {">"}
                  </Button>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    );
  }
};

export default Shop;
