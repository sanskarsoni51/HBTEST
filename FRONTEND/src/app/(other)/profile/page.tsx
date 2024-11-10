"use client";

import React, { useEffect, useState } from "react";
import {
  useLazyGetUserQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import ProfileForm from "./ProfileForm";
import { CardWrapper } from "@/components/card-wrapper";
import ProfilePhotoUpdate from "./ProfilePhotoUpdate";

const ProfilePage = () => {
  const [getUser, { isLoading, isError, isSuccess }] = useLazyGetUserQuery();
  const d = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    getUser(null);
  }, []);

  if (isLoading) return <div>loading...</div>;
  if (isError) redirect("/login"); // TODO: error handling
  if (isSuccess) {
    return (
      <div className="w-full flex items-center justify-center">
        <CardWrapper
          headerlabel="Update Profile"
          backbuttonhref="/"
          backbuttonlabel="Home"
          discription="Update Your Profile"
          showsocial={false}
        >
          <ProfilePhotoUpdate picsrc={d.profilePhoto} />
          <ProfileForm user={d} />
        </CardWrapper>
      </div>
    );
  }
};
export default ProfilePage;
