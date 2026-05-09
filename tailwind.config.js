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
      fontSize: {
        'fluid-bio':       'clamp(1rem, 1.8vw, 1.25rem)',
        'fluid-quote':     'clamp(1.5rem, 1.7vw, 2.2rem)',
        'fluid-subhead':   'clamp(1.5rem, 2.5vw, 2rem)',
        'fluid-h3':        'clamp(1.75rem, 3vw, 2.25rem)',
        'fluid-h2':        'clamp(1.75rem, 3vw, 2.5rem)',
        'fluid-pullquote': 'clamp(1.75rem, 3vw, 2.75rem)',
        'fluid-h1':        'clamp(1.75rem, 3.5vw, 3rem)',
        'fluid-contact':   'clamp(1.75rem, 4vw, 2.25rem)',
        'fluid-next-sm':   'clamp(1.75rem, 4vw, 3.5rem)',
        'fluid-stat-sm':   'clamp(1.75rem, 5vw, 3rem)',
        'fluid-stat':      'clamp(1.75rem, 5vw, 3.5rem)',
        'fluid-headline':  'clamp(2rem, 4vw, 2.75rem)',
        'fluid-stat-md':   'clamp(2rem, 4vw, 3rem)',
        'fluid-next':      'clamp(2rem, 4vw, 3.5rem)',
        'fluid-stat-lg':   'clamp(2rem, 5vw, 4rem)',
        'fluid-stat-xl':   'clamp(2.5rem, 5vw, 4rem)',
        'fluid-hero':      'clamp(3rem, 6vw, 5.5rem)',
        'fluid-hero-lg':   'clamp(3.2rem, 6.5vw, 6rem)',
        'fluid-bg':        'clamp(14rem, 28vw, 26rem)',
      },
      letterSpacing: {
        'heading-xs': '-0.01em',
        'heading':    '-0.02em',
        'heading-md': '-0.03em',
        'heading-lg': '-0.04em',
      },
    }
  }
}
