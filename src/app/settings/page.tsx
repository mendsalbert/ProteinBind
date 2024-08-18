"use client";
import Breadcrumb from "@/components/ComponentHeader/ComponentHeader";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Edit, MailIcon, CameraIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { getUserByEmail, updateUser } from "@/lib/actions/user.actions";

const Settings = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userBio: "",
    photo: "",
    id: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const user = await getUserByEmail(session.user.email);
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userBio: user.userBio || "",
          photo: user.photo || "/images/user/user-03.png",
          id: user._id,
        });
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  const handlePersonalInfoSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        userBio: userData.userBio,
        photo: userData.photo,
        email: userData.email,
      };

      if (userData.id) {
        const updated = await updateUser(userData.id, updatedUser);
        setUserData(updated);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors("Failed to update profile.");
      console.error("Error updating user:", error);
    }
  };

  console.log(userData);

  const handleImageUploadSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let base64Image = userData.photo;
      if (imageFile) {
        base64Image = await convertImageToBase64(imageFile);
      }

      if (userData.id) {
        const updatedUser = {
          ...userData,
          photo: base64Image,
        };
        const updated = await updateUser(userData.id, updatedUser);
        setUserData(updated);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors("Failed to upload image.");
      console.error("Error uploading image:", error);
    }
  };

  const convertImageToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setUserData((prevData) => ({
        ...prevData,
        photo: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="mb-4 flex flex-row items-center  space-x-2">
          <span>Toggle Theme</span>
          <DarkModeSwitcher />
        </div>
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handlePersonalInfoSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        First Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-3">
                          <User />
                        </span>
                        <input
                          className="w-full rounded-lg border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Last Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-3">
                          <User />
                        </span>
                        <input
                          className="w-full rounded-lg border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <MailIcon />
                      </span>
                      <input
                        className="w-full rounded-lg border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        value={userData.email}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <Edit size={20} />
                      </span>

                      <textarea
                        className="w-full rounded-lg border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="userBio"
                        rows={6}
                        value={userData.userBio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded-lg bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Image Upload Form */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleImageUploadSubmit}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <Image
                        src={userData.photo}
                        width={55}
                        height={55}
                        alt="User"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button
                          type="button"
                          className="text-sm hover:text-primary"
                          onClick={() => setImageFile(null)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="text-sm hover:text-primary"
                          onClick={() => {
                            document.getElementById("fileInput")?.click();
                          }}
                        >
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-lg border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      id="fileInput"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <CameraIcon size={20} />
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded-lg bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
