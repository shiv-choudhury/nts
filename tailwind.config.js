/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"
  ],
  darkMode: "",
  theme: {
    extend: {
      backgroundImage: {
        "tag-gradient":
          "linear-gradient(130.42deg, #FFD385 21.36%, #CBA05A 96.73%)",
        "jackpot-gradient": "linear-gradient(180deg, #1A1C4B 0%, #514086 100%)",
        "jackpot-text-gradient":
          "linear-gradient(180deg, #622F3A 0%, #C86076 100%)",
        "white-gradient":
          "linear-gradient(90.73deg, #FFFFFF -35.44%, rgba(237, 227, 255, 0) 96.91%)",
        "white-gradient-2":
          "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 41%, rgba(255, 255, 255, 0) 82.5%)",
        "light-purple-gradient":
          "linear-gradient(180deg, rgba(63, 67, 159, 0.8) 0%, rgba(126, 100, 204, 0.4) 100%)",
        "dark-purple-gradient":
          "linear-gradient(180deg, #1A1C4B 0%, #514086 100%)",
        "gold-gradient":
          "linear-gradient(180deg, #FFD385 21.36%, #FDF093 23%, #fff9ad 29%, #FFFFFF 29%, #CBA05A 80%)"
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        rotateExpand: "rotateExpand 0.3s ease-in-out forwards",
        rotateCollapse: "rotateCollapse 0.3s ease-in-out forwards",
        slideUp: "slideUp 0.2s ease-out forwards",
        slideDown: "slideDown 0.2s ease-out forwards",
        menuSlideUp: "menuSlideUp 0.3s ease-out forwards",
        menuSlideDown: "menuSlideDown 0.3s ease-out forwards",
        menuSlideLeft: "menuSlideLeft 0.1s ease-out forwards",
        menuSlideRight: "menuSlideRight 0.1s ease-out forwards",
        spin: "spin 1s linear infinite"
      },
      colors: {
        background: "#F6F6F6",
        primary: "#004CDF",
        custom: "rgba(255, 221, 228, 0.37)"
      },
      fontFamily: {
        avenir: ["avenir_next_lt_pro_regular-webfont", "sans"]
      },
      fontSize: {
        s: "13px"
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))"
      },
      keyframes: {
        rotateExpand: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" }
        },
        rotateCollapse: {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        menuSlideUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-50px)" }
        },
        menuSlideDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        menuSlideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        menuSlideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      fontFamily: {
        dmsans: ["DMSans", "sans-serif"]
      }
    }
  },

  plugins: []
};
