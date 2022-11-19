import App from './frontend/templates/Mainpage.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;