import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,vue,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
} satisfies Config
