"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MoleculeStructure from "@/components/MoleculeStructure";
import { useState } from "react";

interface CompoundData {
  MolecularFormula: string;
  MolecularWeight: string;
  InChIKey: string;
  CanonicalSMILES: string;
  IsomericSMILES: string;
  IUPACName: string;
  XLogP: string;
  ExactMass: string;
  MonoisotopicMass: string;
  TPSA: string;
  Complexity: string;
  Charge: string;
  HBondDonorCount: string;
  HBondAcceptorCount: string;
  RotatableBondCount: string;
  HeavyAtomCount: string;
}

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

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-gray-800 mb-6 text-center text-4xl  dark:text-white">
          PubChem Compound Search
        </h1>

        <div className="mx-auto mb-6 max-w-xl">
          <input
            type="text"
            value={compoundName}
            onChange={(e) => setCompoundName(e.target.value)}
            className="border-gray-300 w-full rounded-lg border bg-white p-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a compound name (e.g., Aspirin)"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={fetchCompoundData}
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg text-white shadow-md transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading || !compoundName}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {compoundData && (
          <div className="dark:bg-gray-800 mt-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-gray-700 mb-4 text-2xl font-bold dark:text-white">
              Compound Information
            </h2>
            <div className="grid grid-cols-1 gap-4 text-lg md:grid-cols-2">
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
        )}
      </div>
    </DefaultLayout>
  );
}
