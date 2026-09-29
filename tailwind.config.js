/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          dark: '#0A192F',
          navy: '#0F2744',
          marine: '#183B64',
          subtle: '#244B7A',
          saffron: '#D97706',
          saffronLight: '#F59E0B',
          saffronBg: '#FEF3C7',
          gold: '#C25E00',
          ash: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          textDark: '#0F172A',
          textMuted: '#475569',
          success: '#059669',
          successBg: '#ECFDF5',
          warning: '#D97706',
          warningBg: '#FFFBEB',
          danger: '#DC2626',
          dangerBg: '#FEF2F2',
          info: '#2563EB',
          infoBg: '#EFF6FF',
          purple: '#7C3AED',
          purpleBg: '#F5F3FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      boxShadow: {
        gov: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        govLg: '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
        govCard: '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [],
}
