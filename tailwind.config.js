/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(90deg, rgba(255,255,255,0.594) 0%, rgba(255,255,255,0.594) 3%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.659) 100%)',
      },
    },
  },
  plugins: [],
};
