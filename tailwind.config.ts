import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			bruno: ['Bruno Ace', 'sans-serif'],
			fira: ['Fira Mono', 'sans-serif'],
		},
		extend: {}
	},

	plugins: [typography, forms, aspectRatio]
} as Config;
