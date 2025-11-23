import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			glow: '#06b6d4',
  			'dark-bg': '#0f172a',
  			'dark-card': '#1e293b',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'hero-gradient': 'linear-gradient(135deg, #0ea5a4 0%, #7c3aed 50%, #ec4899 100%)',
  			'glow-gradient': 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(124, 58, 237, 0.5))'
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)',
  			'glow-lg': '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(124, 58, 237, 0.3)',
  			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  			soft: '0 8px 24px rgba(0, 0, 0, 0.08)',
  			'soft-lg': '0 12px 32px rgba(0, 0, 0, 0.12)'
  		},
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			md: '8px'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-in-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'glow-pulse': 'glowPulse 3s ease-in-out infinite',
  			float: 'float 3s ease-in-out infinite',
  			shimmer: 'shimmer 2s ease-in-out infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			glowPulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)'
  				},
  				'50%': {
  					boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(124, 58, 237, 0.4)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '200% center'
  				},
  				'100%': {
  					backgroundPosition: '-200% center'
  				}
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		transitionTimingFunction: {
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ['class', 'class'],
  plugins: [require("tailwindcss-animate")]
} as Config
