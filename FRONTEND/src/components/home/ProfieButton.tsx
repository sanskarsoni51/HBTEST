"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import Link from "next/link";

export function ProfileButtonD() {
  const [getUser, { isLoading, isSuccess, isError }] = useLazyGetUserQuery();
  useEffect(() => {
    getUser(null);
  }, []);

  const isUser = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block">
        <Avatar className="h-[28px] w-[30px]">
          {user.profilePhoto !== "" ? (
            <AvatarImage src="/cat2.jpg" />
          ) : (
            <UserIcon className="h-[28px] w-[30px]"></UserIcon>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isUser ? (
          <>
            <DropdownMenuItem>
              <Link href={"/profile"}>My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/orders"}>My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/logout"}>Logout</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href={"/login"}>Login</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
