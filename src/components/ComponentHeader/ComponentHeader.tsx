"use client";
import Modal from "@/app/ui/modals/page";
import React from "react";

interface ComponentHeaderProps {
  pageName: string;
  containActionButton?: boolean;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  pageName,
  containActionButton,
}) => {
  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      {containActionButton && (
        <nav>
          <ol className="flex items-center gap-2">
            <li
              onClick={() => openModal("my_modal_1")}
              className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-center font-medium text-white"
            >
              Add Molecule
            </li>
          </ol>
        </nav>
      )}

      <Modal
        id="my_modal_1"
        title="Add New Molecule"
        content={
          <>
            <form action="#">
              <div className="p-1">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      SMILS String
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border-[1.5px] bg-transparent  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Number of Molecules{" "}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border-[1.5px] bg-transparent  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Minimum Similarity
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded-lg border-[1.5px] bg-transparent  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Particles
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded-lg border-[1.5px] bg-transparent  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add molecule
                </button>
              </div>
            </form>
          </>
        }
        onCloseText="Close"
      />
    </div>
  );
};

export default ComponentHeader;
