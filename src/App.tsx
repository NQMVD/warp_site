import React, { useState } from "react";
import arrow from "../arrow.svg";
import w_warp from "../w_warp.png";
import a_warp from "../a_warp.png";
import r_warp from "../r_warp.png";
import p_warp from "../p_warp.png";

function Panel({ title }: { title: string }) {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory((prev) => [query.trim(), ...prev]); // Prepend to start
    }
    setQuery("");
  };

  const handleHistoryClick = (historicalQuery: string, e: React.MouseEvent) => {
    // Handle Ctrl+Shift+Click to remove
    if (e.shiftKey) {
      setSearchHistory((prev) => prev.filter((q) => q !== historicalQuery));
      return;
    }
    setQuery(historicalQuery);
  };

  return (
    <div className="bg-zinc-900/80 rounded-2xl p-6 backdrop-blur-sm
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                    border border-zinc-800/50
                    relative
                    h-full
                    flex flex-col
                    overflow-hidden">
      <div className="absolute inset-0 noise mix-blend-overlay opacity-30 rounded-2xl" />

      <div className="relative flex flex-col h-full">
        <h2 className="font-['Chakra_Petch'] text-6xl font-bold text-white mb-6 tracking-wider uppercase">
          {title}
        </h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 h-12 bg-zinc-900 text-zinc-100 rounded-xl px-4
                     shadow-[0_0_10px_rgba(0,0,0,0.7)]
                     border border-zinc-800
                     focus:outline-none focus:ring-2 focus:ring-zinc-700
                     font-['JetBrains_Mono'] text-base
                     relative
                     overflow-hidden"
            placeholder="query..."
          />

          <div className="relative">
            <button
              onClick={handleSearch}
              className="h-12 px-6 bg-zinc-900 text-zinc-100 rounded-xl
                       shadow-[0_0_10px_rgba(0,0,0,0.7)]
                       border border-zinc-800
                       hover:bg-zinc-800 
                       focus:outline-none focus:ring-2 focus:ring-zinc-700
                       font-['JetBrains_Mono'] text-base
                       transform transition-all duration-300 hover:scale-[1.05]
                       relative
                       overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/20 to-transparent rounded-xl" />
              <span className="relative">Search</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {searchHistory.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4 pr-2">
              {searchHistory.map((historicalQuery, index) => (
                <button
                  key={index}
                  onClick={(e) => handleHistoryClick(historicalQuery, e)}
                  className="px-2 py-2 bg-zinc-800/50 text-zinc-300 rounded-lg
                           border border-zinc-700/50
                           hover:bg-zinc-700/50 
                           focus:outline-none focus:ring-2 focus:ring-zinc-600
                           font-['JetBrains_Mono'] text-sm
                           transform transition-all duration-200 hover:scale-[1.02]
                           truncate
                           relative
                           overflow-hidden
                           max-w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-700/20 to-transparent rounded-lg" />
                  <span className="relative">{historicalQuery}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="fixed inset-0 bg-zinc-900 overflow-hidden">
      <div className="absolute inset-0 noise mix-blend-overlay opacity-50" />

      <div className="relative h-full p-4 flex flex-col">
        {/* Centered Header */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <h1 className="font-['Chakra_Petch'] text-4xl font-bold text-white tracking-wider">
            WARP
          </h1>
          <h1 className="font-['Jetbrains_Mono'] text-zinc-400 text-white tracking-wider">
            (through space or the web...)
          </h1>
        </div>

        {/* Grid of panels */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Panel title="CRATE:" />
          <Panel title="NIX:" />
          <Panel title="REPO:" />
          <Panel title="HELIX:" />
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://home.stardive.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-['JetBrains_Mono']"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Home</span>
          </a>
          <a
            href="https://github.com/NQMVD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-['JetBrains_Mono']"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
              </path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
