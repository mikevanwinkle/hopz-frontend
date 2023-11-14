
<script>
	import Header from './Header.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import {width, mobile, device} from '$lib/utils/device';
  import { getUser } from '$lib/utils/user';
  import { store } from '$lib/stores';
  import { onMount, setContext } from "svelte"
	import './styles.css';

  /** @type {import('./$types').LayoutData} */
	export let data;

  // Create a store and update it when necessary...
  let savestore = false

  // set up our session store
  $: if (savestore && $store) {
    console.log($store)
    window.sessionStorage.setItem("store", JSON.stringify($store))
  }

  // mount the store from session storage
  onMount(async () => {
    let ses = window.sessionStorage.getItem("store")
      if (ses) {
        console.log("sob-- ~ loading ses", ses)
        $store = JSON.parse(ses)
      }
    savestore = true
  })

  //receive whether to override and render as mobile
  export let overrideMobile = false;
  //store this in the shared stores located in '$lib/utils/device'
  $mobile = overrideMobile;
  let sidebar = false
  let open = false
  $: store
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
  <link href="/tailwind.v1.min.css" rel="stylesheet"/>
</svelte:head>

<svelte:window bind:innerWidth={$width} on:resize={() => $mobile = $width < 768} />

{#if $mobile}
  <Sidebar bind:open/>
  <Navbar bind:sidebar={open}/>
{:else}
  <Header />
{/if}

<div class="app">
	<main>
    <div class="box">
      {JSON.stringify($store)}
      <button on:click={() => $store.token = crypto.randomUUID()}>Set User</button>
    </div>
		<slot />
	</main>

	<footer>

	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
    background-image: url('/src/lib/images/brand-mj-transparent.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

  .box {
    background-color: var(--color-bg-0);
  }

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
