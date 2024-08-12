"use client";
import React, { useState } from "react";

export default function AIPilotPage() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen text-white">
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src="/path-to-your-logo.svg"
            alt="AI Pilot"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-xl">AI Pilot</span>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-300">
            Home
          </a>
          <a href="#" className="hover:text-blue-300">
            Features
          </a>
          <a href="#" className="hover:text-blue-300">
            Process
          </a>
          <a href="#" className="hover:text-blue-300">
            Pricing
          </a>
          <a href="#" className="hover:text-blue-300">
            Blog
          </a>
          <a href="#" className="hover:text-blue-300">
            Contact
          </a>
        </div>
        <div className="space-x-4">
          <button className="hover:text-blue-300">Log In</button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full">
            Join AI
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-16">
        <div className="flex justify-center text-center items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Our <span className="text-blue-400">Latest</span> Addition:
              <br />
              Your New Co-Pilot
            </h1>
            <p className="text-xl mb-8">
              An efficient and budget-friendly method for instant text
              generation to boost your conversion rates.
            </p>
          </div>
          <span>🧬</span>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {showSettings ? "Hide Settings" : "Expand Settings"}
          </button>

          {showSettings && (
            <div className="space-y-4 mb-4">
              <input
                type="text"
                placeholder="Setting 1"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Setting 2"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Setting 3"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              />
            </div>
          )}

          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-xl mb-4">How can I help you?</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Typing Here..."
                className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
