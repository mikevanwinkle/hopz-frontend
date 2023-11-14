<script>
	export let open = false
</script>

<aside class="navcolor absolute w-full h-full border-r-2 shadow-lg" class:open>
	<nav class="p-12 text-xl">
		<a class="block" href="/">Home</a>
		<a class="block" href="/gives">Give Beer</a>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}

	.open {
		left: 0
	}

  .navcolor {
    background-color: var(--color-theme-1);
    color: var(--color-theme-2)
  }

  .navcolor a {
    color: var(--color-theme-2)
  }
</style>