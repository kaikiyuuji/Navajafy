/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'wave-slow': {
  				'0%, 100%': {
  					transform: 'translateX(0) translateY(0)'
  				},
  				'50%': {
  					transform: 'translateX(-25px) translateY(-10px)'
  				}
  			},
  			'wave-medium': {
  				'0%, 100%': {
  					transform: 'translateX(0) translateY(0)'
  				},
  				'50%': {
  					transform: 'translateX(25px) translateY(-15px)'
  				}
  			},
  			'wave-fast': {
  				'0%, 100%': {
  					transform: 'translateX(0) translateY(0)'
  				},
  				'50%': {
  					transform: 'translateX(-15px) translateY(-20px)'
  				}
  			},
  			'float-slow': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-30px) rotate(180deg)'
  				}
  			},
  			'float-medium': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-20px) rotate(90deg)'
  				}
  			},
  			'float-fast': {
  				'0%, 100%': {
  					transform: 'translateY(0px) scale(1)'
  				},
  				'50%': {
  					transform: 'translateY(-40px) scale(1.1)'
  				}
  			},
  			draw: {
  				'0%': {
  					strokeDasharray: '0 1000'
  				},
  				'100%': {
  					strokeDasharray: '1000 0'
  				}
  			},
  			'draw-delayed': {
  				'0%, 30%': {
  					strokeDasharray: '0 1000'
  				},
  				'100%': {
  					strokeDasharray: '1000 0'
  				}
  			},
  			'draw-slow': {
  				'0%, 60%': {
  					strokeDasharray: '0 1000'
  				},
  				'100%': {
  					strokeDasharray: '1000 0'
  				}
  			},
  			'dark-float-1': {
  				'0%, 100%': {
  					transform: 'translate(0, 0) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(20px, 20px) rotate(10deg)'
  				}
  			},
  			'dark-float-2': {
  				'0%, 100%': {
  					transform: 'translate(0, 0) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(-20px, 15px) rotate(-5deg)'
  				}
  			},
  			'dark-float-3': {
  				'0%, 100%': {
  					transform: 'translate(0, 0) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translate(15px, -15px) rotate(8deg)'
  				}
  			},
  			'dark-wave-1': {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'50%': {
  					transform: 'translateX(20px)'
  				}
  			},
  			'dark-wave-2': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'dark-wave-3': {
  				'0%, 100%': {
  					transform: 'translate(0, 0)'
  				},
  				'50%': {
  					transform: 'translate(-15px, 15px)'
  				}
  			},
  			'dark-spin-slow': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'dark-pulse': {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.1)'
  				}
  			},
  			'dark-bounce': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'dark-particle': {
  				'0%': {
  					transform: 'translateY(0) scale(1)',
  					opacity: '0.4'
  				},
  				'50%': {
  					transform: 'translateY(-50px) scale(1.2)',
  					opacity: '0.2'
  				},
  				'100%': {
  					transform: 'translateY(-100px) scale(1)',
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			float: 'float 3s ease-in-out infinite',
  			'wave-slow': 'wave-slow 8s ease-in-out infinite',
  			'wave-medium': 'wave-medium 6s ease-in-out infinite',
  			'wave-fast': 'wave-fast 4s ease-in-out infinite',
  			'float-slow': 'float-slow 6s ease-in-out infinite',
  			'float-medium': 'float-medium 4s ease-in-out infinite',
  			'float-fast': 'float-fast 3s ease-in-out infinite',
  			draw: 'draw 8s ease-in-out infinite',
  			'draw-delayed': 'draw-delayed 10s ease-in-out infinite',
  			'draw-slow': 'draw-slow 12s ease-in-out infinite',
  			'dark-float-1': 'dark-float-1 20s ease-in-out infinite',
  			'dark-float-2': 'dark-float-2 25s ease-in-out infinite',
  			'dark-float-3': 'dark-float-3 22s ease-in-out infinite',
  			'dark-wave-1': 'dark-wave-1 15s ease-in-out infinite',
  			'dark-wave-2': 'dark-wave-2 18s ease-in-out infinite',
  			'dark-wave-3': 'dark-wave-3 20s ease-in-out infinite',
  			'dark-spin-slow': 'dark-spin-slow 30s linear infinite',
  			'dark-pulse': 'dark-pulse 8s ease-in-out infinite',
  			'dark-bounce': 'dark-bounce 6s ease-in-out infinite',
  			'dark-particle': 'dark-particle 12s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
