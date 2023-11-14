<script>
	import Logo from './Logo.svelte'
	import Hamburger from './HMenu.svelte'
	import Menu from './Menu.svelte'

	export let sidebar = false
</script>

<header class="flex justify-between p-2 items-center border-0" style="color: var(--color-theme-2)">
	<nav class="flex">
		<Hamburger bind:open={sidebar}/>
		<Logo/>
	</nav>

	<Menu/>
</header>