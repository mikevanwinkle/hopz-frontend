<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>
<div class="box">
<ul>
{#each items as item}
	<li class={activeTabValue === item.value ? 'active' : ''}>
		<span on:click={handleClick(item.value)}>{item.label}</span>
	</li>
{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
  <div class="p-3">
		<svelte:component this={item.component} {...item.props}/>
  </div>
	{/if}
{/each}
</div>
<style>

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: .5px solid var(--color-theme-1);
  }

	li {
		margin-bottom: -1px;
	}

  span {
    border: 1px solid transparent;

    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  li:first-child span {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  span:hover {
    border-bottom-color: var(--color-theme-2) ;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: var(--color-theme-1) var(--color-theme-1) var(--color-theme-1);
  }
</style>