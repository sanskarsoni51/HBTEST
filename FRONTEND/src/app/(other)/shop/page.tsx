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
import { Toaster } from "@/components/ui/toaster";

const Shop = () => {
  const [product, setProduct] = useState<Array<ProductSchema> | null>(null);
  const [searchQueary, setSearchQueary] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [maxpage, setMaxPage] = useState<number>(0);
  const [cat, setCat] = useState<Array<{ name: string }> | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

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

  if (isError) {
    return (
      <div className="flex flex-col md:flex-row justify-center h-500">
        <div className="flex flex-col gap-4 p-5 w-full md:w-1/4">
          No Product found
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <PageLoader />;
  }
  if (isSuccess) {
    return (
      <div className="flex flex-col md:flex-row justify-center min-h-[500px] items-start">
        {/* Filters on the left */}
        <div className="flex flex-col gap-4 p-5 w-full md:w-1/4">
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

          <div className="hidden md:block">
            <Select onValueChange={handleFilter} value={filter}>
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-price">High to Low</SelectItem>
                <SelectItem value="price">Low to High</SelectItem>
              </SelectContent>
            </Select>

            {/* Show Categories */}
            <div>
              <h2 className="font-bold">Categories</h2>
              <div className="flex flex-col gap-2">
                {cat === null ? (
                  <span>Loading categories...</span>
                ) : (
                  (showAllCategories ? cat : cat.slice(0, 5)).map((c, i) => (
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

              {/* Show More Button */}
              {cat && cat.length > 5 && !showAllCategories && (
                <Button
                  className="mt-4 h-8"
                  onClick={() => setShowAllCategories(true)}
                >
                  Show More
                </Button>
              )}
              {showAllCategories && (
                <Button
                  className="mt-4 h-8"
                  onClick={() => setShowAllCategories(false)}
                >
                  Show Less
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around px-4 py-2 z-50 md:hidden">
          {/* Sort Dropdown */}
          <Select onValueChange={handleFilter} value={filter}>
            <SelectTrigger className="flex-1 mx-2">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-price">High to Low</SelectItem>
              <SelectItem value="price">Low to High</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Dropdown */}
          <Select onValueChange={handleCategory} value={category}>
            <SelectTrigger className="flex-1 mx-2">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {cat?.map((c, i) => (
                <SelectItem key={i} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product display on the right */}
        <div className="w-full md:w-3/4">
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 my-5 md:gap-8">
            {product &&
              product.map((item, index) => (
                <li key={index} className="flex item-center justify-center">
                  <Card1 product={item} />
                </li>
              ))}
          </ul>
          {maxpage > 1 && (
            <nav className="flex space-x-2 justify-center mb-5">
              <div className="flex overflow-x-auto no-scrollbar gap-2 px-2">
                {/* Pagination Controls */}
                <Button
                  onClick={() => setPage(page > 0 ? page - 1 : 0)}
                  disabled={page === 0}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {"<"}
                </Button>

                <Button
                  onClick={() => setPage(0)}
                  className={`text-brown hover:text-white ${
                    page === 0 ? "bg-lbrown text-white" : "bg-pale"
                  } px-3 py-1`}
                >
                  1
                </Button>

                {page > 1 && maxpage > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                {page > 1 && page < maxpage && (
                  <Button
                    onClick={() => setPage(page - 1)}
                    className={`text-brown hover:text-white ${
                      page === page - 1 ? "bg-lbrown text-white" : "bg-pale"
                    } px-3 py-1`}
                  >
                    {page}
                  </Button>
                )}

                {page > 0 && page < maxpage - 1 && (
                  <Button
                    onClick={() => setPage(page)}
                    className="bg-lbrown text-white px-3 py-1"
                  >
                    {page + 1}
                  </Button>
                )}

                {page < maxpage - 2 && (
                  <Button
                    onClick={() => setPage(page + 1)}
                    className={`text-brown hover:text-white ${
                      page === page + 1 ? "bg-lbrown text-white" : "bg-pale"
                    } px-3 py-1`}
                  >
                    {page + 2}
                  </Button>
                )}

                {page < maxpage - 3 && maxpage > 4 && (
                  <span className="text-gray-500">...</span>
                )}

                <Button
                  onClick={() => setPage(maxpage - 1)}
                  className={`text-brown hover:text-white ${
                    page === maxpage - 1 ? "bg-lbrown text-white" : "bg-pale"
                  } px-3 py-1`}
                >
                  {maxpage}
                </Button>

                <Button
                  onClick={() =>
                    setPage(page < maxpage - 1 ? page + 1 : maxpage - 1)
                  }
                  disabled={page === maxpage - 1}
                  className="text-brown hover:text-white bg-pale px-3 py-1"
                >
                  {">"}
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>
    );
  }
};

export default Shop;
