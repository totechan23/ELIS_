/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        elis: '12px',
      },
      colors: {
        canvas: '#FAFAF8',
        sidebar: '#F3F4F2',
        text: '#1F2328',
        muted: '#70757D',
        line: '#E4E6E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        chat: '700px',
      },
    },
  },
  plugins: [],
}
