/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        surface: '#F8FAFC',
        background: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-right': 'slideRight 300ms ease-out',
      },
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(8px)' },
        },
      },
    },
  },
  plugins: [],
}