"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useGetCategoryQuery } from "@/redux/api/prductsApi";
import PageLoader from "../Loader/PageLoader";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { useLazyGetUserQuery } from "@/redux/api/userApi";

interface SubCategory {
  title: string;
  hrf: string;
  desc: string;
  img?: string;
}

interface MenuItem {
  title: string;
  submenu: SubCategory[];
}

const Mobilebar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [getUser] = useLazyGetUserQuery();
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery(null);
  useEffect(() => {
    getUser(null);
  }, []);
  const isUser = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);

  if (isError) return;
  if (isLoading) return;

  const menu: MenuItem[] = categoryData.categories.map((category: any) => ({
    title: category.name,
    submenu: category.subCategory?.map((sub: string) => ({
      title: sub,
      hrf: `/shop?category=${encodeURIComponent(sub)}`,
      desc: `Explore our range of ${sub}`,
      // img: "/default-image.jpg", // Replace with actual image URL if available
    })),
  }));

  return (
    <>
      <div
        className={`fixed ${
          navOpen ? "right-0" : "right-[-100%]"
        } top-0 mt-12 shadow-lg w-60 h-screen ease-in duration-500 bg-brown text-pale py-10 z-10`}
      >
        <Accordion type="single" collapsible className="w-full mx-3">
          <AccordionItem value={"-1".toString()}>
            <AccordionTrigger className="mx-4 font-semibold">
              My Profile
            </AccordionTrigger>
            <AccordionContent className="mx-4 font-semibold">
              {isUser ? (
                <ul className="font-medium">
                  <li>
                    <Link
                      href="/profile"
                      className="flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      className="flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logout"
                      className="flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="">
                  <li>
                    <Link
                      href="/login"
                      className="flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="x"></AccordionItem>
          {menu.map((item, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="mx-4 text-sm">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="max-h-[220px] overflow-scroll">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.hrf}
                        className="flex p-3 rounded-md hover:bg-accent"
                      >
                        {subItem.img && (
                          <Image
                            src={subItem.img}
                            alt={subItem.title}
                            width={32}
                            height={32}
                          />
                        )}
                        <div className="ml-2">
                          <div className="font-semibold">{subItem.title}</div>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {subItem.desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div
        onClick={() => setNavOpen(!navOpen)}
        className="cursor-pointer md:hidden"
      >
        {navOpen ? (
          <XMarkIcon className="h-[28px] w-[30px] m-3" />
        ) : (
          <Bars3BottomRightIcon className="h-[28px] w-[30px] m-3" />
        )}
      </div>
    </>
  );
};

export default Mobilebar;
