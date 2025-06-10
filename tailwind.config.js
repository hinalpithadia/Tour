/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily : {
        manrope: ['manrope', 'sans-serif'],
        sf_pro_display: ['SF Pro Display ', 'sans-serif'],
        sf_pro_display_medium: ['SF Pro Display Medium', 'sans-serif'],
        sf_pro_display_semibold: ['SF Pro Display Semibold', 'sans-serif'],
      },
      colors : {
        'primary-black' : '#0F1E2A',
        'secondary-black':'#111827',
        'orange' : '#FF5231',
        'lightgray':'#F6F7F7',
        'primary-gray':'#667085',
        'primary-green':'#065F46',
        'primary-red':'#B42318',
        
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar-hide')
  ],
}

