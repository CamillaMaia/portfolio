module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0e0d',
        bg2: '#161513',
        bg3: '#1e1c1a',
        accent: '#EF9F27',
        'accent-light': '#FAC775',
        'accent-dim': '#BA7517',
        primary: '#f0ece6',
        muted: '#8a8278',
        secondary: '#a69e94',
        divider: '#6a6460',
        border: 'rgba(240,236,230,0.1)',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    }
  }
}
