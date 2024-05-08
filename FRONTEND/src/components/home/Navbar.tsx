import React from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { DesktopMenu } from "./DesktopMenu";
import Mobilebar from "./MobileMenu";
import { ProfileButtonD } from "./ProfieButton";

const Navbar = () => {
  return (
    <div className="sticky z-10 bg-brown shadow-sm h-[52px] top-0 w-full px-5 py-2">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <Link href="/" className="text-gold font-bold text-xl">
          HaatBazar
        </Link>
        <DesktopMenu />
        <div className="flex justify-center gap-3 items-center text-gold ">
          <Link href="/shop">
            <MagnifyingGlassIcon className="h-[28px] w-[30px]  cursor-pointer"></MagnifyingGlassIcon>
          </Link>
          <Link href="/cart">
            <ShoppingBagIcon className="h-[28px] w-[30px]  cursor-pointer"></ShoppingBagIcon>
          </Link>
          <Mobilebar />

          <ProfileButtonD />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
