<script>
  import { enhance } from '$app/forms';
  import { error } from "@sveltejs/kit";
  export let form;
  export let data;
  console.log("PAGE", form, data)
  import { Jumper } from 'svelte-loading-spinners';
  let processing = false;
  </script>
  {#if form?.error}
    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p class="font-bold">Error:</p>
      <p>{form.message}</p>
    </div>
  {/if}
  <div class="row">
    {#if processing}
      <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
    {:else}
      <div style="flex: 7;">
        <form method="POST" action="?/register">
          <label for="name" class="text-sm">Userame:</label>
          <input type="text" id="name" name="name" value={form?.data?.name ?? ''} autocomplete="off"/>

          <label for="email" class="text-sm">Email:</label>
          <input type="email" id="email" name="email" value={form?.data?.email ?? ''} autocomplete="off" />

          <label for="password" class="text-sm">Password:</label>
          <input type="password" id="password" name="password" value={''}/>

          <label for="confirm_password" class="text-sm">Confirm Password:</label>
          <input type="password" id="confirm_password" name="confirm_password" value={''}/>

          <button formaction="?/register">Register</button>
        </form>
      </div>
    {/if}
  </div><!--  row -->