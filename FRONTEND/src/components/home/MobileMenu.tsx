"use client";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/store";
import { useLazyGetUserQuery } from "@/redux/api/userApi";

const menu = [
  {
    title: "Men",
    submenu: [
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },

      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
      {
        title: "Swords",
        hrf: "/shop",
        img: "next.svg",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
    ],
  },
  {
    title: "Female",
    submenu: [
      {
        title: "Swords",
        hrf: "/shop",
        img: "",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
    ],
  },
  {
    title: "Traditional",
    submenu: [
      {
        title: "Swords",
        hrf: "/shop",
        img: "",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
    ],
  },
  {
    title: "Immitated",
    submenu: [
      {
        title: "Swords",
        hrf: "/shop",
        img: "",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
    ],
  },
  {
    title: "1g-Gold",
    submenu: [
      {
        title: "Swords",
        hrf: "/shop",
        img: "",
        desc: "sdfaidf f aisdfs dfisdgf isdhf hdf",
      },
    ],
  },
];

// this is for future use as i want optimize the barIcon(only) as client side
const Mobilebar = () => {
  const [navOpen, setNavOpen] = useState(true);
  const [getUser, { isLoading, isSuccess, isError }] = useLazyGetUserQuery();
  useEffect(() => {
    getUser(null);
  }, []);

  const isUser = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <div
        className={
          !navOpen
            ? `fixed flex mt-12 md:hidden right-0 top-0 shadow-lg  w-60 h-screen ease-in duration-500 items-top justify-center  text-pale bg-brown py-10 z-10`
            : `fixed flex mt-12  md:hidden right-[-100%] w-60 top-0 shadow-lg h-full ease-in duration-500 items-top justify-center  text-pale bg-brown py-10 z-10`
        }
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

          {menu.map((e, i) => {
            return (
              <AccordionItem key={i} value={i.toString()} className="">
                <AccordionTrigger className="mx-4 text-sm ">
                  {e.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="max-h-[220px] overflow-scroll">
                    {e.submenu?.map((se, si) => {
                      return (
                        <li key={si}>
                          <a
                            href={`${se.hrf}`}
                            className="flex flex-row select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <Image
                              src="/cat2.jpg"
                              alt={se.title}
                              width={32}
                              height={32}
                            />
                            <div className="block ml-2">
                              <div className="text-sm font-semibold leading-none text-white">
                                {se.title}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-gray-400 ">
                                {se.desc}
                              </p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <div
        onClick={() => setNavOpen(!navOpen)}
        className={`md:hidden cursor-pointer`}
      >
        {navOpen ? (
          <Bars3BottomRightIcon className="h-[28px] w-[30px] m-3 "></Bars3BottomRightIcon>
        ) : (
          <XMarkIcon className="h-[28px] w-[30px] m-3 " />
        )}
      </div>
    </>
  );
};

export default Mobilebar;
