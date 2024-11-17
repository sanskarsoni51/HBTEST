"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useLazyUserImageupdateQuery } from "@/redux/api/userApi";
import React from "react";

const ProfilePhotoUpdate = ({ picsrc }: { picsrc: string }) => {
  const [imgSrc, setImgSrc] = React.useState<File | null>(null);
  const [changeProfilePic, { isSuccess, isError, isLoading }] =
    useLazyUserImageupdateQuery();

  function changepic() {
    if (imgSrc !== null) {
      changeProfilePic(imgSrc);
    }
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Profile Photo updated Successfully",
        variant: "default",
        duration: 1000,
      });
    }
    if (isError) {
      toast({
        title: "Error",
        description: "Error in Profile Photo updation.",
        variant: "destructive",
        duration: 1000,
      });
    }
  }

  return (
    <div className="flex flex-row gap-4 items-center">
      {picsrc ? (
        <img
          src={picsrc}
          alt="Profile Photo"
          className="rounded-full w-[100px] h-[100px] object-cover aspect-square"
        />
      ) : (
        <div className="rounded-full w-[100px] h-[100px] flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Input
          placeholder="New Profile"
          type="file"
          onChange={(e) => {
            if (e.target.files?.length) {
              setImgSrc(e.target.files[0]);
            }
          }}
        />
        <Button onClick={changepic} disabled={isLoading || !imgSrc}>
          Change
        </Button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpdate;
