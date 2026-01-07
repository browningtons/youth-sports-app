export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4B0082",
          dark: "#2A0048",
        },
        ink: "#0B0B0F",
        paper: "#FFFFFF",
        sky: "#79A9E6",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
};
