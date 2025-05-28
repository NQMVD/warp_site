/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Chakra Petch', 'monospace'],
      },
      colors: {
        theme: {
          'bg-primary': 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-tertiary': 'var(--bg-tertiary)',
          'bg-hover': 'var(--bg-hover)',
          'border-primary': 'var(--border-primary)',
          'border-secondary': 'var(--border-secondary)',
          'border-tertiary': 'var(--border-tertiary)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'text-quaternary': 'var(--text-quaternary)',
        },
      },
      boxShadow: {
        'theme-panel': '0 8px 32px var(--panel-shadow)',
        'theme-button': '0 0 10px var(--button-shadow)',
      },
    },
  },
  plugins: [],
};