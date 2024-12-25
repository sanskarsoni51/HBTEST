import React from "react";
import { toast } from "@/components/ui/use-toast";
import { useLazyUserImageupdateQuery } from "@/redux/api/userApi";
import { CameraIcon } from "@heroicons/react/24/solid"; // Importing Heroicon for camera

const ProfilePhotoUpdate = ({ picsrc }: { picsrc: string }) => {
  const [imgSrc, setImgSrc] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null); // Image preview state
  const [changeProfilePic, { isSuccess, isError, isLoading }] =
    useLazyUserImageupdateQuery();

  // Handle file change and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setImgSrc(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl); // Set the preview
      changeProfilePic(file); // Immediately trigger image update
    }
  };

  // Handle toast notification based on success or error
  React.useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Profile Photo updated successfully",
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
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-row gap-4 items-center relative">
      {/* Display current or default image */}
      <div
        onClick={() => document.getElementById("file-input")?.click()} // Trigger file input on click
        className="cursor-pointer relative"
      >
        {picsrc || preview ? (
          <img
            src={preview || picsrc}
            alt="Profile Photo"
            className="rounded-full w-[100px] h-[100px] object-cover aspect-square"
          />
        ) : (
          <div className="rounded-full w-[100px] h-[100px] flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}

        {/* Camera Icon */}
        <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
          <CameraIcon className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*" // Accept only image files
      />
    </div>
  );
};

export default ProfilePhotoUpdate;
