"use client";

import React, { useEffect } from "react";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import ProfileForm from "./ProfileForm";
import ProfilePhotoUpdate from "./ProfilePhotoUpdate";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { userSchema } from "@/schema/schema";

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
      <div className="mb-6 md:p-10 flex items-center justify-center">
        <div className="w-[1200px] bg-pale text-brown font-semibold p-6 rounded-lg shadow-md">
          <Card className="flex items-center justify-between p-6 mb-6 shadow-md">
            <div>
              <h1 className="text-2xl font-semibold">Welcome {d.name}!</h1>
              <p className="text-gray-500">Manage your profile details here</p>
            </div>
            <div className="mb-4">
              <ProfilePhotoUpdate picsrc={d.profilePhoto} />
            </div>
          </Card>
          <div>
            <ProfileForm user={d} />
          </div>
          <div className="mt-4 text-center">
            <a href="/" className="text-brown">
              Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProfilePage;
