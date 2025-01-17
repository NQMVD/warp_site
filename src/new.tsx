import React, { useState } from "react";
import arrow from "./arrow.svg";

function Panel({ title }: { title: string }) {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory((prev) => [query.trim(), ...prev]);
    }
    setQuery("");
  };

  const handleHistoryClick = (historicalQuery: string, e: React.MouseEvent) => {
    if (e.ctrlKey && e.shiftKey) {
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
          <img
            src={arrow}
            alt="Arrow"
            className="w-8 h-8 [stroke:white] [stroke-width:2] [fill:none]"
          />
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
                strokeWidth="2"
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
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 22V18.797C10.438 18.797 9.938 18.797 9.438 18.797C8.938 18.797 8.438 18.297 8.438 17.797C8.438 17.297 8.938 16.797 9.438 16.797C9.938 16.797 10.438 17.297 10.438 17.797V16.797C10.438 15.797 9.438 14.797 8.438 14.797C7.438 14.797 6.438 15.797 6.438 16.797C6.438 17.797 7.438 18.797 8.438 18.797H10.438V22C15.219 21.128 18.876 16.991 18.876 12C18.876 6.477 14.4 2 8.876 2H12Z"
                fill="currentColor"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
