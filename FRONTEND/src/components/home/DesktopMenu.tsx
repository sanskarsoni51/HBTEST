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
import Image from "next/image";

const menu = [
  {
      title: "Men",
      submenu: [
          {
              title: "Rings",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
          {
              title: "Bracelate",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
          {
              title: "Chains",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },

          {
              title: "Swords",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
          {
              title: "Swords",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
          {
              title: "Swords",
              hrf:"/shop",
              img: "next.svg",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
      ]
  },
  {
      title: "Female",
      submenu: [
          {
              title: "Swords",
              hrf:"/shop",
              img: "",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
      ]
  },
  {
      title: "Traditional",
      submenu: [
          {
              title: "Swords",
              hrf:"/shop",
              img: "",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
      ]
  },
  {
      title: "Immitated",
      submenu: [
          {
              title: "Swords",
              hrf:"/shop",
              img: "",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
      ]
  },
  {
      title: "1g-Gold",
      submenu: [
          {
              title: "Swords",
              hrf:"/shop",
              img: "",
              desc:"sdfaidf f aisdfs dfisdgf isdhf hdf"
          },
      ]
  }
]

export const DesktopMenu = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menu.map((item, index) => {
          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className="bg-brown text-pale">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="shadow-xl">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {item.submenu?.map((e, i) => {
                    return (
                      <ListItem
                        key={i}
                        href={e.hrf}
                        title={e.title}
                        img={e.img}
                      >
                        {e.desc}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
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
          <Image src="/cat2.jpg" alt={title} width={32} height={32} />
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
