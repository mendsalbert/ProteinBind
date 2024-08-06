"use client";
import React, { useState } from "react";
import MoleculeStructure from "../components/proteinViz";

const Home = () => {
  const [smiles, setSmiles] = useState("");
  const [numMolecules, setNumMolecules] = useState(20);
  const [minSimilarity, setMinSimilarity] = useState(0.3);
  const [particles, setParticles] = useState(30);
  const [iterations, setIterations] = useState(10);
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_KEY =
      "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";
    const invokeUrl =
      "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    const payload = {
      algorithm: "CMA-ES",
      num_molecules: numMolecules,
      property_name: "QED",
      minimize: false,
      min_similarity: minSimilarity,
      particles: particles,
      iterations: iterations,
      smi: smiles,
    };

    try {
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setMolecules(JSON.parse(data.molecules));
      console.log(JSON.parse(data.molecules));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black bg-white">
      <h1>SMILES to Molecule Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SMILES String:</label>
          <input
            type="text"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Molecules:</label>
          <input
            type="number"
            value={numMolecules}
            onChange={(e) => setNumMolecules(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Minimum Similarity:</label>
          <input
            type="number"
            step="0.01"
            value={minSimilarity}
            onChange={(e) => setMinSimilarity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Particles:</label>
          <input
            type="number"
            value={particles}
            onChange={(e) => setParticles(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Iterations:</label>
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Molecules"}
        </button>
      </form>
      <div className="molecules-container">
        {molecules.map((mol, index) => (
          <MoleculeStructure
            key={index}
            id={`mol-${index}`}
            structure={mol.sample}
            width={200}
            height={200}
            svgMode
            scores={mol.score}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
