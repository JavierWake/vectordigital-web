module.exports = {
  purge: ["public/index.html", "src/**/*.js", "src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: ["checked"],
      backgroundImage: {
        ticket: "url(../assets/ticketTriangle.png)"
      },
      borderColor: ["checked"],
      colors: {
        gray: {
          10: "#E5E5E5",
          50: "#DEDEDE", //Pie gris claro
          100: "#FBFBFB",
          150: "#888682", //Pie gris fuerte
          200: "#F8F8F8",
          300: "#DFDFDF",
          350: "#C4C4C4",
          400: "#999999",
          500: "#7F7F7F",
          600: "#666666",
          650: "#E7E7E7", //COLOR GRIS CLARO FONDOS SECCION CONOZCA LA OFERTA
          700: "#4C4C4C", //COLOR GRIS FUERTE FONDOS SECCION CONOZCA LA OFERTA
          800: "#333333",
          900: "#191919",
          950: "#888682",
        },
        blue: {
          50: "#B2E3DE",
          100: "#E6F0FD",
          150: "#B2E3DE",
          200: "#CCE2FC",
          300: "#99C5FA",
          400: "#66A9F7",
          500: "#338CF5",
          600: "#0070F4",
          700: "#0064DA",
          800: "#0059C2",
          850: "#A2A9BB",
          900: "#004391",
          950: "#172A56",
          1000: "#283f72",
          970: "#283E72",
        },
        green: {
          DEFAULT: "#04B700",
          50: "#E5F7E5",
          70: "#CEDE22",
          150: "#E7F6F5", //COLOR COBERTURA FONDOS CLARO
          200: "#B2E3DE", // COLOR COBERTURA FONDOS
          250: "#F0F5BC", // COLOR RENTA VARIABLE FONDOS CLARO
          300: "#CEDE22", // COLOR RENTA VARIABLE FONDOS
        },

        red: {
          50: "#FBE5E5",
          100: "#D70000",
          200: "#F59E0B",
          300: "#FFDCCC", //color naranja fondo de circulo para iniciales
          550: "#FFCAB2", //COLOR FONDOS ESTRATEGICOS FONDOS CLARO
          600: "#FF5000", // NARANJA VECTOR, COLOR FONDOS ESTRATEGICOS FONDOS
          800: "#c30c00",
        },
        // yellow: {
        //   400: "#E6F0FD",
        //   600: "#CCE2FC",
        // },
        purple: {
          600: "#7471faff",
          700: "#3612BC",
          800: "#20176aff",
          850: "#A2A9BB", // COLOR DEUDA FONDOS CLARO
          900: "#172A56", // COLOR DEUDA FONDOS
        },
      },
      boxShadow: {
        xs: "0 0 0 1px rgba(0, 0, 0, 0.16)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.16)",
        default:
          "0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
      },
      spacing: {
        "9/16": "56.25%",
        "3/4": "75%",
        "1/1": "100%",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
        serif: ["Roboto Mono", "Georgia", "serif"],
        // Comma-delimited format:
      },
      fontSize: {
        xxss: "0.610rem",
        xxs: "0.563rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.625rem",
        "5xl": "3.25rem",
        "6xl": "5.5rem",
      },
      inset: {
        "1/2": "50%",
        full: "100%",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.4em",
      },
      lineHeight: {
        none: "1",
        tighter: "1.125",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.2rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
      },
      minWidth: {
        10: "2.5rem",
        48: "12rem",
      },
      opacity: {
        90: "0.9",
      },
      scale: {
        98: ".98",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
      },
      height: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '5/5': '100%',
        521: '521px',
        200: '50rem',
        28: '28rem',
      },
      width: {
        "1/24": "4.166667%",
        "2/24": "8.333333%",
        "3/24": "12.5%",
        "4/24": "16%",
        "5/24": "20.833333%",
        "6/24": "25%",
        "7/24": "29.166667%",
        "8/24": "33.333333%",
        "9/24": "37.5%",
        "10/24": "41.666667%",
        "11/24": "45.833333%",
        "12/24": "50%",
        "13/24": "54.166667%",
        "14/24": "58.333333%",
        "15/24": "62.5%",
        "16/24": "66.666667%",
        "17/24": "70.833333%",
        "18/24": "75%",
        "19/24": "79.166667%",
        "20/24": "83.333333%",
        "21/24": "87.5%",
        "22/24": "91.666667%",
        "23/24": "95.833333%",
        "24/24": "100%",
        100: "25rem",
      },
    },
  },
  variants: {
    backgroundColor: ["active", "responsive", "hover", "focus", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover", "active"],
    translate: ["responsive", "hover", "focus", "group-hover", "active"],
    boxShadow: ["responsive", "hover", "focus", "focus-within", "active"],
    opacity: ["responsive", "hover", "focus", "group-hover", "active"],
    cursor: ["hover", "focus", "disabled"],
    ring: ["disabled"],
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
