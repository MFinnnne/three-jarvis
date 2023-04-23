import {defineConfig} from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'three-jarvis doc',
	description: 'three-jarvis doc',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: 'Home', link: '/'},
			{text: 'get-started', link: '/get-started.md'},
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{text: 'Markdown Examples', link: '/markdown-examples'},
					{text: 'Runtime API Examples', link: '/api-examples'},
				],
			},
		],

		socialLinks: [{icon: 'github', link: 'https://github.com/vuejs/vitepress'}],
	},
});
