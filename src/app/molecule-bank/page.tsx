import ComponetHeader from "@/components/ComponentHeader/ComponentHeader";
import MoleculeBankTable from "@/components/MoleculeBank/MoleculeBankTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <ComponetHeader pageName="Molecule Bank" containActionButton={true} />
      <div className="flex flex-col gap-10">
        <MoleculeBankTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
