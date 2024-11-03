/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        link: "#3083DC",
        bg: "#121c33",
        "secondary-bg": "#242526",
        primary: "#2a5df7",
        secondary: "#1341cd",
        "custom-black": "#171717",
        "custom-gray": "#393E46",
        "custom-yellow": "#F2BB18",
        "custom-light-gray": "#EEEEEE",
        header: "white",
        "btn-secondary": "#3A3B3C",
      },
      fontSize: {},
    },
  },
  plugins: [],
};

// https://dribbble.com/shots/22588296-Social-Media-Concept
