import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
} satisfies Config
