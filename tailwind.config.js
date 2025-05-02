/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom theme colors
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.9)',
            h1: {
              color: 'rgba(255, 255, 255, 1)',
            },
            h2: {
              color: 'rgba(255, 255, 255, 1)',
            },
            h3: {
              color: 'rgba(255, 255, 255, 1)',
            },
            strong: {
              color: 'rgba(255, 255, 255, 1)',
            },
            a: {
              color: 'rgba(255, 255, 255, 1)',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            },
            code: {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            pre: {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.9)',
            },
            blockquote: {
              color: 'rgba(255, 255, 255, 0.8)',
              borderLeftColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
