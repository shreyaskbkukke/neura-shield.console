import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/theme/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        navy: colors.navy,
        intelligence: colors.intelligence,
        success: colors.success,
        warning: colors.warning,
        orange: colors.orange,
        danger: colors.danger,
        purple: colors.purple,
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
