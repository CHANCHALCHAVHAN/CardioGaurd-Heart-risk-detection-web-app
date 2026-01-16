
import type { Config } from "tailwindcss";

export default {
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
				},
				medical: {
					'blue': '#D3E4FD',
					'blue-dark': '#33C3F0',
					'green': '#F2FCE2',
					'pink': '#FFDEE2',
				},
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
				'float': {
					'0%': {
						transform: 'translateY(0) translateX(0)',
					},
					'50%': {
						transform: 'translateY(-20px) translateX(10px)',
					},
					'100%': {
						transform: 'translateY(0) translateX(0)',
					}
				},
				'scatter': {
					'0%': {
						transform: 'translate(0, 0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translate(var(--random-x), var(--random-y))',
						opacity: '0'
					}
				},
				'wing-flap': {
					'0%, 100%': {
						transform: 'scaleX(1)'
					},
					'50%': {
						transform: 'scaleX(1.1)'
					}
				},
				'butterfly-float': {
					'0%': {
						transform: 'translateY(0) translateX(0) rotate(0deg)'
					},
					'33%': {
						transform: 'translateY(-15px) translateX(10px) rotate(5deg)'
					},
					'66%': {
						transform: 'translateY(-5px) translateX(-10px) rotate(-5deg)'
					},
					'100%': {
						transform: 'translateY(0) translateX(0) rotate(0deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'scatter': 'scatter 0.8s ease-out forwards',
				'wing-flap': 'wing-flap 1s ease-in-out infinite',
				'butterfly-float': 'butterfly-float 10s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
