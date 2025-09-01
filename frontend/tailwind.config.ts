import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
					jacarta: {
						DEFAULT: '#3b395d',
					},
					lavenda: {
						DEFAULT: '#9085bc',
					},
					rose: {
						DEFAULT: '#f2cbe0',
					},
					orchide: {
						DEFAULT: '#cb6d9a',
					},
					plum: {
						DEFAULT: '#85477b',
					},
					background: {
						light: '#f2cbe0', // rose
						dark: '#3b395d', // jacarta
					},
					text: {
						light: '#3b395d', // jacarta
						dark: '#f2cbe0', // rose
					},
					card: {
						DEFAULT: '#fff',
						foreground: '#3b395d',
					},
				},
									fontFamily: {
										heading: [
											'Asimovian',
											'Caudex',
											'Inter',
											'system-ui',
											'sans-serif',
										],
										body: [
											'Caudex',
											'Inter',
											'system-ui',
											'serif',
										],
										bgText: [
											'Geologica',
										],
									},
					boxShadow: {
						'glow': '0 0 40px #9085bc33',
						'sm': '0 1px 2px 0 #0000000d',
						'md': '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a',
						'lg': '0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a',
					},
					backgroundImage: {
						'gradient-primary': 'linear-gradient(135deg, #9085bc, #cb6d9a)',
						'gradient-hero': 'linear-gradient(135deg, #f2cbe0 0%, #9085bc 100%)',
						'gradient-card': 'linear-gradient(145deg, #fff 0%, #f2cbe0 100%)',
					},
					borderRadius: {
						lg: '0.75rem',
						md: 'calc(0.75rem - 2px)',
						sm: 'calc(0.75rem - 4px)'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
		plugins: [tailwindcssAnimate],
} satisfies Config;
