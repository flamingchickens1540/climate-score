import App from './frontend/pages/Mainpage.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;