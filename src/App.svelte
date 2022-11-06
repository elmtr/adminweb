<script>
  import { onMount } from 'svelte'
	import Router, { push } from 'svelte-spa-router';
	import routes from './routes';

	import {info, token} from './stores'

	onMount(() => {
		$info = localStorage.getItem("userInfo")
		$token = localStorage.getItem("userToken")
		
		if (!$info) {
			push('/login')
		}
	}) 
</script>

<main>
	<Router {routes} />
</main>

<style>
	:root {
		--darkgreen: #054D1B;
		--darkgreen-transparent: rgba(5, 77, 27, 0.6);
		--lightgreen: #38E377;
		--lightgreen-filter: invert(81%) sepia(13%) saturate(2385%) hue-rotate(80deg) brightness(94%) contrast(89%);
		--lightgreen-transparent: rgba(56, 227, 119, 0.6);
		--gray: #BDBDBD;
		--black: #303030;
		--white: white;
		--offwhite: #F2F2F2;
		--red: red;
		--yellow: yellow;
		--border-radius: 20px;
		--border: 1.5px solid var(--darkgreen);
		--width: 93%;
		--serif: serif;
		--sans-serif: sans-serif;
	}
</style>
