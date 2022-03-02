import { defineConfig } from 'vite-plugin-windicss';
import aspectRatio from "windicss/plugin/aspect-ratio";

export default defineConfig({
	darkMode: false,
	theme: {
		extend: {},
	},
	plugins: [
		aspectRatio,
	]
});
