import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import MoleculeStructure from "../../components/MoleculeStructure/index";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ModalLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Generate Molecules" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                SMILES to molecule Generator
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
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
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Iterations
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded-lg border-[1.5px] bg-transparent  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Generate Molecules
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-lg border border-stroke bg-white p-3 shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <MoleculeStructure
              id="mol-1"
              structure="CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C"
              scores={0.9276153047920419}
            />
            {/* <MoleculeStructure
              id="mol-2"
              structure="CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C"
              scores={0.9276153047920419}
            />
            <MoleculeStructure
              id="mol-2"
              structure="CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C"
              scores={0.9276153047920419}
            />
            <MoleculeStructure
              id="mol-2"
              structure="CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C"
              scores={0.9276153047920419}
            /> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ModalLayout;
