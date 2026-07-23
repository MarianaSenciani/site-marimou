/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lime: '#B9D440',
        magenta: '#CE3FD4',
        purple: '#6D3FD4',
        sage: '#92A150',
        olive: '#6B6E4D',
        charcoal: '#515443',
        'plum-dark': '#544354',
        'near-black': '#3A3B35',
        'forest-black': '#303324',
        'bg-cream': '#F5FAE2',
        'bg-blush': '#FAEEF2',
        'bg-lilac': '#E8DEFF',
      },
      fontFamily: {
        alexandria: ['Alexandria', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '16px',
      },
      transitionTimingFunction: {
        'out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
