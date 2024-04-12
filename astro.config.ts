import { defineConfig } from 'astro/config';
import starlight from "@astrojs/starlight";
import d2 from "astro-d2";
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

import remarkToc from 'remark-toc';

import vtbot from 'astro-vtbot';
import type { SidebarItem } from 'node_modules/@astrojs/starlight/schemas/sidebar';

export default defineConfig({
	site: "https://events-3bg.pages.dev/",
	prefetch: true,
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: "wrap" }],
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					content: { type: "text", value: "↗" },
				},
			],
		],
		remarkPlugins: [remarkToc],
	},
	trailingSlash: 'always',
	integrations: [d2({ skipGeneration: process.env.GITHUB_ACTIONS === "true" }), vtbot({ autoLint: false }),
	starlight({
		components: {
			Head: "./src/components/starlight/Head.astro",
			PageTitle: "./src/components/starlight/PageTitle.astro",
			Pagination: "./src/components/starlight/FeelBack.astro",
		},
		title: "Bag of Tricks",
		head: [{ tag: "meta", attrs: { property: "og:image", content: "https://events-3bg.pages.dev/social.png" } }],
		customCss: ["./src/styles/custom.css"],
		description:
			"The Jotter of the Bag of Tricks for Astro's View Transitions",
		lastUpdated: true,
		pagination: true,
		logo: {
			src: "/public/favicon.svg",
		},
		expressiveCode: {
			themes: ['github-dark', 'github-light'],
			styleOverrides: {
				borderRadius: "0.5rem",
			},
			plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
		},
		social: {
			github: "https://github.com/martrapp/astro-vtbot",
		},
		editLink: {
			baseUrl: "https://github.com/martrapp/astro-vtbot-website/edit/main/",
		},
		sidebar: sidebar(),
	})],
	vite: {
		server: {
			fs: {
				allow: ['/home/'],
			},
		},
	},
});

function sidebar() {

	return [
		{
			label: "Bag of Tricks",
			items: [
				{
					label: "A Brief History of The Bag",
					link: "/jotter/history/"
				}, {
					label: "Tech-Demos",
					link: "/jotter/demos/"
				}, {
					label: "Reusable Components",
					link: "/jotter/components/"
				},
				{ label: "The Jotter", link: "/jotter/" },
				{
					label: "Recent Changes",
					link: "/jotter/history-of-changes/",
					badge: { text: "start here when re-visiting", variant: "success" }
				},
			],
		},
		{
			label: "Astro View Transitions",
			items: [
				{ label: "<View Transitions />", link: "/jotter/astro/" },
				{ label: "Transition Directives", link: "/jotter/astro/directives/" },
				{ label: "Global Flow & Events", link: "/jotter/astro/flow-events/" },
				{ label: "Loading and Swapping", link: "/jotter/astro/loader-swap/" },
				{ label: "How Simulation and API differ", link: "/jotter/astro/differences/"},
				{ label: "Script State Update after Transition", link: "/jotter/astro/scripts" },
			],
		},
		{
			label: "Browser View Transition API",
			items: [
				{ label: "Browser Support", link: "/jotter/api/test-page/"},
				{ label: "API Overview", link: "/jotter/api/" },
				{ label: "API Details", link: "/jotter/api/details/"},
				{ label: "In Depth Example", link: "/jotter/api/example/" },
				{ label: "References", link: "/jotter/api/references/" },
			],
		},
		{
			label: "The Jotter on Starlight",
			items: [
				{ label: "Introduction", link: "/jotter/starlight/" },
				{ label: "Guide: Adding View Transitions", link: "/jotter/starlight/guide/" },
				{label: "The Inner Workings", link:"/jotter/starlight/inner-workings/"},
				{ label: "Hooking into Starlight", link: "/jotter/starlight/inner-workings/integration/" },
				{ label: "Managing the App State", link: "/jotter/starlight/inner-workings/app-state/" },
				{ label: "Updating the Sidebar", link: "/jotter/starlight/inner-workings/sidebar/" },
				{ label: "Defining Transitions", link: "/jotter/starlight/inner-workings/transitions/" },
			],
		},
		{
			label: "Lost & Found / to be Curated",
			autogenerate: {
				directory: "jotter/snippets",
			},
		},
	] as SidebarItem[];
}
