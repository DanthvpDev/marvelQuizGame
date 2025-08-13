/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pokeRed: {
          DEFAULT: "#CC0000",
          300: "#CA3B3B"
        },
        pokeBlue: {
          DEFAULT: "#3C5AA6",
          300: "#3581D8",
          800: "#00568C"
        },
        pokeWhite: {
          DEFAULT: "#EAEAEA"
        },
        pokeBlack: {
          DEFAULT: "#191A1A"
        },
        pokeYellow: {
          DEFAULT:"#FFCB05",
          700: "#E5BA13",
          800: "#D1A90E"
        }
      },
      fontFamily: {
        BebasNeue: ["BebasNeue"],
        PokeSolid: ["PokeSolid"],
        Nunito: ["Nunito"]
      }
    },
  },
  plugins: [],
}

