/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c5948c",
        secondary: "#fbf1e2",
        tertiary: "#b7b4a0",
        caramel: "#d8a06d",
        rose: "#e8c1b0",
        cocoa: "#70534b",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ['BerkshireSwash-Regular', 'sans-serif'],
        body: ['Arcane Nine', 'serif'],
      },
      backgroundImage: {
        "hero": "url('/src/assets/images/background-hero.png')",
        "events-gradient-1": "linear-gradient(90deg, #fbf1e2 0%, #101005 100%)",
        "events-gradient-2": "linear-gradient(90deg, #101005 0%, #fbf1e2 100%)",
        "fence-gradient": "linear-gradient(-60deg, #e8c1b0 0% 90%,  #fff 100% 100%, #e8c1b0 98% 100%)",
        "fence-gradient-cocoa": "linear-gradient(-60deg, #af9187 0% 90%,  #fff 100% 100%, #af9187 98% 100%)",
        "catalog-modal": "linear-gradient(240deg, #fbf1e2 0% 90%,  #fff 100% 100%, #e8c1b0 98% 100%)"
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

