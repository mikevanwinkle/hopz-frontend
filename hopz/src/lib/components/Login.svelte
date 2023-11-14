<script>
  export let form;
  export let data;
  import { store } from '$lib/stores';
  import { enhance } from '$app/forms';

  import { Jumper } from 'svelte-loading-spinners';
  let processing = false;
  $: store

  </script>
  <div class="row">
    {#if processing}
      <div><Jumper size="60" color="#FF3E00" unit="px" duration="1s" /></div>
    {:else}
      <div style="flex: 7;">
        {#if form?.error}
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mx-0 my-2" role="alert">
              <p class="font-bold"></p>
              <p>{form.message}</p>
            </div>
        {:else if form?.message}
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mx-0 my-2" role="alert">
              <p class="font-bold"></p>
              <p>{form?.message}</p>
            </div>
        {/if}
        <form method="POST" action="?/login" >
          <label for="email" class="text-sm">Email:</label>
          <input type="email" id="email" name="email" required value={form?.data?.email ?? ''}/>

          <label for="password" class="text-sm">Password:</label>
          <input type="password" id="password" name="password" value={''}/>

          <input type="hidden" id="device_id" name="device_id"  value={data.device_id} />
          <button formaction="?/login">Login</button>
        </form>
      </div><!--  row -->
    {/if}
</div>