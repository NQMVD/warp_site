import React, { useEffect, useState } from "react";
import { Style, useStyle, useTheme } from "./ThemeContext";
import { Button, TextBox } from "./components";
import { useMobileDetection } from "./hooks/useMobileDetection";

function Panel({ title, mute, style, className }: { title: string; mute: boolean; style: Style; className?: string }) {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const isMobile = useMobileDetection();

  if (title == "CRATES.IO:") {
    if (!searchHistory.includes("boss-cli")) {
      setSearchHistory((prev) => ["boss-cli", ...prev]);
    }
    if (!searchHistory.includes("needs")) {
      setSearchHistory((prev) => ["needs", ...prev]);
    }
  }
  if (title == "REPOS:") {
    if (!searchHistory.includes("boss")) {
      setSearchHistory((prev) => ["boss", ...prev]);
    }
    if (!searchHistory.includes("needs")) {
      setSearchHistory((prev) => ["needs", ...prev]);
    }
  }

  // Load history from localStorage when the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem(`history-${title}`);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, [title]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`history-${title}`, JSON.stringify(searchHistory));
  }, [searchHistory, title]);

  const playClickSound = () => {
    const sound = new Audio("/sounds/button-2.wav");
    if (!mute) {
      sound.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };
  const playTickSound = () => {
    const sound = new Audio("/sounds/button-1.wav");
    if (!mute) {
      sound.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };
  const playWhooshSound = () => {
    const sound = new Audio("/sounds/whoosh-2.wav");
    if (!mute) {
      sound.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      playClickSound();
      // Construct the URL based on the panel's title and query
      const baseUrls: Record<string, string> = {
        "CRATES.IO:": "https://crates.io/search?q=",
        "BREW:": "https://github.com/Homebrew/homebrew-core/search?q=",
        "REPOS:": "https://github.com/NQMVD?tab=repositories&q=",
        "STARS:":
          "https://github.com/NQMVD?submit=Search&tab=stars&type=&sort=&direction=&submit=Search&q=",
      };

      const baseUrl = baseUrls[title] || "https://www.google.com/search?q=";
      const searchUrl = `${baseUrl}${encodeURIComponent(query.trim())}`;

      // Open the URL in a new tab
      window.open(searchUrl, "_blank");

      // Update the search history
      if (!searchHistory.includes(query.trim())) {
        setSearchHistory((prev) => [query.trim(), ...prev]);
      }
      setQuery("");
    }
  };
  const handleWarp = () => {
    if (query.trim()) {
      playWhooshSound();
      // Construct the URL based on the panel's title and query
      const baseUrls: Record<string, string> = {
        "CRATES.IO:": "https://crates.io/crates/",
        "BREW:": "https://formulae.brew.sh/formula/",
        "REPOS:": "https://github.com/NQMVD/",
        "STARS:":
          "https://github.com/NQMVD?submit=Search&tab=stars&type=&sort=&direction=&submit=Search&q=",
      };

      const baseUrl = baseUrls[title] || "https://www.google.com/search?q=";
      const searchUrl = `${baseUrl}${encodeURIComponent(query.trim())}`;

      // Open the URL in a new tab
      window.open(searchUrl, "_blank");

      // Update the search history
      if (!searchHistory.includes(query.trim())) {
        setSearchHistory((prev) => [query.trim(), ...prev]);
      }
      setQuery("");
    }
  };

  const handleHistoryClick = (historicalQuery: string, e: React.MouseEvent) => {
    playTickSound();
    if (e.shiftKey) {
      setSearchHistory((prev) => prev.filter((q) => q !== historicalQuery));
      return;
    }
    setQuery(historicalQuery);
  };

  return (
    <div className={`bg-theme-bg-secondary rounded-2xl p-6 backdrop-blur-sm
                    shadow-theme-panel
                    border border-theme-border-primary
                    relative
                    ${isMobile ? 'h-auto' : 'h-auto lg:h-full'}
                    flex flex-col
                    ${isMobile ? '' : 'overflow-hidden'}
                    ${isMobile ? '' : 'lg:min-h-[300px]'} ${className || ''}`}>
      <div className="absolute inset-0 noise mix-blend-overlay opacity-30 rounded-2xl" />

      <div className="relative flex flex-col h-full">
        <h2 className="font-['Chakra_Petch'] text-3xl md:text-4xl lg:text-6xl font-bold text-theme-text-primary mb-4 md:mb-6 tracking-wider uppercase">
          {title}
        </h2>

        <div className={`flex gap-2 md:gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <TextBox
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) handleWarp();
                else handleSearch();
              }
              if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
                if (searchHistory.length > 0) {
                  handleHistoryClick(searchHistory[0], e);
                }
              }
            }}
            placeholder="name..."
            enableNoise={true}
            noiseOpacity={0.2}
            enableGradient={true}
            gradientFrom="var(--gradient-overlay)"
            gradientTo="transparent"
            variant="primary"
            className="w-full"
          />

          <div className={`flex flex-row gap-2 ${isMobile ? 'w-full' : 'flex-shrink-0'}`}>
            <Button
              onClick={handleSearch}
              soundEnabled={true}
              soundType="click"
              muted={mute}
              enableGradient={true}
              enableNoise={false}
              variant="primary"
              size="md"
              className={isMobile ? 'flex-1' : ''}
            >
              Search
            </Button>

            {(title == "CRATES.IO:" || title == "REPOS:" || title == "BREW:") && (
              <Button
                onClick={handleWarp}
                soundEnabled={true}
                soundType="whoosh"
                muted={mute}
                enableGradient={true}
                enableNoise={true}
                noiseOpacity={0.4}
                variant="primary"
                size="md"
                className={isMobile ? 'flex-1' : ''}
              >
                WARP
              </Button>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-theme-border-primary scrollbar-track-transparent">
            {searchHistory.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4 pr-1 pl-1 max-h-[4.5rem] md:max-h-[7rem]">
                {searchHistory.map((historicalQuery, index) => (
                  <Button
                    key={index}
                    onClick={(e) => handleHistoryClick(historicalQuery, e)}
                    soundEnabled={true}
                    soundType="tick"
                    muted={mute}
                    enableGradient={true}
                    enableNoise={false}
                    variant={style}
                    size="sm"
                    className="w-full text-theme-text-quaternary truncate flex items-center justify-center"
                  >
                    {historicalQuery}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [isMuted, setMuted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { style, toggleStyle } = useStyle();
  const isMobile = useMobileDetection();


  const playSuccessSound = () => {
    const sound = new Audio("/sounds/success.wav");
    sound.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  };
  const playFailSound = () => {
    const sound = new Audio("/sounds/fail.wav");
    sound.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  };
  const toggleSounds = () => {
    setMuted(!isMuted); // doesnt change this tick?
    if (!isMuted) {
      playFailSound();
    } else {
      playSuccessSound();
    }
  };
  return (
    <div className={`bg-theme-bg-primary ${isMobile ? 'min-h-screen' : 'fixed inset-0 overflow-hidden'}`}>
      <div className={`${isMobile ? 'noise-mobile' : 'absolute inset-0 noise'} mix-blend-overlay opacity-50`} />

      <div className={`relative p-4 flex flex-col ${isMobile ? 'min-h-screen z-10' : 'h-full'}`}>
        {/* Centered Header */}
        <div className="flex flex-row justify-center items-center gap-2 mb-4">
          <h1 className="font-['Chakra_Petch'] text-3xl md:text-4xl font-bold text-theme-text-primary tracking-wider">
            WARP
          </h1>
          <h1 className="font-['Jetbrains_Mono'] text-lg md:text-xl text-theme-text-tertiary text-theme-text-primary tracking-wider">
            through space...
          </h1>
        </div>

        {/* Grid of panels */}
        <div className={`grid grid-cols-1 gap-4 ${isMobile ? 'mb-4' : 'flex-1 lg:grid-cols-2'}`}>
          <Panel title="CRATES.IO:" mute={isMuted} style={style} className="order-1 lg:order-none"/>
          <Panel title="BREW:" mute={isMuted} style={style} className="order-3 lg:order-none"/>
          <Panel title="REPOS:" mute={isMuted} style={style} className="order-2 lg:order-none"/>
          <Panel title="STARS:" mute={isMuted} style={style} className="order-4 lg:order-none"/>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <a
            href="https://home.stardive.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-theme-text-tertiary hover:text-theme-text-primary transition-colors font-['JetBrains_Mono']"
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
          <Button
            onClick={toggleSounds}
            enableGradient={true}
            enableNoise={false}
            variant="tertiary"
            size="sm"
            className="h-7 px-6 text-theme-text-tertiary hover:text-theme-text-primary hover:bg-theme-bg-hover"
          >
            {isMuted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m2.75 1.75 10.5 12.5V1.75L9.318 5.245a2 2 0 0 1-1.328.505H6.11m.14 4.5h-2.5a1 1 0 0 1-1-1v-3.5"
                    >
                    </path>
                  </svg>
                ) || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12.75 5.75s1.5.75 1.5 2.25-1.5 2.25-1.5 2.25m-3.5-8.5L5.318 5.245a2 2 0 0 1-1.328.505H2.75a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h1.24a2 2 0 0 1 1.328.505L9.25 14.25V1.75Z"
                >
                </path>
              </svg>
            )}
          </Button>
          <Button
            onClick={toggleTheme}
            enableGradient={true}
            enableNoise={false}
            variant="tertiary"
            size="sm"
            className="flex items-center gap-2 h-7 px-6 text-theme-text-tertiary hover:text-theme-text-primary hover:bg-theme-bg-hover transition-colors"
          >
            <span className="capitalize">theme: {theme}</span>
          </Button>
          <Button
            onClick={toggleStyle}
            enableGradient={true}
            enableNoise={false}
            variant="tertiary"
            size="sm"
            className="flex items-center gap-2 h-7 px-6 text-theme-text-tertiary hover:text-theme-text-primary hover:bg-theme-bg-hover transition-colors"
          >
            <span className="capitalize">style: {style}</span>
          </Button>
          <a
            href="https://github.com/NQMVD/warp_site"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-theme-text-tertiary hover:text-theme-text-primary transition-colors font-['JetBrains_Mono']"
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
