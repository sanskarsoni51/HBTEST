"use client";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useGetCategoryQuery } from "@/redux/api/prductsApi";
import PageLoader from "../Loader/PageLoader";

interface SubCategory {
  title: string;
  hrf: string;
  img: string;
  desc: string;
}

interface MenuItem {
  title: string;
  submenu: SubCategory[];
}

interface Category {
  name: string;
  subCategory: string[];
  _id: string;
}

const DesktopMenu = () => {
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery(null);

  if (isError) return;
  if (isLoading) return;

  const menu: MenuItem[] = categoryData.categories
    .slice(0, 5)
    .map((category: Category) => ({
      title: category.name,
      submenu: category.subCategory?.map((sub: string) => ({
        title: sub,
        hrf: `/shop?Category=${encodeURIComponent(
          category.name
        )}&category=${encodeURIComponent(sub)}`,
        desc: `Explore our range of ${sub}`,
      })),
    }));

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menu.map((item: MenuItem, index: number) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger className="bg-brown text-pale">
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="shadow-xl">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {item.submenu?.map((submenu: SubCategory, i: number) => (
                  <ListItem
                    key={i}
                    href={submenu.hrf}
                    title={submenu.title}
                    img={submenu.img}
                  >
                    {submenu.desc}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    img: string;
  }
>(({ className, title, img, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline text-brown outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-gold",
            className
          )}
          {...props}
        >
          {/* <Image src={img} alt={title} width={32} height={32} /> */}
          <div className="block ml-2">
            <div className="text-sm font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-gray-700 ">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DesktopMenu;
