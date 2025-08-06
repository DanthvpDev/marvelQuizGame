/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        marvelousRed: {
          DEFAULT: "#A13838",
          300: "#CA3B3B"
        },
        marvelousBlue: {
          DEFAULT: "#0577FA",
          300: "#3581D8",
          800: "#00568C"
        },
        marvelousWhite: {
          DEFAULT: "#EAEAEA"
        },
        marvelousBlack: {
          DEFAULT: "#191A1A"
        }
      },
      fontFamily: {
        BebasNeue: ["BebasNeue"]
      }
    },
  },
  plugins: [],
}

