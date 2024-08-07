"use client";
import React, { useState } from "react";
import MoleculeStructure from "../components/proteinViz";
import BoxReveal from "@/components/ui/boxreveal";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import BlurFade from "@/components/magicui/blur-fade";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { IconArrowRight } from "@tabler/icons-react";
import TypingAnimation from "@/components/magicui/typing-animation";
import Link from "next/link";

const Home = () => {
  const [smiles, setSmiles] = useState(
    "[H][C@@]12Cc3c[nH]c4cccc(C1=C[C@H](NC(=O)N(CC)CC)CN2C)c34"
  );
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

  const images = Array.from({ length: 9 }, (_, i) => {
    const isLandscape = i % 2 === 0;
    const width = isLandscape ? 800 : 600;
    const height = isLandscape ? 600 : 800;
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
  });

  return (
    <div className="bg-[#181818] overflow-scroll ">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-black md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-green-700 to-green-200 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent ">
          ProteinBinds
        </span>

        {/* Inner Circles */}
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <Icons.whatsapp />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={20}
          delay={10}
          radius={80}
        >
          <Icons.notion />
        </OrbitingCircles>

        {/* Outer Circles (reverse) */}
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          radius={190}
          duration={20}
          reverse
        >
          <Icons.googleDrive />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={20}
          reverse
        >
          <Icons.gitHub />
        </OrbitingCircles>
      </div>
      <TypingAnimation
        className="text-2xl font-semibold bg-black text-black dark:text-white"
        text="Revolutionizing Drug Discovery"
      />
      <div className="z-10 flex min-h-[8rem] bg-black items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <Link href={"/dashboard"}>
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-3 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing ProteinBind</span>
              <IconArrowRight className="ml-1 text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </Link>
        </div>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
};

const Icons = {
  gitHub: () => <span className="text-4xl">🧪</span>,
  notion: () => <span className="text-4xl">🧬</span>,
  openai: () => <span className="text-4xl">⚕️</span>,
  googleDrive: () => <span className="text-4xl">💊</span>,
  whatsapp: () => <span className="text-4xl">👨🏼‍🔬</span>,
};

export default Home;
