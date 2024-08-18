"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MoleculeStructure from "@/components/MoleculeStructure";
import { useState } from "react";
import { Search } from "lucide-react";

export default function PubChem() {
  const [compoundName, setCompoundName] = useState("");
  const [compoundData, setCompoundData] = useState<CompoundData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompoundData = async () => {
    setLoading(true);
    setError("");
    setCompoundData(null);

    try {
      const response = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(
          compoundName,
        )}/property/MolecularFormula,MolecularWeight,InChIKey,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,HeavyAtomCount/JSON`,
      );

      if (!response.ok) {
        throw new Error("Compound not found");
      }

      const data = await response.json();

      if (
        data &&
        data.PropertyTable &&
        data.PropertyTable.Properties &&
        data.PropertyTable.Properties.length > 0
      ) {
        const compoundInfo = data.PropertyTable.Properties[0];
        setCompoundData({
          MolecularFormula: compoundInfo.MolecularFormula,
          MolecularWeight: compoundInfo.MolecularWeight,
          InChIKey: compoundInfo.InChIKey,
          CanonicalSMILES: compoundInfo.CanonicalSMILES,
          IsomericSMILES: compoundInfo.IsomericSMILES,
          IUPACName: compoundInfo.IUPACName,
          XLogP: compoundInfo.XLogP,
          ExactMass: compoundInfo.ExactMass,
          MonoisotopicMass: compoundInfo.MonoisotopicMass,
          TPSA: compoundInfo.TPSA,
          Complexity: compoundInfo.Complexity,
          Charge: compoundInfo.Charge,
          HBondDonorCount: compoundInfo.HBondDonorCount,
          HBondAcceptorCount: compoundInfo.HBondAcceptorCount,
          RotatableBondCount: compoundInfo.RotatableBondCount,
          HeavyAtomCount: compoundInfo.HeavyAtomCount,
        });
      } else {
        throw new Error("Compound data is not available");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCompoundData();
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto h-[140dvh] p-0">
        <div className="mb-6 flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Compound Search{" "}
          </h2>
          <div className="relative mt-4 flex flex-1 md:mt-0 md:justify-end">
            <input
              type="text"
              value={compoundName}
              onChange={(e) => setCompoundName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-gray-300 w-full rounded-lg border bg-white p-3 pl-10 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-96"
              placeholder="Enter a compound name"
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <Search className="text-gray-500" />
            </span>
          </div>
        </div>

        {error && <p className="text-red-600 mt-6">{error}</p>}

        {compoundData && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="dark:bg-gray-800  space-y-3 rounded-lg bg-white p-6  shadow-md">
              <h2 className="text-gray-700 mb-4 text-xl text-black  dark:text-white">
                Basic Information
              </h2>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Molecular Formula:
                </strong>{" "}
                {compoundData.MolecularFormula}
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Molecular Weight:
                </strong>{" "}
                {compoundData.MolecularWeight} g/mol
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  InChIKey:
                </strong>{" "}
                {compoundData.InChIKey}
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Canonical SMILES:
                </strong>{" "}
                <MoleculeStructure
                  id={`${compoundData.CanonicalSMILES}`}
                  structure={compoundData.CanonicalSMILES}
                />
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Isomeric SMILES:
                </strong>{" "}
                {compoundData.IsomericSMILES}
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  IUPAC Name:
                </strong>{" "}
                {compoundData.IUPACName}
              </p>
            </div>

            <div className="dark:bg-gray-800 space-y-3 rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-gray-700 mb-4 text-xl text-black  dark:text-white">
                Physical Properties
              </h2>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  XLogP:
                </strong>{" "}
                {compoundData.XLogP}
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Exact Mass:
                </strong>{" "}
                {compoundData.ExactMass} g/mol
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Monoisotopic Mass:
                </strong>{" "}
                {compoundData.MonoisotopicMass} g/mol
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Topological Polar Surface Area (TPSA):
                </strong>{" "}
                {compoundData.TPSA} Å²
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Complexity:
                </strong>{" "}
                {compoundData.Complexity}
              </p>
              <p>
                <strong className="text-gray-600 dark:text-gray-300">
                  Charge:
                </strong>{" "}
                {compoundData.Charge}
              </p>
            </div>

            <div className="dark:bg-gray-800 space-y-3 rounded-lg bg-white p-6 shadow-md md:col-span-2">
              <h2 className="text-gray-700 mb-4 text-xl text-black  dark:text-white">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <p>
                  <strong className="text-gray-600 dark:text-gray-300">
                    Hydrogen Bond Donors:
                  </strong>{" "}
                  {compoundData.HBondDonorCount}
                </p>
                <p>
                  <strong className="text-gray-600 dark:text-gray-300">
                    Hydrogen Bond Acceptors:
                  </strong>{" "}
                  {compoundData.HBondAcceptorCount}
                </p>
                <p>
                  <strong className="text-gray-600 dark:text-gray-300">
                    Rotatable Bonds:
                  </strong>{" "}
                  {compoundData.RotatableBondCount}
                </p>
                <p>
                  <strong className="text-gray-600 dark:text-gray-300">
                    Heavy Atom Count:
                  </strong>{" "}
                  {compoundData.HeavyAtomCount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
